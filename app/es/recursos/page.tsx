import Link from "next/link";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqTopics } from "@/data/faqs";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Guías para alquilar un auto en Panamá | Multialquileres",
  description:
    "Índice de guías reales de Multialquileres Panamá: cómo alquilar, requisitos, pagos, cobertura y sucursales. No hay artículos inventados.",
  path: "/es/recursos/",
});

const guides = [
  { href: "/es/como-alquilar/", title: "Cómo alquilar un auto", text: "Los cuatro pasos publicados para reservar y retirar." },
  { href: "/es/vehiculos/", title: "Catálogo por categoría", text: "SUV, hatchback, sedán, pickup y busito con los datos del catálogo." },
  { href: "/es/sucursales/", title: "Dónde entregar y devolver", text: "Oficinas y aeropuertos que sí aparecen en el listado de lugares." },
];

export default function ResourcesPage() {
  const crumbs = [
    { name: "Inicio", path: "/es/" },
    { name: "Guías", path: "/es/recursos/" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageIntro
        crumbs={crumbs}
        eyebrow="Guías"
        title="Información útil que ya está publicada"
        intro="Este índice reúne páginas con datos reales del negocio. No hay un blog con artículos generados: cuando el cliente aporte guías verificables, se pueden sumar aquí con fecha, autor y fuente."
      />
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 md:grid-cols-2">
        {guides.map((guide) => (
          <article key={guide.href} className="rounded-2xl border border-line p-5">
            <h2 className="text-xl font-semibold">
              <Link href={guide.href} className="text-brand-dark hover:underline">
                {guide.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-muted">{guide.text}</p>
          </article>
        ))}
        {faqTopics.map((topic) => (
          <article key={topic.slug} className="rounded-2xl border border-line p-5">
            <h2 className="text-xl font-semibold">
              <Link href={`/es/preguntas-frecuentes/${topic.slug}/`} className="text-brand-dark hover:underline">
                {topic.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-muted">{topic.description}</p>
          </article>
        ))}
      </div>
    </>
  );
}
