import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Aviso legal | Multialquileres Panamá",
  description:
    "Identidad publicada de Multialquileres Panamá y Grupo Cáceres, S.A., con domicilio en Bella Vista, Ciudad de Panamá.",
  path: "/es/aviso-legal/",
});

export default function LegalNoticePage() {
  const crumbs = [
    { name: "Inicio", path: "/es/" },
    { name: "Aviso legal", path: "/es/aviso-legal/" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageIntro
        crumbs={crumbs}
        eyebrow="Legal"
        title="Aviso legal con los datos publicados"
        intro="Los términos identifican a Grupo Cáceres, S.A., representada por Multialquileres Panamá, como la empresa de alquiler de autos. Este aviso no sustituye un texto revisado por un abogado."
      />
      <article className="mx-auto max-w-3xl space-y-3 px-4 py-10 text-sm leading-7">
        <p><strong>Nombre comercial:</strong> {site.name}</p>
        <p><strong>Razón social publicada:</strong> {site.legalName}</p>
        <p><strong>Domicilio publicado:</strong> {site.address.street}, {site.address.locality}, {site.address.region}</p>
        <p><strong>Teléfono principal:</strong> {site.phone}</p>
        <p><strong>Correo:</strong> {site.email}</p>
        <p><strong>Sitio:</strong> {site.url}</p>
        <p>[REQUIERE INFORMACIÓN DEL CLIENTE] RUC, datos de registro mercantil y representante legal.</p>
      </article>
    </>
  );
}
