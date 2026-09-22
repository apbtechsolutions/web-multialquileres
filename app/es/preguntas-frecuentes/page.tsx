import Link from "next/link";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqTopics } from "@/data/faqs";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Preguntas frecuentes sobre alquiler de autos en Panamá",
  description:
    "Respuestas publicadas por Multialquileres Panamá sobre reservas, requisitos, pagos, cambios, cobertura y servicios adicionales.",
  path: "/es/preguntas-frecuentes/",
});

export default function FaqIndexPage() {
  const crumbs = [
    { name: "Inicio", path: "/es/" },
    { name: "Preguntas frecuentes", path: "/es/preguntas-frecuentes/" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageIntro
        crumbs={crumbs}
        eyebrow="Ayuda"
        title="Preguntas frecuentes del alquiler de autos"
        intro="Estas páginas reúnen las respuestas que ya estaban publicadas en el sitio de Multialquileres. Si una respuesta no estaba, queda marcada para que la complete el cliente. No hay buscador artificial: cada tema tiene su propia dirección."
      />
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 md:grid-cols-2">
        {faqTopics.map((topic) => (
          <article key={topic.slug} className="rounded-2xl border border-line p-5">
            <h2 className="text-xl font-semibold text-brand-dark">
              <Link href={`/es/preguntas-frecuentes/${topic.slug}/`} className="hover:underline">
                {topic.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">{topic.intro}</p>
          </article>
        ))}
      </div>
    </>
  );
}
