import type { Metadata } from "next";
import { absoluteUrl, site } from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
};

/**
 * Metadata por página en el entorno QA (web.multialquileres.com.pa).
 * Siempre noindex/nofollow/noarchive. Canonical autorreferencial al host QA
 * (válido junto con noindex). Sin hreflang: no pedimos indexar este host.
 * El sitio indexable es https://www.multialquileres.com.pa.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogImage = site.ogImage,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: "noindex, nofollow, noarchive",
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: site.name,
      locale: "es_PA",
      images: [{ url: ogImage, alt: `${site.name}, alquiler de autos en Panamá` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
