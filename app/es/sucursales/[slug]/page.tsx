import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { branches, getBranch } from "@/data/branches";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/schema";
import { absoluteUrl, site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return branches.map((branch) => ({ slug: branch.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const branch = getBranch(slug);
  if (!branch) return {};
  return pageMetadata({
    title: `${branch.name} | Multialquileres Panamá`,
    description: branch.summary,
    path: `/es/sucursales/${branch.slug}/`,
  });
}

export default async function BranchPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const branch = getBranch(slug);
  if (!branch) notFound();
  const crumbs = [
    { name: "Inicio", path: "/es/" },
    { name: "Sucursales", path: "/es/sucursales/" },
    { name: branch.name, path: `/es/sucursales/${branch.slug}/` },
  ];
  const map =
    branch.lat != null && branch.lng != null
      ? `https://www.openstreetmap.org/export/embed.html?bbox=${branch.lng - 0.03}%2C${branch.lat - 0.03}%2C${branch.lng + 0.03}%2C${branch.lat + 0.03}&layer=mapnik&marker=${branch.lat}%2C${branch.lng}`
      : null;
  const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: `${site.name} — ${branch.name}`,
    url: absoluteUrl(`/es/sucursales/${branch.slug}/`),
    parentOrganization: { "@id": `${site.url}/#organization` },
    telephone: branch.phones[0],
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.address,
      addressLocality: branch.city,
      addressRegion: branch.region,
      addressCountry: "PA",
    },
    ...(branch.lat != null && branch.lng != null
      ? { geo: { "@type": "GeoCoordinates", latitude: branch.lat, longitude: branch.lng } }
      : {}),
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={placeJsonLd} />
      <PageIntro crumbs={crumbs} eyebrow={branch.category} title={branch.name} intro={branch.summary} />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-brand-dark">Datos de contacto publicados</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-medium">Dirección</dt>
              <dd>{branch.address}</dd>
            </div>
            <div>
              <dt className="font-medium">Teléfonos</dt>
              <dd>{branch.phones.join(", ")}</dd>
            </div>
            {branch.landline ? (
              <div>
                <dt className="font-medium">Fijo</dt>
                <dd>{branch.landline}</dd>
              </div>
            ) : null}
            <div>
              <dt className="font-medium">Horario</dt>
              <dd>{branch.hours}</dd>
              {branch.hoursNote ? <dd className="mt-1 text-muted">{branch.hoursNote}</dd> : null}
            </div>
            {branch.deliveryFee != null ? (
              <div>
                <dt className="font-medium">Cargo publicado</dt>
                <dd>USD {branch.deliveryFee} para este punto, según el catálogo de lugares.</dd>
              </div>
            ) : null}
          </dl>
          <Link href={`/es/cotizar/?entrega=${branch.slug}`} className="mt-6 inline-flex rounded-full bg-brand px-5 py-3 font-semibold text-white">
            Cotizar entrega en este punto
          </Link>
        </div>
        {map ? (
          <iframe title={`Mapa de ${branch.name}`} src={map} className="h-80 w-full rounded-2xl border border-line" loading="lazy" />
        ) : (
          <p className="rounded-2xl bg-surface p-6 text-sm text-muted">
            No hay coordenadas publicadas para mostrar un mapa de esta sucursal.
          </p>
        )}
      </div>
    </>
  );
}
