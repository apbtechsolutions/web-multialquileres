import { branches } from "@/data/branches";
import { absoluteUrl, site } from "@/lib/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "AutoRental"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: absoluteUrl("/es/"),
    logo: site.logo,
    image: site.ogImage,
    email: site.email,
    telephone: site.phone,
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: [
      { "@type": "City", name: "Ciudad de Panamá" },
      { "@type": "City", name: "David" },
      { "@type": "AdministrativeArea", name: "Chiriquí" },
      { "@type": "Country", name: "Panamá" },
    ],
    sameAs: site.social.map((item) => item.href),
    department: branches.map((branch) => ({
      "@type": "AutoRental",
      name: branch.name,
      url: absoluteUrl(`/es/sucursales/${branch.slug}/`),
      telephone: branch.phones[0],
      address: {
        "@type": "PostalAddress",
        streetAddress: branch.address,
        addressLocality: branch.city,
        addressRegion: branch.region,
        addressCountry: "PA",
      },
      ...(branch.lat && branch.lng
        ? {
            geo: {
              "@type": "GeoCoordinates",
              latitude: branch.lat,
              longitude: branch.lng,
            },
          }
        : {}),
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: absoluteUrl("/es/"),
    inLanguage: "es-PA",
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
