import { createClient } from '@supabase/supabase-js';

// Hardcoded production values
const PROD_SUPABASE_URL = 'https://zfhxgosamaeeuxmhqjkj.supabase.co';
const PROD_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaHhnb3NhbWFlZXV4bWhxamtqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzIxNjU3NiwiZXhwIjoyMDgyNzkyNTc2fQ.roVbZttHTdsiVG1sF3qQwAmt6sdvVMSLCxlfjoEyDZw';

const supabase = createClient(PROD_SUPABASE_URL, PROD_SERVICE_KEY);

const testJobs = [
  {
    id: Math.floor(Math.random() * 1000000000),
    title: 'Développeur Full Stack',
    company: 'Tech Company Maroc',
    city: 'Casablanca',
    contract: 'CDI',
    description: `Tech Company Maroc est une entreprise innovante spécialisée dans le développement de solutions digitales pour les entreprises au Maroc et à l'international. Nous recherchons un Développeur Full Stack talentueux et passionné pour rejoindre notre équipe en pleine croissance.

Dans ce rôle, vous serez responsable du développement et de la maintenance de nos applications web et mobiles. Vous travaillerez en étroite collaboration avec notre équipe produit, nos designers UX/UI et nos clients pour créer des solutions innovantes et performantes.

Vous aurez l'opportunité de travailler sur des projets variés et stimulants, d'apprendre de nouvelles technologies et de contribuer activement à l'évolution de nos produits. Nous offrons un environnement de travail dynamique, des opportunités de formation continue et la possibilité de faire évoluer votre carrière.

Le poste est basé à Casablanca avec possibilité de télétravail partiel. Nous recherchons quelqu'un qui partage nos valeurs d'innovation, d'excellence et de travail d'équipe.`,
    url: 'https://test-job-1.com',
    salary: '15000-20000 MAD',
    company_email: 'recrutement@techcompany.ma',
    company_phone: '+212 522-123-456',
    company_website: 'https://techcompany.ma',
    email: 'hr@techcompany.ma',
    phone: '0522-123-456',
    category: 'Informatique & Tech',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Git', 'REST API'],
    summary: 'Opportunité exceptionnelle pour un développeur passionné dans une startup en pleine croissance',
    created_at: new Date().toISOString()
  },
  {
    id: Math.floor(Math.random() * 1000000000),
    title: 'Agent de Centre d\'Appel',
    company: 'Call Center Solutions',
    city: 'Rabat',
    contract: 'CDI',
    description: `Call Center Solutions est un leader dans le domaine des services clients externalisés au Maroc. Nous accompagnons de grandes entreprises nationales et internationales dans la gestion de leur relation client.

Nous recrutons des Agents de Centre d'Appel motivés pour rejoindre nos équipes à Rabat. Dans ce rôle, vous serez le premier point de contact entre nos clients et leurs utilisateurs finaux. Vous traiterez les appels entrants et sortants, répondrez aux questions, résoudrez les problèmes et assurerez la satisfaction client.

Nous offrons une formation complète à nos nouveaux collaborateurs, aucune expérience préalable n'est requise. Vous bénéficierez d'un environnement de travail moderne, climatisé, avec des horaires flexibles et des opportunités d'évolution rapide vers des postes de supervision.

Le poste inclut un salaire de base attractif, des primes de performance mensuelles, une couverture sociale complète et des avantages sociaux (transport, cantine, assurance). Nous recherchons des personnes communicatives, patientes et orientées service client.`,
    url: 'https://test-job-2.com',
    salary: '5000-7000 MAD',
    company_email: 'jobs@callcenter.ma',
    company_phone: '+212 537-456-789',
    company_website: 'https://callcentersolutions.ma',
    email: 'recrutement@callcenter.ma',
    phone: '0537-456-789',
    category: 'Service Client',
    skills: ['Communication', 'Français', 'Arabe', 'Patience', 'Écoute active', 'Résolution de problèmes'],
    summary: 'Rejoignez notre équipe dynamique et développez vos compétences en relation client',
    created_at: new Date().toISOString()
  },
  {
    id: Math.floor(Math.random() * 1000000000),
    title: 'Commercial B2B',
    company: 'Sales Corp',
    city: 'Marrakech',
    contract: 'CDD',
    description: `Sales Corp est une entreprise spécialisée dans la distribution de solutions technologiques pour les professionnels. Avec plus de 15 ans d'expérience sur le marché marocain, nous sommes le partenaire de confiance de centaines d'entreprises.

Nous recherchons un Commercial B2B dynamique et ambitieux pour développer notre portefeuille clients à Marrakech et sa région. Votre mission principale sera de prospecter de nouveaux clients professionnels, de présenter nos solutions et de conclure des ventes.

Dans ce rôle, vous bénéficierez d'une autonomie totale dans l'organisation de votre travail, d'un secteur géographique défini et d'objectifs clairs et atteignables. Vous serez soutenu par une équipe marketing dédiée et aurez accès à tous les outils nécessaires pour réussir (CRM, catalogue digital, échantillons).

Nous offrons un package de rémunération très attractif composé d'un salaire fixe, de commissions non plafonnées sur les ventes, de primes trimestrielles et d'avantages en nature (véhicule de fonction, téléphone, laptop). Les meilleurs commerciaux peuvent rapidement évoluer vers des postes de management d'équipe.`,
    url: 'https://test-job-3.com',
    salary: '8000-12000 MAD + Commissions',
    company_email: 'contact@salescorp.ma',
    company_phone: '+212 524-789-123',
    company_website: 'https://salescorp.ma',
    email: 'rh@salescorp.ma',
    phone: '0524-789-123',
    category: 'Commerce & Vente',
    skills: ['Négociation', 'Prospection', 'CRM', 'Anglais', 'Présentation', 'Force de conviction'],
    summary: 'Excellente opportunité pour booster votre carrière commerciale avec des commissions attractives',
    created_at: new Date().toISOString()
  }
];

console.log('🧪 Testing job insertion...\n');

async function testInsert() {
  try {
    console.log(`📝 Inserting ${testJobs.length} test jobs...`);
    
    const { data, error } = await supabase
      .from('jobs')
      .insert(testJobs)
      .select();

    if (error) {
      console.error('❌ Insert failed:', error.message);
      console.error('Error details:', error);
      return;
    }

    console.log(`✅ Successfully inserted ${data.length} jobs!`);
    console.log('\n📊 Inserted jobs:');
    data.forEach((job, index) => {
      console.log(`\n${index + 1}. ${job.title}`);
      console.log(`   Company: ${job.company}`);
      console.log(`   City: ${job.city}`);
      console.log(`   URL: ${job.url}`);
    });

    // Verify they're in the database
    console.log('\n🔍 Verifying jobs are in database...');
    const { data: allJobs, error: fetchError } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('❌ Fetch failed:', fetchError.message);
      return;
    }

    console.log(`✅ Total jobs in database: ${allJobs.length}`);

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

testInsert();
// This file has been removed. Demo jobs are no longer used.
