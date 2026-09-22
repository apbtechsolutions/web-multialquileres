import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { fleet, getCategory } from "@/lib/fleet";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/schema";
import { formatUsd } from "@/lib/site";

type Params = { categoria: string };

export function generateStaticParams() {
  return fleet.map((category) => ({ categoria: category.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { categoria } = await params;
  const category = getCategory(categoria);
  if (!category) return {};
  return pageMetadata({
    title: `${category.title} | Multialquileres`,
    description: category.summary,
    path: `/es/vehiculos/${category.slug}/`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { categoria } = await params;
  const category = getCategory(categoria);
  if (!category) notFound();
  const crumbs = [
    { name: "Inicio", path: "/es/" },
    { name: "Vehículos", path: "/es/vehiculos/" },
    { name: category.name, path: `/es/vehiculos/${category.slug}/` },
  ];
  const examples = category.vehicles.slice(0, 4).map((vehicle) => vehicle.name).join(", ");

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageIntro
        crumbs={crumbs}
        eyebrow={category.name}
        title={category.title}
        intro={`${category.summary} Hay ${category.count} ${category.count === 1 ? "modelo publicado" : "modelos publicados"}${category.minPrice != null ? `, desde ${formatUsd(category.minPrice)} por día` : ""}. Entre ellos están ${examples}.`}
      />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {category.vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.slug} vehicle={vehicle} />
          ))}
        </div>
        <p className="mt-8 text-sm">
          <Link href="/es/vehiculos/" className="font-semibold text-brand hover:underline">
            Volver al catálogo completo
          </Link>
        </p>
      </div>
    </>
  );
}
