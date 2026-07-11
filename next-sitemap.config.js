/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: 'https://hirememaroc.online',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://hirememaroc.online/sitemap-blog.xml',
      'https://hirememaroc.online/sitemap-villes.xml',
      'https://hirememaroc.online/sitemap-categories.xml',
      'https://hirememaroc.online/sitemap-entreprises.xml',
    ],
  },
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: path === '/' ? 'daily' : 'weekly',
      priority: path === '/' ? 1.0 : path.startsWith('/blog') ? 0.8 : 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
