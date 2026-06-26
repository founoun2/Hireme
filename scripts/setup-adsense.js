#!/usr/bin/env node

/**
 * Google AdSense Setup CLI Helper
 * 
 * Note: Google AdSense does NOT have an official CLI or automated API for account setup.
 * This tool helps you configure AdSense after manual approval.
 * 
 * Manual steps required:
 * 1. Go to https://www.google.com/adsense
 * 2. Sign up and get approved (1-2 days)
 * 3. Create ad units in AdSense dashboard
 * 4. Run this script to configure your app
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

function log(msg, color = 'reset') {
  console.log(`${colors[color]}${msg}${colors.reset}`);
}

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function openBrowser(url) {
  const platform = process.platform;
  const cmd = platform === 'win32' ? 'start' : platform === 'darwin' ? 'open' : 'xdg-open';
  exec(`${cmd} ${url}`, (error) => {
    if (error) log(`⚠️  Could not open browser automatically. Please visit: ${url}`, 'yellow');
  });
}

async function checkExistingConfig() {
  const indexPath = path.join(__dirname, '..', 'index.html');
  const adBannerPath = path.join(__dirname, '..', 'components', 'AdBanner.tsx');
  
  let hasConfig = false;
  
  if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath, 'utf8');
    const match = content.match(/ca-pub-(\d+)/);
    if (match && match[1] !== 'XXXXXXXXXXXXXXXX') {
      log(`\n✅ Found existing Publisher ID: ca-pub-${match[1]}`, 'green');
      hasConfig = true;
    }
  }
  
  return hasConfig;
}

function validatePublisherId(id) {
  return /^ca-pub-\d{16}$/.test(id) || /^\d{16}$/.test(id);
}

function validateAdSlotId(id) {
  return /^\d{10}$/.test(id);
}

function updateIndexHtml(publisherId) {
  const filePath = path.join(__dirname, '..', 'index.html');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Update AdSense script
  content = content.replace(
    /ca-pub-[X\d]+/g,
    publisherId.startsWith('ca-pub-') ? publisherId : `ca-pub-${publisherId}`
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  log(`  ✓ Updated index.html`, 'green');
}

function updateAdBanner(publisherId, desktopSlot, mobileSlot) {
  const filePath = path.join(__dirname, '..', 'components', 'AdBanner.tsx');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Update publisher ID
  content = content.replace(
    /data-ad-client="ca-pub-[X\d]+"/,
    `data-ad-client="${publisherId.startsWith('ca-pub-') ? publisherId : `ca-pub-${publisherId}`}"`
  );
  
  // Update desktop slot
  content = content.replace(
    /slot="\d{10}"\s*\/\/ Replace with your ad slot ID[\s\S]*?format="vertical"/,
    `slot="${desktopSlot}" // Desktop sidebar ad\n          format="vertical"`
  );
  
  // Update mobile slot
  content = content.replace(
    /slot="\d{10}"\s*\/\/ Replace with your ad slot ID[\s\S]*?format="fluid"/,
    `slot="${mobileSlot}" // Mobile in-feed ad\n          format="fluid"`
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  log(`  ✓ Updated AdBanner.tsx`, 'green');
}

async function main() {
  log('\n╔════════════════════════════════════════════════════════════╗', 'cyan');
  log('║     🚀 Google AdSense Setup Wizard for HireMe Maroc      ║', 'cyan');
  log('╚════════════════════════════════════════════════════════════╝\n', 'cyan');
  
  log('⚠️  IMPORTANT: Google AdSense does NOT support automated setup!', 'yellow');
  log('   You must manually create an account and get approved first.\n', 'yellow');
  
  // Check if already configured
  const hasConfig = await checkExistingConfig();
  if (hasConfig) {
    const reconfigure = await question('Do you want to reconfigure? (y/n): ');
    if (reconfigure.toLowerCase() !== 'y') {
      log('\n👋 Setup cancelled.', 'blue');
      rl.close();
      return;
    }
  }
  
  log('\n📋 Step 1: AdSense Account Setup', 'bright');
  log('───────────────────────────────────────────────────────────', 'cyan');
  
  const hasAccount = await question('\nDo you already have a Google AdSense account? (y/n): ');
  
  if (hasAccount.toLowerCase() !== 'y') {
    log('\n🌐 Opening Google AdSense signup page...', 'blue');
    openBrowser('https://www.google.com/adsense/start/');
    
    log('\n📝 Follow these steps:', 'yellow');
    log('  1. Sign in with your Google account', 'white');
    log('  2. Enter your website URL', 'white');
    log('  3. Complete the application', 'white');
    log('  4. Wait 1-2 days for approval', 'white');
    log('  5. Come back and run this script again!\n', 'white');
    
    const continueSetup = await question('Have you completed signup and been approved? (y/n): ');
    if (continueSetup.toLowerCase() !== 'y') {
      log('\n👋 Come back after approval! Run: npm run setup:adsense', 'blue');
      rl.close();
      return;
    }
  }
  
  log('\n📋 Step 2: Get Your Publisher ID', 'bright');
  log('───────────────────────────────────────────────────────────', 'cyan');
  log('\n🌐 Opening AdSense dashboard...', 'blue');
  openBrowser('https://www.google.com/adsense');
  
  log('\n📝 Find your Publisher ID:', 'yellow');
  log('  1. Go to Account → Settings', 'white');
  log('  2. Look for "Publisher ID" (format: ca-pub-1234567890123456)', 'white');
  log('  3. Copy the entire ID\n', 'white');
  
  let publisherId = '';
  while (!publisherId) {
    const input = await question('Enter your Publisher ID (ca-pub-XXXXXXXXXXXXXXXX): ');
    if (validatePublisherId(input.trim())) {
      publisherId = input.trim();
      log(`  ✓ Valid Publisher ID!`, 'green');
    } else {
      log(`  ✗ Invalid format. Should be: ca-pub-1234567890123456 (or just the numbers)`, 'red');
    }
  }
  
  log('\n📋 Step 3: Create Ad Units', 'bright');
  log('───────────────────────────────────────────────────────────', 'cyan');
  log('\n🌐 Opening Ad Units page...', 'blue');
  openBrowser('https://www.google.com/adsense/new/u/0/pub-0000000000000000/myads/units');
  
  log('\n📝 Create two ad units:', 'yellow');
  log('\n  Ad Unit 1: Desktop Sidebar', 'cyan');
  log('  • Click "Display ads"', 'white');
  log('  • Name: "HireMe Desktop Sidebar"', 'white');
  log('  • Size: Responsive or 160x600', 'white');
  log('  • Copy the Ad Slot ID (10 digits)\n', 'white');
  
  let desktopSlot = '';
  while (!desktopSlot) {
    const input = await question('Enter Desktop Ad Slot ID (10 digits): ');
    if (validateAdSlotId(input.trim())) {
      desktopSlot = input.trim();
      log(`  ✓ Valid Ad Slot ID!`, 'green');
    } else {
      log(`  ✗ Invalid format. Should be 10 digits (e.g., 1234567890)`, 'red');
    }
  }
  
  log('\n  Ad Unit 2: Mobile In-Feed', 'cyan');
  log('  • Click "In-feed ads" or "Display ads"', 'white');
  log('  • Name: "HireMe Mobile In-Feed"', 'white');
  log('  • Size: Responsive', 'white');
  log('  • Copy the Ad Slot ID (10 digits)\n', 'white');
  
  let mobileSlot = '';
  while (!mobileSlot) {
    const input = await question('Enter Mobile Ad Slot ID (10 digits): ');
    if (validateAdSlotId(input.trim())) {
      mobileSlot = input.trim();
      log(`  ✓ Valid Ad Slot ID!`, 'green');
    } else {
      log(`  ✗ Invalid format. Should be 10 digits (e.g., 0987654321)`, 'red');
    }
  }
  
  log('\n📋 Step 4: Updating Configuration Files', 'bright');
  log('───────────────────────────────────────────────────────────', 'cyan');
  log('');
  
  try {
    updateIndexHtml(publisherId);
    updateAdBanner(publisherId, desktopSlot, mobileSlot);
    
    log('\n✅ Configuration Complete!', 'green');
    log('───────────────────────────────────────────────────────────', 'cyan');
    log('\n📊 Your AdSense Setup:', 'bright');
    log(`  Publisher ID:     ${publisherId}`, 'white');
    log(`  Desktop Ad Slot:  ${desktopSlot}`, 'white');
    log(`  Mobile Ad Slot:   ${mobileSlot}`, 'white');
    
    log('\n🚀 Next Steps:', 'yellow');
    log('  1. Build your app:     npm run build', 'white');
    log('  2. Test locally:       npm run dev', 'white');
    log('  3. Deploy to Vercel:   git push origin master', 'white');
    log('  4. Wait 24-48 hours for ads to appear', 'white');
    
    log('\n💡 Tips:', 'cyan');
    log('  • Ads may show as blank initially (normal)', 'white');
    log('  • Check AdSense dashboard for ad status', 'white');
    log('  • Never click your own ads!', 'white');
    
    const buildNow = await question('\n\nBuild the app now? (y/n): ');
    if (buildNow.toLowerCase() === 'y') {
      log('\n🔨 Building...', 'blue');
      exec('npm run build', (error, stdout, stderr) => {
        if (error) {
          log(`\n❌ Build failed: ${error.message}`, 'red');
        } else {
          log('\n✅ Build successful!', 'green');
          log('\n🎉 Your site is ready with Google AdSense!', 'bright');
        }
        rl.close();
      });
    } else {
      log('\n🎉 Setup complete! Build when ready with: npm run build', 'bright');
      rl.close();
    }
    
  } catch (error) {
    log(`\n❌ Error updating files: ${error.message}`, 'red');
    rl.close();
  }
}

// Run the wizard
main().catch(error => {
  log(`\n❌ Setup failed: ${error.message}`, 'red');
  rl.close();
  process.exit(1);
});
