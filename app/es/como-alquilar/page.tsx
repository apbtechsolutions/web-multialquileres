import Link from "next/link";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { rentSteps } from "@/data/content";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/schema";

const faqs = [
  {
    question: "¿La cotización de esta web reserva el auto?",
    answer:
      "No. Prepara un mensaje de WhatsApp con lugar, fechas y modelo. Multialquileres confirma disponibilidad y tarifa. El motor de reservas del sitio anterior no está conectado a esta reconstrucción.",
  },
  {
    question: "¿Cuántos días se pueden consultar?",
    answer:
      "La configuración publicada del sitio anterior permitía búsquedas de 1 a 365 días. Conviene confirmar el mínimo real al cotizar.",
  },
  ...rentSteps.map((step, index) => ({
    question: `Paso ${index + 1}: ${step.title}`,
    answer: step.text,
  })),
];

export const metadata = pageMetadata({
  title: "Cómo alquilar un auto en Panamá | Multialquileres",
  description:
    "Pasos publicados para alquilar un auto con Multialquileres Panamá: lugar y fechas, elección del vehículo, datos y pago en el punto de entrega.",
  path: "/es/como-alquilar/",
});

export default function HowToRentPage() {
  const crumbs = [
    { name: "Inicio", path: "/es/" },
    { name: "Cómo alquilar", path: "/es/como-alquilar/" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(faqs)} />
      <PageIntro
        crumbs={crumbs}
        eyebrow="Proceso"
        title="Alquilar un auto con Multialquileres es un proceso de cuatro pasos"
        intro="El sitio publicado lo resume así: indicas lugar y fechas, eliges el vehículo, completas tus datos y pagas al pasar por el punto de entrega. En esta reconstrucción, el primer contacto es una cotización por WhatsApp porque el motor de reservas anterior no está conectado."
      />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1.2fr_0.8fr]">
        <ol className="grid gap-4">
          {rentSteps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-line p-5">
              <h2 className="text-xl font-semibold text-brand-dark">
                {index + 1}. {step.title}
              </h2>
              <p className="mt-2 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
        <aside className="h-fit rounded-2xl bg-surface p-5">
          <h2 className="text-xl font-semibold text-brand-dark">Antes de retirar el auto</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Los términos publicados piden, como regla general, 23 años, licencia física y una tarjeta de crédito física a nombre del titular para el depósito.
          </p>
          <Link href="/es/preguntas-frecuentes/requisitos/" className="mt-4 inline-block font-semibold text-brand hover:underline">
            Ver requisitos de alquiler
          </Link>
          <Link href="/es/cotizar/" className="mt-4 block rounded-full bg-brand px-4 py-3 text-center font-semibold text-white">
            Solicitar cotización
          </Link>
        </aside>
      </div>
    </>
  );
}
