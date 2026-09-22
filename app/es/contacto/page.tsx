import Link from "next/link";
import { RequestForm } from "@/components/forms/RequestForm";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { branches } from "@/data/branches";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/schema";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contacto y sucursales de Multialquileres en Panamá",
  description:
    "Teléfono, correo y sucursales de Multialquileres Panamá: Vía Veneto, Plaza Granada, Tocumen, David y Panamá Pacífico.",
  path: "/es/contacto/",
});

export default function ContactPage() {
  const crumbs = [
    { name: "Inicio", path: "/es/" },
    { name: "Contacto", path: "/es/contacto/" },
  ];
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contacto de Multialquileres Panamá",
    url: absoluteUrl("/es/contacto/"),
    mainEntity: { "@id": `${site.url}/#organization` },
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={contactJsonLd} />
      <PageIntro
        crumbs={crumbs}
        eyebrow="Contacto"
        title="Habla con Multialquileres Panamá"
        intro={`El teléfono principal publicado es ${site.phone} y el correo es ${site.email}. Cada sucursal tiene además sus propios números. El formulario arma un mensaje de WhatsApp; no guarda los datos en un servidor.`}
      />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2">
        <RequestForm intent="contacto" />
        <div className="grid gap-4">
          {branches.map((branch) => (
            <article key={branch.slug} className="rounded-2xl border border-line p-4">
              <h2 className="text-lg font-semibold text-brand-dark">
                <Link href={`/es/sucursales/${branch.slug}/`} className="hover:underline">
                  {branch.name}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-muted">{branch.address}</p>
              <p className="mt-2 text-sm">{branch.phones.join(" · ")}</p>
              {branch.landline ? <p className="text-sm">Fijo: {branch.landline}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
