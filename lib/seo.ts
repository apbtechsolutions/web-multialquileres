import type { Metadata } from "next";
import { absoluteUrl, site } from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noindex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  ogImage = site.ogImage,
  noindex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "es-PA": url,
        "x-default": url,
      },
    },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
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
