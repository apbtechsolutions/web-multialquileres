import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import terms from "@/data/terms.json";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Términos y condiciones de alquiler | Multialquileres Panamá",
  description:
    "Términos publicados por Multialquileres Panamá y Grupo Cáceres, S.A. para reservas, documentos, cancelaciones, depósitos y uso del vehículo.",
  path: "/es/terminos-y-condiciones/",
});

export default function TermsPage() {
  const crumbs = [
    { name: "Inicio", path: "/es/" },
    { name: "Términos y condiciones", path: "/es/terminos-y-condiciones/" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageIntro
        crumbs={crumbs}
        eyebrow="Legal"
        title="Términos y condiciones publicados"
        intro="Este texto reproduce las condiciones que estaban en el sitio de Multialquileres Panamá. Algunos apartados, como Oferta Sorpresa, Cashback y Rental Cover, parecen restos de la plantilla del motor de reservas y deben revisarlos el cliente y su asesor legal antes de darlos por vigentes."
      />
      <article className="mx-auto max-w-3xl space-y-4 px-4 py-10 text-sm leading-7 text-muted">
        {terms.map((paragraph, index) => (
          <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
        ))}
      </article>
    </>
  );
}
