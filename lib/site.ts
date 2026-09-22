export const site = {
  name: "Multialquileres Panamá",
  alternateName: "Multi Alquileres Panamá",
  legalName: "Grupo Cáceres, S.A.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://web.multialquileres.com.pa",
  locale: "es-PA",
  email: "info@multialquileres.com.pa",
  phone: "+507 6406 7623",
  phoneTel: "+50764067623",
  whatsapp:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "50764067623",
  whatsappMessage:
    "Buen día, estoy interesado/a en alquilar un auto.",
  address: {
    street: "Vía Veneto, Bella Vista, Calle Hercilia Lamela, frente al hotel Coral Suites",
    locality: "Ciudad de Panamá",
    region: "Panamá",
    country: "PA",
  },
  geo: { latitude: 8.985833, longitude: -79.526943 },
  logo: "https://rently.blob.core.windows.net/pagebuilder/multialquileres/logoeditable202602_xl.webp",
  ogImage:
    "https://rently.blob.core.windows.net/pagebuilder/multialquileres/vehiculos2_xl.webp",
  favicon:
    "https://rently.blob.core.windows.net/pagebuilder/multialquileres/multifaviconjpg.webp",
  social: [
    {
      name: "Instagram",
      href: "https://www.instagram.com/multialquilerespanama/",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/multialquilerespanama/",
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@multialquileres.p",
    },
  ],
  priceDisclaimer:
    "Tarifa diaria de referencia tomada del catálogo público. No confirma disponibilidad ni el total a pagar: el importe depende de las fechas, el lugar de entrega y los servicios que se contraten.",
} as const;

export function absoluteUrl(path: string) {
  const base = site.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized.endsWith("/") ? normalized : `${normalized}/`}`;
}

export function whatsappHref(text: string = site.whatsappMessage) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function formatUsd(value: number) {
  return new Intl.NumberFormat("es-PA", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}
