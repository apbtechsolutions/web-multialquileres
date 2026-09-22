import { RequestForm } from "@/components/forms/RequestForm";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Alquiler de autos para empresas en Panamá | Multialquileres",
  description:
    "Multialquileres Panamá invita a empresas a dejar sus datos para una cuenta corporativa. Un ejecutivo debe confirmar condiciones y tarifas.",
  path: "/es/rentas-corporativas/",
});

export default function CorporatePage() {
  const crumbs = [
    { name: "Inicio", path: "/es/" },
    { name: "Rentas corporativas", path: "/es/rentas-corporativas/" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageIntro
        crumbs={crumbs}
        eyebrow="Empresas"
        title="Cuentas corporativas de alquiler de autos"
        intro="El sitio publicado dice que el programa de cuentas corporativas ofrece ventajas para la empresa y pide dejar los datos para que un ejecutivo llame. No publica descuentos, requisitos ni un contrato tipo. Esta página solo prepara el mensaje de contacto."
      />
      <div className="mx-auto max-w-3xl px-4 py-10">
        <RequestForm intent="corporativo" />
      </div>
    </>
  );
}
