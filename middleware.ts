import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const exact: Record<string, string> = {
  "/": "/es/",
  "/es/Vehiculos": "/es/vehiculos/",
  "/es/Vehiculos/": "/es/vehiculos/",
  "/es/es/Vehiculos": "/es/vehiculos/",
  "/es/es/Vehiculos/": "/es/vehiculos/",
  "/es/condiciones": "/es/terminos-y-condiciones/",
  "/es/condiciones/": "/es/terminos-y-condiciones/",
  "/es/poli-privac": "/es/politica-de-privacidad/",
  "/es/poli-privac/": "/es/politica-de-privacidad/",
  "/es/pasos-alquiler": "/es/como-alquilar/",
  "/es/pasos-alquiler/": "/es/como-alquilar/",
  "/es/cliente-corporativo-reservaciones": "/es/rentas-corporativas/",
  "/es/cliente-corporativo-reservaciones/": "/es/rentas-corporativas/",
  "/es/conf-reserva-faq": "/es/preguntas-frecuentes/confirmacion-de-reserva/",
  "/es/conf-reserva-faq/": "/es/preguntas-frecuentes/confirmacion-de-reserva/",
  "/es/req-alq-faq": "/es/preguntas-frecuentes/requisitos/",
  "/es/req-alq-faq/": "/es/preguntas-frecuentes/requisitos/",
  "/es/pag-tar-faq": "/es/preguntas-frecuentes/pagos-y-tarifas/",
  "/es/pag-tar-faq/": "/es/preguntas-frecuentes/pagos-y-tarifas/",
  "/es/camb-canc-faq": "/es/preguntas-frecuentes/cambios-y-cancelaciones/",
  "/es/camb-canc-faq/": "/es/preguntas-frecuentes/cambios-y-cancelaciones/",
  "/es/prot-cobe-faq": "/es/preguntas-frecuentes/proteccion-y-cobertura/",
  "/es/prot-cobe-faq/": "/es/preguntas-frecuentes/proteccion-y-cobertura/",
  "/es/serv-adc-faq": "/es/preguntas-frecuentes/servicios-adicionales/",
  "/es/serv-adc-faq/": "/es/preguntas-frecuentes/servicios-adicionales/",
  "/en": "/es/",
  "/en/": "/es/",
  "/fleet": "/es/vehiculos/",
  "/fleet/": "/es/vehiculos/",
  "/contact": "/es/contacto/",
  "/contact/": "/es/contacto/",
  "/faq": "/es/preguntas-frecuentes/",
  "/faq/": "/es/preguntas-frecuentes/",
  "/conditions": "/es/terminos-y-condiciones/",
  "/conditions/": "/es/terminos-y-condiciones/",
};

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path === "/en" || path.startsWith("/en/")) {
    return NextResponse.redirect(new URL("/es/", request.url), 301);
  }

  const destination = exact[path];
  if (destination && destination !== path) {
    return NextResponse.redirect(new URL(destination, request.url), 301);
  }

  if (path.startsWith("/es/es/")) {
    const collapsed = path.replace("/es/es/", "/es/");
    const mapped = exact[collapsed] ?? collapsed;
    return NextResponse.redirect(new URL(mapped, request.url), 301);
  }

  const last = path.split("/").pop() ?? "";
  if (path !== "/" && !path.endsWith("/") && !last.includes(".")) {
    return NextResponse.redirect(new URL(`${path}/`, request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/es/:path*", "/en", "/en/:path*", "/fleet", "/fleet/:path*", "/contact", "/faq", "/conditions"],
};
