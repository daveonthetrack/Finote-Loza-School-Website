export async function getServerSideProps({ res }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finoteloza.edu';
  const pages = ['', 'about', 'admissions', 'online-application', 'faculty-directory', 'news', 'gallery', 'calendar', 'contact']
    .map((p) => `${baseUrl}/${p}`.replace(/\/$/, ''));
  const urls = pages
    .map((url) => `<url><loc>${url}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`) 
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  res.setHeader('Content-Type', 'application/xml');
  res.write(xml);
  res.end();
  return { props: {} };
}

export default function SiteMap() { return null; }


