const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'blog-articles.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Map of ACTUAL slug -> internal links to add (only for articles NOT yet modified)
const articleLinks = {
  "erreurs-eviter-cv-maroc": {
    contextLinks: [
      { text: "rédiger un CV parfait", href: "/blog/comment-rediger-cv-maroc-guide-complet-2026" },
    ],
    resourceLinks: [
      { text: "Exemples de CV", href: "/blog/exemple-cv-francais-marche-marocain" },
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Guide des salaires", href: "/salaires" },
    ]
  },
  "ecrire-lettre-motivation-perfection-maroc": {
    contextLinks: [
      { text: "rédiger un CV", href: "/blog/comment-rediger-cv-maroc-guide-complet-2026" },
    ],
    resourceLinks: [
      { text: "Exemples de CV", href: "/blog/exemple-cv-francais-marche-marocain" },
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Préparer un entretien", href: "/blog/10-conseils-reussir-entretien-emploi-maroc" },
    ]
  },
  "questions-entretien-frequentes-maroc-comment-repondre": {
    contextLinks: [
      { text: "10 conseils entretien", href: "/blog/10-conseils-reussir-entretien-emploi-maroc" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Entretien banque", href: "/blog/reussir-entretien-embauche-banque-maroc" },
    ]
  },
  "reussir-entretien-video-maroc": {
    contextLinks: [
      { text: "conseils entretien", href: "/blog/10-conseils-reussir-entretien-emploi-maroc" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi remote", href: "/emploi" },
      { text: "Télétravail", href: "/blog/guide-teletravail-maroc-droits-bonnes-pratiques" },
    ]
  },
  "reussir-entretien-embauche-banque-maroc": {
    contextLinks: [
      { text: "conseils entretien", href: "/blog/10-conseils-reussir-entretien-emploi-maroc" },
    ],
    resourceLinks: [
      { text: "Emploi finance", href: "/categories/finance-jobs" },
      { text: "Emploi Casablanca", href: "/villes/casablanca" },
    ]
  },
  "preparer-entretien-secteur-automobile-maroc": {
    contextLinks: [
      { text: "conseils entretien", href: "/blog/10-conseils-reussir-entretien-emploi-maroc" },
    ],
    resourceLinks: [
      { text: "Emploi ingénierie", href: "/categories/engineering-jobs" },
      { text: "Emploi Tanger", href: "/villes/tanger" },
    ]
  },
  "guide-emploi-agadir-sud-pleine-expansion": {
    contextLinks: [
      { text: "offres d'emploi à Agadir", href: "/emploi?ville=Agadir" },
    ],
    resourceLinks: [
      { text: "Emploi Marrakech", href: "/villes/marrakech" },
      { text: "Emploi Casablanca", href: "/villes/casablanca" },
      { text: "Toutes les villes", href: "/villes" },
    ]
  },
  "guide-salaires-secteur-maroc-2026": {
    contextLinks: [
      { text: "métiers les mieux payés", href: "/blog/metiers-mieux-payes-maroc-2026" },
    ],
    resourceLinks: [
      { text: "Salaires développeur", href: "/salaires/developpeur-web" },
      { text: "Salaires comptable", href: "/salaires/comptable" },
      { text: "Tous les guides salaires", href: "/salaires" },
    ]
  },
  "negocier-salaire-maroc-guide-astuces": {
    contextLinks: [
      { text: "guide des salaires", href: "/salaires" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Avantages sociaux", href: "/blog/avantages-sociaux-entreprises-maroc" },
    ]
  },
  "droit-travail-maroc-ce-que-tout-salarie-doit-savoir": {
    contextLinks: [
      { text: "télétravail et loi", href: "/blog/guide-teletravail-maroc-droits-bonnes-pratiques" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Emploi temps partiel", href: "/blog/guide-travail-temps-partiel-maroc" },
    ]
  },
  "emplois-prives-maroc-secteurs-porteurs-opportunites": {
    contextLinks: [
      { text: "secteur public", href: "/blog/trouver-emploi-secteur-public-maroc" },
    ],
    resourceLinks: [
      { text: "Catégories d'emploi", href: "/categories" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
  "trouver-emploi-dans-tech-maroc": {
    contextLinks: [
      { text: "métiers du digital", href: "/blog/metiers-digital-maroc-opportunites-formation" },
      { text: "métiers IA", href: "/blog/metiers-ia-data-maroc-opportunites-2026" },
    ],
    resourceLinks: [
      { text: "Emploi IT", href: "/categories/it-jobs" },
      { text: "Salaires développeur", href: "/salaires/developpeur-web" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
  "metiers-digital-maroc-opportunites-formation": {
    contextLinks: [
      { text: "emploi tech", href: "/blog/trouver-emploi-dans-tech-maroc" },
      { text: "freelancing", href: "/blog/freelancing-maroc-guide-complet-travailleurs-independants" },
    ],
    resourceLinks: [
      { text: "Emploi marketing", href: "/categories/marketing-jobs" },
      { text: "Emploi IT", href: "/categories/it-jobs" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
  "travailler-hospitalite-maroc-guide-complet": {
    contextLinks: [
      { text: "emploi Marrakech", href: "/villes/marrakech" },
    ],
    resourceLinks: [
      { text: "Offres Marrakech", href: "/villes/marrakech" },
      { text: "Offres Agadir", href: "/villes/agadir" },
      { text: "Toutes les villes", href: "/villes" },
    ]
  },
  "metiers-sante-maroc-opportunites-perspectives": {
    contextLinks: [
      { text: "compétences techniques", href: "/blog/competences-techniques-plus-demandees-maroc-2026" },
    ],
    resourceLinks: [
      { text: "Emploi santé", href: "/categories/healthcare-jobs" },
      { text: "Salaires infirmier", href: "/salaires/infirmier" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
  "reussir-commerce-vente-maroc": {
    contextLinks: [
      { text: "compétences douces", href: "/blog/competences-douces-essentielles-reussir-travail-maroc" },
    ],
    resourceLinks: [
      { text: "Emploi vente", href: "/categories/sales-jobs" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
  "metiers-construction-btp-maroc": {
    contextLinks: [
      { text: "emploi Tanger", href: "/villes/tanger" },
    ],
    resourceLinks: [
      { text: "Emploi BTP", href: "/categories/construction-jobs" },
      { text: "Emploi ingénierie", href: "/categories/engineering-jobs" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
  "competences-douces-essentielles-reussir-travail-maroc": {
    contextLinks: [
      { text: "compétences techniques", href: "/blog/competences-techniques-plus-demandees-maroc-2026" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Catégories d'emploi", href: "/categories" },
    ]
  },
  "competences-techniques-plus-demandees-maroc-2026": {
    contextLinks: [
      { text: "compétences douces", href: "/blog/competences-douces-essentielles-reussir-travail-maroc" },
      { text: "certifications", href: "/blog/certifications-plus-validees-maroc-carriere" },
    ],
    resourceLinks: [
      { text: "Emploi IT", href: "/categories/it-jobs" },
      { text: "Salaires développeur", href: "/salaires/developpeur-web" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
  "progresser-carriere-maroc-strategies-reussite": {
    contextLinks: [
      { text: "junior à senior", href: "/blog/passer-junior-senior-carriere-maroc" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Centre de carrière", href: "/centre-carriere" },
    ]
  },
  "passer-junior-senior-carriere-maroc": {
    contextLinks: [
      { text: "progresser dans sa carrière", href: "/blog/progresser-carriere-maroc-strategies-reussite" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Centre de carrière", href: "/centre-carriere" },
    ]
  },
  "certifications-plus-validees-maroc-carriere": {
    contextLinks: [
      { text: "compétences techniques", href: "/blog/competences-techniques-plus-demandees-maroc-2026" },
    ],
    resourceLinks: [
      { text: "Emploi IT", href: "/categories/it-jobs" },
      { text: "Emploi finance", href: "/categories/finance-jobs" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
  "changer-carriere-maroc-guide-transition-reussie": {
    contextLinks: [
      { text: "progresser dans sa carrière", href: "/blog/progresser-carriere-maroc-strategies-reussite" },
    ],
    resourceLinks: [
      { text: "Catégories d'emploi", href: "/categories" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
  "meilleures-strategies-recherche-emploi-maroc": {
    contextLinks: [
      { text: "10 conseils entretien", href: "/blog/10-conseils-reussir-entretien-emploi-maroc" },
      { text: "LinkedIn", href: "/blog/creer-optimiser-profil-linkedin-maroc" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Toutes les villes", href: "/villes" },
      { text: "Catégories d'emploi", href: "/categories" },
    ]
  },
  "freelancing-maroc-guide-complet-travailleurs-independants": {
    contextLinks: [
      { text: "jobs remote", href: "/blog/jobs-remote-maroc-guide-complet-travailler-domicile" },
    ],
    resourceLinks: [
      { text: "Emploi télétravail", href: "/categories/remote-jobs" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
  "creer-entreprise-maroc-guide-complet": {
    contextLinks: [
      { text: "freelancing", href: "/blog/freelancing-maroc-guide-complet-travailleurs-independants" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Centre de carrière", href: "/centre-carriere" },
    ]
  },
  "guide-travail-temps-partiel-maroc": {
    contextLinks: [
      { text: "emplois étudiants", href: "/blog/emplois-etudiants-maroc-concilier-etudes-travail" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Emploi temps partiel", href: "/categories/part-time-jobs" },
    ]
  },
  "decrocher-stage-maroc-guide-etudiants": {
    contextLinks: [
      { text: "emplois étudiants", href: "/blog/emplois-etudiants-maroc-concilier-etudes-travail" },
    ],
    resourceLinks: [
      { text: "Offres de stages", href: "/categories/internships" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
  "emplois-etudiants-maroc-concilier-etudes-travail": {
    contextLinks: [
      { text: "stages", href: "/blog/decrocher-stage-maroc-guide-etudiants" },
    ],
    resourceLinks: [
      { text: "Offres de stages", href: "/categories/internships" },
      { text: "Emploi temps partiel", href: "/categories/part-time-jobs" },
    ]
  },
  "bourses-etude-stages-etranger-marocains": {
    contextLinks: [
      { text: "CV en anglais", href: "/blog/exemple-cv-anglais-entreprises-internationales-maroc" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Centre de carrière", href: "/centre-carriere" },
    ]
  },
  "creer-optimiser-profil-linkedin-maroc": {
    contextLinks: [
      { text: "stratégies recherche d'emploi", href: "/blog/meilleures-strategies-recherche-emploi-maroc" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Catégories d'emploi", href: "/categories" },
    ]
  },
  "construire-reseau-professionnel-maroc": {
    contextLinks: [
      { text: "LinkedIn", href: "/blog/creer-optimiser-profil-linkedin-maroc" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Centre de carrière", href: "/centre-carriere" },
    ]
  },
  "avantages-sociaux-entreprises-maroc": {
    contextLinks: [
      { text: "négocier son salaire", href: "/blog/negocier-salaire-maroc-guide-astuces" },
    ],
    resourceLinks: [
      { text: "Guide des salaires", href: "/salaires" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
  "gerer-stress-travail-maroc": {
    contextLinks: [
      { text: "compétences douces", href: "/blog/competences-douces-essentielles-reussir-travail-maroc" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Centre de carrière", href: "/centre-carriere" },
    ]
  },
  "metiers-ia-data-maroc-opportunites-2026": {
    contextLinks: [
      { text: "emploi tech", href: "/blog/trouver-emploi-dans-tech-maroc" },
      { text: "compétences techniques", href: "/blog/competences-techniques-plus-demandees-maroc-2026" },
    ],
    resourceLinks: [
      { text: "Emploi IT", href: "/categories/it-jobs" },
      { text: "Salaires développeur", href: "/salaires/developpeur-web" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
  "tendances-marche-travail-maroc-2026": {
    contextLinks: [
      { text: "compétences 2026", href: "/blog/competences-techniques-plus-demandees-maroc-2026" },
      { text: "télétravail", href: "/blog/guide-teletravail-maroc-droits-bonnes-pratiques" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Catégories d'emploi", href: "/categories" },
      { text: "Guide des salaires", href: "/salaires" },
    ]
  },
  "guide-complet-metiers-education-maroc": {
    contextLinks: [
      { text: "secteur public", href: "/blog/trouver-emploi-secteur-public-maroc" },
    ],
    resourceLinks: [
      { text: "Emploi enseignement", href: "/categories/teaching-jobs" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
  "guide-teletravail-maroc-droits-bonnes-pratiques": {
    contextLinks: [
      { text: "jobs remote", href: "/blog/jobs-remote-maroc-guide-complet-travailler-domicile" },
      { text: "freelancing", href: "/blog/freelancing-maroc-guide-complet-travailleurs-independants" },
    ],
    resourceLinks: [
      { text: "Emploi télétravail", href: "/categories/remote-jobs" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
};

function generateResourceSection(links) {
  let html = `<h2>Ressources utiles</h2><p>Pour aller plus loin dans votre recherche d'emploi au Maroc, consultez nos ressources :</p><ul>`;
  for (const link of links) {
    html += `<li><a href="${link.href}">${link.text}</a></li>`;
  }
  html += `</ul>`;
  return html;
}

function addContextualLinks(content, links) {
  if (!links || links.length === 0) return content;
  const firstH2End = content.indexOf('</h2>');
  if (firstH2End === -1) return content;
  const afterH2 = content.indexOf('<p>', firstH2End);
  if (afterH2 === -1) return content;
  const linkMention = ` <a href="${links[0].href}">${links[0].text}</a>`;
  const firstPeriod = content.indexOf('. ', afterH2);
  if (firstPeriod !== -1 && firstPeriod < afterH2 + 500) {
    return content.slice(0, firstPeriod + 2) + ` Pour plus de détails, consultez notre guide sur ${linkMention}.` + content.slice(firstPeriod + 2);
  }
  return content;
}

let modifiedCount = 0;
let skippedCount = 0;

for (const [slug, links] of Object.entries(articleLinks)) {
  const slugPattern = `slug: "${slug}"`;
  const slugIndex = content.indexOf(slugPattern);
  if (slugIndex === -1) {
    console.log(`SKIP (not found): ${slug}`);
    skippedCount++;
    continue;
  }

  // Check if already has "Ressources utiles"
  const contentStart = content.indexOf('content: `', slugIndex);
  if (contentStart === -1) { skippedCount++; continue; }
  const contentValueStart = content.indexOf('`', contentStart + 9) + 1;
  const contentEnd = content.indexOf('`', contentValueStart);
  if (contentEnd === -1) { skippedCount++; continue; }

  const articleContent = content.substring(contentValueStart, contentEnd);
  if (articleContent.includes('Ressources utiles')) {
    console.log(`SKIP (already has links): ${slug}`);
    skippedCount++;
    continue;
  }

  let newContent = articleContent;
  if (links.contextLinks && links.contextLinks.length > 0) {
    newContent = addContextualLinks(newContent, links.contextLinks);
  }
  newContent = newContent + generateResourceSection(links.resourceLinks);

  content = content.substring(0, contentValueStart) + newContent + content.substring(contentEnd);
  modifiedCount++;
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Done! Modified: ${modifiedCount}, Skipped: ${skippedCount}`);
