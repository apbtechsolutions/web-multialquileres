import Link from "next/link";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { branches } from "@/data/branches";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Sucursales de alquiler de autos en Panamá | Multialquileres",
  description:
    "Puntos publicados por Multialquileres Panamá: oficina de Vía Veneto, Plaza Granada, aeropuerto de Tocumen, David y Panamá Pacífico.",
  path: "/es/sucursales/",
});

export default function BranchesPage() {
  const crumbs = [
    { name: "Inicio", path: "/es/" },
    { name: "Sucursales", path: "/es/sucursales/" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageIntro
        crumbs={crumbs}
        eyebrow="Dónde estamos"
        title="Puntos de entrega y devolución publicados"
        intro="El catálogo de lugares de Multialquileres incluye oficina central en Bella Vista, sucursal en El Cangrejo, el aeropuerto de Tocumen, David en Chiriquí y el aeropuerto de Panamá Pacífico. No hay otras ciudades en esa lista."
      />
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 md:grid-cols-2">
        {branches.map((branch) => (
          <article key={branch.slug} className="rounded-2xl border border-line p-5">
            <p className="text-xs font-semibold tracking-wide text-brand uppercase">{branch.category}</p>
            <h2 className="mt-1 text-xl font-semibold text-brand-dark">
              <Link href={`/es/sucursales/${branch.slug}/`} className="hover:underline">
                {branch.name}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-muted">{branch.address}</p>
            {branch.deliveryFee != null ? (
              <p className="mt-2 text-sm">Cargo publicado para este punto: USD {branch.deliveryFee}.</p>
            ) : null}
          </article>
        ))}
      </div>
    </>
  );
}
