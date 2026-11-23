import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/dashboard/', '/bookings/', '/profile/', '/billing/'],
    },
    sitemap: 'https://ironworksgym.co.uk/sitemap.xml',
  };
}
