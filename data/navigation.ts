export const mainNav = [
  { href: "/es/", label: "Inicio" },
  { href: "/es/vehiculos/", label: "Vehículos" },
  { href: "/es/nosotros/", label: "Nosotros" },
  { href: "/es/como-alquilar/", label: "Cómo alquilar" },
  { href: "/es/preguntas-frecuentes/", label: "Preguntas frecuentes" },
  { href: "/es/contacto/", label: "Contacto" },
] as const;

export const footerNav = {
  empresa: [
    { href: "/es/nosotros/", label: "Sobre nosotros" },
    { href: "/es/sucursales/", label: "Sucursales" },
    { href: "/es/rentas-corporativas/", label: "Rentas corporativas" },
    { href: "/es/contacto/", label: "Contacto" },
  ],
  alquiler: [
    { href: "/es/vehiculos/", label: "Catálogo de vehículos" },
    { href: "/es/como-alquilar/", label: "Cómo alquilar un auto" },
    { href: "/es/cotizar/", label: "Solicitar cotización" },
    { href: "/es/preguntas-frecuentes/", label: "Preguntas frecuentes" },
    { href: "/es/recursos/", label: "Guías de alquiler" },
  ],
  legal: [
    { href: "/es/terminos-y-condiciones/", label: "Términos y condiciones" },
    { href: "/es/politica-de-privacidad/", label: "Política de privacidad" },
    { href: "/es/politica-de-cookies/", label: "Política de cookies" },
    { href: "/es/aviso-legal/", label: "Aviso legal" },
  ],
} as const;
