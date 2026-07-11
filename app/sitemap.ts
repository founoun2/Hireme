import type { MetadataRoute } from 'next';
import { BLOG_ARTICLES } from '@/data/blog-articles';
import { CITIES_DATA } from '@/data/cities';
import { CATEGORIES_DATA } from '@/data/categories';
import { COMPANIES_DATA } from '@/data/companies';

const BASE_URL = 'https://hirememaroc.online';

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString();

  const entries: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: today, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/emploi`, lastModified: today, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/a-propos`, lastModified: today, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: today, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/confidentialite`, lastModified: today, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/conditions`, lastModified: today, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/cookies`, lastModified: today, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/editorial`, lastModified: today, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/accessibilite`, lastModified: today, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/faq`, lastModified: today, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/avertissement`, lastModified: today, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/comment-nous-collectons`, lastModified: today, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE_URL}/signaler-arnaque`, lastModified: today, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/centre-carriere`, lastModified: today, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/guides`, lastModified: today, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/salaires`, lastModified: today, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/villes`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/categories`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/entreprises`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
  ];

  for (const article of BLOG_ARTICLES) {
    entries.push({
      url: `${BASE_URL}/blog/${article.slug}`,
      lastModified: article.updatedAt || article.publishedAt || today,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  for (const city of CITIES_DATA) {
    entries.push({
      url: `${BASE_URL}/villes/${city.slug}`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  }

  for (const category of CATEGORIES_DATA) {
    entries.push({
      url: `${BASE_URL}/categories/${category.slug}`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  }

  for (const company of COMPANIES_DATA) {
    entries.push({
      url: `${BASE_URL}/entreprises/${company.slug}`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  return entries;
}
