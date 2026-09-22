import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Multialquileres",
    description: "Alquiler de autos en Panamá",
    start_url: "/es/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#192577",
    lang: "es-PA",
  };
}
