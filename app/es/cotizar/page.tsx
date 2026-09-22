import { RequestForm } from "@/components/forms/RequestForm";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/schema";

type Search = Record<string, string | string[] | undefined>;

export const metadata = pageMetadata({
  title: "Solicitar cotización de alquiler de auto | Multialquileres",
  description:
    "Pide una cotización de alquiler de auto a Multialquileres Panamá con lugar, fechas y modelo. La solicitud se envía por WhatsApp y no confirma disponibilidad.",
  path: "/es/cotizar/",
});

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

export default async function QuotePage({ searchParams }: { searchParams: Promise<Search> }) {
  const query = await searchParams;
  const crumbs = [
    { name: "Inicio", path: "/es/" },
    { name: "Cotizar", path: "/es/cotizar/" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageIntro
        crumbs={crumbs}
        eyebrow="Cotización"
        title="Solicita una cotización sin pagar en línea"
        intro="Indica lugar, fechas y, si ya lo sabes, el modelo. Al enviar, se abre WhatsApp con el resumen hacia el número publicado. Multialquileres debe confirmar si el auto está libre y cuál es el total."
      />
      <div className="mx-auto max-w-3xl px-4 py-10">
        <RequestForm
          intent="cotizacion"
          defaultVehicle={one(query.vehiculo)}
          defaults={{
            entrega: one(query.entrega),
            devolucion: one(query.devolucion) || one(query.entrega),
            desde: one(query.desde),
            hasta: one(query.hasta),
            horaDesde: one(query.horaDesde),
            horaHasta: one(query.horaHasta),
          }}
        />
      </div>
    </>
  );
}
