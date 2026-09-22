import Link from "next/link";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Multialquileres Panamá, empresa de alquiler de autos",
  description:
    "Multialquileres Panamá es la marca de Grupo Cáceres, S.A. para alquiler de autos, con oficina en Bella Vista y puntos en Tocumen, El Cangrejo, Panamá Pacífico y David.",
  path: "/es/nosotros/",
});

export default function AboutPage() {
  const crumbs = [
    { name: "Inicio", path: "/es/" },
    { name: "Nosotros", path: "/es/nosotros/" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageIntro
        crumbs={crumbs}
        eyebrow="Empresa"
        title="Multialquileres Panamá alquila autos en la República de Panamá"
        intro="En sus textos publicados, Multialquileres Panamá se describe como una empresa panameña de alquiler de autos que combina atención personalizada y un proceso de reserva. La razón social que aparece en el sitio y en los términos es Grupo Cáceres, S.A."
      />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2">
        <section>
          <h2 className="text-2xl font-semibold text-brand-dark">Historia publicada</h2>
          <p className="mt-3 leading-7 text-muted">
            Dicen que nacieron para cambiar la experiencia de alquiler de autos en Panamá, con una flota actualizada y servicio en cada etapa. El sitio no publica el año de fundación ni el tamaño de la flota en unidades.
          </p>
          <h2 className="mt-8 text-2xl font-semibold text-brand-dark">Misión publicada</h2>
          <p className="mt-3 leading-7 text-muted">
            Brindar movilidad con un servicio transparente y orientado al cliente, vehículos en buenas condiciones y trato claro en cada etapa. No publican una visión en un párrafo aparte: bajo ese título listan valores.
          </p>
        </section>
        <section className="rounded-2xl bg-surface p-6">
          <h2 className="text-2xl font-semibold text-brand-dark">Valores publicados</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6">
            <li><strong>Confianza:</strong> cumplen lo que prometen.</li>
            <li><strong>Innovación:</strong> evolucionan el servicio.</li>
            <li><strong>Compromiso:</strong> la experiencia del cliente es la prioridad.</li>
            <li><strong>Responsabilidad:</strong> mencionan cuidado del entorno y movilidad sostenible, sin detallar un programa.</li>
          </ul>
          <p className="mt-6 text-sm">
            <Link href="/es/sucursales/" className="font-semibold text-brand hover:underline">
              Ver las sucursales publicadas
            </Link>
          </p>
        </section>
      </div>
    </>
  );
}
