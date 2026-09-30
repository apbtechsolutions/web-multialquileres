import type { MetadataRoute } from "next";
import { branches } from "@/data/branches";
import { faqTopics } from "@/data/faqs";
import { fleet, vehiclePath } from "@/lib/fleet";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/es/",
    "/es/vehiculos/",
    "/es/como-alquilar/",
    "/es/nosotros/",
    "/es/contacto/",
    "/es/preguntas-frecuentes/",
    "/es/rentas-corporativas/",
    "/es/cotizar/",
    "/es/buscar/",
    "/es/reservar/",
    "/es/sucursales/",
    "/es/recursos/",
    "/es/iniciar-sesion/",
    "/es/terminos-y-condiciones/",
    "/es/politica-de-privacidad/",
    "/es/politica-de-cookies/",
    "/es/aviso-legal/",
  ];

  const urls = [
    ...staticPaths,
    ...fleet.map((category) => `/es/vehiculos/${category.slug}/`),
    ...fleet.flatMap((category) => category.vehicles.map((vehicle) => vehiclePath(vehicle))),
    ...faqTopics.map((topic) => `/es/preguntas-frecuentes/${topic.slug}/`),
    ...branches.map((branch) => `/es/sucursales/${branch.slug}/`),
  ];

  return urls.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === "/es/" || path.startsWith("/es/vehiculos") ? "weekly" : "monthly",
    priority: path === "/es/" ? 1 : path.includes("terminos") || path.includes("politica") || path.includes("aviso") ? 0.3 : 0.7,
  }));
}
