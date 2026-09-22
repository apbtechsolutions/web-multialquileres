import type { Branch } from "@/types/content";

export const branches: Branch[] = [
  {
    slug: "oficina-via-veneto",
    name: "Oficina Central — Vía Veneto",
    category: "Oficina",
    address:
      "Vía Veneto, Bella Vista, Calle Hercilia Lamela, frente al hotel Coral Suites, Ciudad de Panamá",
    city: "Ciudad de Panamá",
    region: "Panamá",
    phones: ["+507 6585-1514", "+507 6073-9474"],
    landline: "+507 380-9334",
    hours: "Lunes a viernes 08:00–19:00, sábado 08:00–17:00 y domingo 08:00–14:00.",
    hoursNote:
      "Horario del calendario publicado para la oficina central. El marcado del sitio anterior decía lunes a sábado 08:00–20:00.",
    lat: 8.985158,
    lng: -79.528766,
    summary:
      "Oficina central publicada en Bella Vista, Ciudad de Panamá, con entrega y devolución. También es el punto asociado al teléfono principal de WhatsApp del sitio.",
  },
  {
    slug: "plaza-granada",
    name: "Sucursal Plaza Granada — El Cangrejo",
    category: "Oficina",
    address:
      "Calle Eusebio A. Morales, Edificio Plaza Granada, Local 2, Urbanización El Cangrejo, Ciudad de Panamá",
    city: "Ciudad de Panamá",
    region: "Panamá",
    phones: ["+507 6992-1707"],
    landline: "+507 211-1325",
    hours: "Lunes a viernes 08:00–19:00 y sábado 08:00–18:00. El domingo no aparece abierto en el calendario publicado.",
    summary:
      "Sucursal publicada en El Cangrejo. El catálogo de lugares no trae coordenadas utilizables para esta oficina, así que el mapa no se muestra.",
  },
  {
    slug: "aeropuerto-tocumen",
    name: "Aeropuerto Internacional de Tocumen (PTY)",
    category: "Aeropuerto",
    address: "Avenida Domingo Díaz, Ciudad de Panamá",
    city: "Ciudad de Panamá",
    region: "Panamá",
    phones: ["+507 6406-7623"],
    hours: "Lunes a viernes 08:00–17:00 y sábado 09:00–16:00, según el calendario publicado de este punto.",
    hoursNote:
      "El calendario de este punto venía con una zona horaria inconsistente en el sitio anterior. Conviene confirmar el horario con la oficina.",
    lat: 9.052682,
    lng: -79.442684,
    summary:
      "Punto de entrega y devolución publicado en el Aeropuerto Internacional de Tocumen. La tarifa de traslado de este punto figura en 0 en el catálogo de lugares.",
  },
  {
    slug: "david-chiriqui",
    name: "David — Chiriquí",
    category: "Oficina",
    address: "Calle E Sur 397-21, David, Chiriquí",
    city: "David",
    region: "Chiriquí",
    phones: ["+507 6755-5355"],
    landline: "+507 211-1325",
    hours: "La página de contacto publicada indica disponibilidad 24/7 en David.",
    lat: 8.400728,
    lng: -82.442777,
    summary:
      "Punto publicado en David, Chiriquí, con entrega y devolución. La dirección de contacto y la del catálogo de lugares no coinciden palabra por palabra.",
  },
  {
    slug: "aeropuerto-panama-pacifico",
    name: "Aeropuerto Internacional Panamá Pacífico (BLB)",
    category: "Aeropuerto",
    address: "Área Económica Especial Panamá Pacífico, Panamá",
    city: "Panamá",
    region: "Panamá",
    phones: ["+507 6406-7623"],
    lat: 8.911078,
    lng: -79.591943,
    deliveryFee: 15,
    hours: "[REQUIERE INFORMACIÓN DEL CLIENTE]",
    summary:
      "Punto de entrega y devolución publicado en el Aeropuerto Internacional Panamá Pacífico. El catálogo de lugares indica un cargo de 15 USD para este punto.",
  },
];

export function getBranch(slug: string) {
  return branches.find((branch) => branch.slug === slug);
}
