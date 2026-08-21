import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/utils/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // El carrito es estado transitorio por usuario, sin contenido propio que indexar.
      disallow: '/carrito',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
