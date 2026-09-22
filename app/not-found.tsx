import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Página no encontrada | Multialquileres Panamá",
  description: "La dirección no existe en el sitio de Multialquileres Panamá.",
  path: "/404/",
  noindex: true,
});

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20">
      <p className="text-sm font-semibold text-brand">404</p>
      <h1 className="mt-2 text-4xl font-semibold text-brand-dark">No encontramos esta página</h1>
      <p className="mt-4 text-muted">
        La dirección no forma parte del sitio. Puedes volver al inicio, ver el catálogo o pedir una cotización.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/es/" className="rounded-full bg-brand px-4 py-2 font-semibold text-white">
          Ir al inicio
        </Link>
        <Link href="/es/vehiculos/" className="rounded-full border border-brand px-4 py-2 font-semibold text-brand">
          Ver vehículos
        </Link>
      </div>
    </section>
  );
}
