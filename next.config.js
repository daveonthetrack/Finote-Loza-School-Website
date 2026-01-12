/** @type {import('next').NextConfig} */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseHost = supabaseUrl.replace(/^https?:\/\//, '').split('/')[0] || '';

const domains = ['ui-avatars.com'];
if (supabaseHost) domains.push(supabaseHost);

const remotePatterns = [];
if (supabaseHost) {
  remotePatterns.push({
    protocol: 'https',
    hostname: supabaseHost,
    pathname: '/storage/v1/object/public/**',
  });
}
remotePatterns.push({ protocol: 'https', hostname: 'ui-avatars.com', pathname: '/api/**' });

const config = {
  reactStrictMode: true,
  images: {
    domains,
    remotePatterns,
  },
};

module.exports = config;



