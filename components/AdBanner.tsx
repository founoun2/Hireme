import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical';
  className?: string;
  style?: React.CSSProperties;
  isDesktopSidebar?: boolean;
  enabled?: boolean; // whether to actually load/render the ad
}

export const AdBanner: React.FC<AdBannerProps> = ({ 
  slot, 
  format = 'auto',
  className = '',
  style = {},
  isDesktopSidebar = false,
  enabled = true
}) => {
  const insRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    let initialized = false;
    const ins = insRef.current?.querySelector('ins.adsbygoogle');
    if (ins && !(ins as any)._adsbygoogleInit) {
      // Mark as initialized to prevent double push
      (ins as any)._adsbygoogleInit = true;
      initialized = true;
      try {
        if ((window as any).adsbygoogle && Array.isArray((window as any).adsbygoogle)) {
          (window as any).adsbygoogle.push({});
        }
      } catch (e) {
        console.error('AdSense push failed:', e);
      }
    }

    // Load the AdSense script only once
    if (!(window as any).__adsbygoogleLoaded) {
      const existing = document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]');
      if (!existing) {
        const s = document.createElement('script');
        s.async = true;
        s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2474444884447314';
        s.crossOrigin = 'anonymous';
        s.onload = () => { (window as any).__adsbygoogleLoaded = true; };
        s.onerror = (e) => { console.error('Failed to load AdSense script', e); };
        document.head.appendChild(s);
      }
    }
    // If script is already loaded, push if not already done
    if ((window as any).__adsbygoogleLoaded && !initialized && ins && !(ins as any)._adsbygoogleInit) {
      (ins as any)._adsbygoogleInit = true;
      try {
        if ((window as any).adsbygoogle && Array.isArray((window as any).adsbygoogle)) {
          (window as any).adsbygoogle.push({});
        }
      } catch (e) {
        console.error('AdSense push failed:', e);
      }
    }
  }, [enabled, slot]);

  // Desktop sidebar uses fixed 160x600 size
  const adStyle = isDesktopSidebar 
    ? { display: 'inline-block', width: '160px', height: '600px' }
    : { display: 'block', ...style };

  if (!enabled) return null;

  return (
    <div className={className} ref={insRef}>
      <ins
        className="adsbygoogle"
        style={adStyle}
        data-ad-client="ca-pub-2474444884447314"
        data-ad-slot={slot}
        data-ad-format={isDesktopSidebar ? undefined : format}
        data-full-width-responsive={isDesktopSidebar ? undefined : "true"}
      />
    </div>
  );
};

// Sidebar Ad Component (Desktop Left Side)
export const SidebarAd: React.FC<{ enabled?: boolean }> = ({ enabled = true }) => {
  if (!enabled) return null;
  return (
    <div className="hidden lg:block fixed left-4 top-1/2 -translate-y-1/2 z-10">
      <div className="bg-white rounded-2xl border border-zinc-100 p-3 shadow-sm">
        <p className="text-[7px] uppercase tracking-wider text-zinc-400 font-bold mb-2 text-center">
          Publicité
        </p>
        <AdBanner 
          slot="6802637448"
          isDesktopSidebar={true}
          enabled={enabled}
        />
      </div>
    </div>
  );
};

// In-Feed Ad Component (Desktop & Mobile - Between Jobs)
export const InFeedAd: React.FC<{ enabled?: boolean }> = ({ enabled = true }) => {
  if (!enabled) return null;

  return (
    <div className="w-full my-4">
      <div className="bg-gradient-to-br from-zinc-50 to-white rounded-2xl border border-zinc-100 p-4 shadow-sm">
        <p className="text-[8px] uppercase tracking-wider text-zinc-400 font-bold mb-3 text-center flex items-center justify-center gap-1.5">
          <i className="fa fa-info-circle text-[7px]"></i>
          Publicité
        </p>
        <AdBanner 
          slot="7273410736"
          format="fluid"
          style={{ minHeight: '250px' }}
          enabled={enabled}
        />
      </div>
    </div>
  );
};
