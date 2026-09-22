import type { MetadataRoute } from "next";

/**
 * Este host (web.multialquileres.com.pa) es QA. La indexación se bloquea con
 * meta robots y X-Robots-Tag (noindex), no con Disallow.
 *
 * Disallow solo ocultaría las etiquetas noindex: Google puede listar URLs
 * bloqueadas sin ver el noindex. Por eso Allow: / y no se anuncia sitemap.
 * /sitemap.xml puede existir para uso interno, pero no se enlaza desde aquí.
 * El sitio indexable es https://www.multialquileres.com.pa.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
  };
}
