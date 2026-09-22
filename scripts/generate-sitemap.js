const fs = require('fs');
const { ALL_TOOLS } = require('../src/data/toolsRegistry.js');
const { BLOG_POSTS } = require('../src/data/blogPosts.js');

const baseUrl = 'https://platformtools.netlify.app';
const today = new Date().toISOString().split('T')[0];

const staticPages = [
  { loc: '/', priority: '1.0', changefreq: 'daily' },
  { loc: '/blog', priority: '0.9', changefreq: 'daily' },
  { loc: '/about', priority: '0.7', changefreq: 'monthly' },
  { loc: '/contact', priority: '0.7', changefreq: 'monthly' },
  { loc: '/privacy', priority: '0.5', changefreq: 'yearly' },
  { loc: '/terms', priority: '0.5', changefreq: 'yearly' }
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

for (const page of staticPages) {
  xml += `  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
}

for (const tool of ALL_TOOLS) {
  xml += `  <url>
    <loc>${baseUrl}${tool.href}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${tool.isPopular ? '0.9' : '0.8'}</priority>
  </url>
`;
}

for (const post of BLOG_POSTS) {
  xml += `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
`;
}

xml += `</urlset>\n`;

fs.writeFileSync('public/sitemap.xml', xml, 'utf8');
console.log(`Generated sitemap.xml with ${staticPages.length + ALL_TOOLS.length + BLOG_POSTS.length} URLs.`);
