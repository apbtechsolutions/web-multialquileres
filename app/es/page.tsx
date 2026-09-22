import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { SearchWidget } from "@/components/home/SearchWidget";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { faqTopics } from "@/data/faqs";
import { rentSteps, testimonials } from "@/data/content";
import { fleet, getAllVehicles } from "@/lib/fleet";
import { pageMetadata } from "@/lib/seo";
import { organizationJsonLd, websiteJsonLd } from "@/lib/schema";
import { formatUsd, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Alquiler de autos en Ciudad de Panamá | Multialquileres",
  description:
    "Multialquileres Panamá alquila autos en Ciudad de Panamá, Tocumen, Panamá Pacífico y David. Consulta el catálogo publicado y pide una cotización por WhatsApp.",
  path: "/es/",
});

const featuredOrder = [
  "Chevrolet BUSITO",
  "Chevrolet SPARK",
  "Kia PICANTO",
  "Kia PICANTO XLINE",
  "Kia PICANTO 2026",
  "Hyundai ATOS",
];

export default function SpanishHomePage() {
  const vehicles = getAllVehicles();
  const featured = featuredOrder
    .map((name) => vehicles.find((vehicle) => vehicle.name === name))
    .filter((vehicle) => vehicle != null);
  const prices = vehicles.map((vehicle) => vehicle.fromPrice).filter((price): price is number => price != null);
  const minPrice = Math.min(...prices);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <section className="bg-brand-dark text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <div>
            <p className="text-sm font-semibold tracking-wide text-white/70 uppercase">Ciudad de Panamá</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Alquiler de autos en Panamá con Multialquileres
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-white/85">
              Grupo Cáceres, S.A. opera Multialquileres Panamá para alquilar autos en Ciudad de Panamá, con puntos publicados en Vía Veneto, El Cangrejo, Tocumen, Panamá Pacífico y David.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/75">
              El catálogo público reúne {vehicles.length} modelos. La tarifa diaria de referencia más baja publicada es {formatUsd(minPrice)}. Esa cifra no reserva el auto ni incluye extras.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/es/vehiculos/" className="rounded-full bg-white px-5 py-3 font-semibold text-brand-dark">
                Ver la flota
              </Link>
              <Link href="/es/contacto/" className="rounded-full border border-white/40 px-5 py-3 font-semibold">
                Ver sucursales
              </Link>
            </div>
          </div>
          <SearchWidget />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold text-brand-dark">Modelos destacados del catálogo</h2>
            <p className="mt-2 max-w-2xl text-muted">
              Estos seis modelos aparecen primero en la portada publicada. El resto de la flota está en el catálogo, agrupado por categoría.
            </p>
          </div>
          <Link href="/es/vehiculos/" className="hidden font-semibold text-brand hover:underline sm:inline">
            Ver todos los vehículos
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((vehicle) => (
            <VehicleCard key={vehicle.slug} vehicle={vehicle} />
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-3xl font-semibold text-brand-dark">Categorías publicadas</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {fleet.map((category) => (
              <article key={category.slug} className="rounded-2xl border border-line bg-white p-5">
                <h3 className="text-xl font-semibold text-brand-dark">
                  <Link href={`/es/vehiculos/${category.slug}/`} className="hover:underline">
                    {category.name}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">{category.summary}</p>
                <p className="mt-3 text-sm font-medium">
                  {category.count} {category.count === 1 ? "modelo" : "modelos"}
                  {category.minPrice != null ? ` · desde ${formatUsd(category.minPrice)} por día` : ""}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-3xl font-semibold text-brand-dark">Cómo se alquila</h2>
        <p className="mt-3 max-w-3xl text-muted">
          El sitio publicado resume el proceso en cuatro pasos. La cotización de esta web prepara el mensaje; la disponibilidad la confirma Multialquileres.
        </p>
        <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {rentSteps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-line p-5">
              <p className="text-sm font-semibold text-brand">Paso {index + 1}</p>
              <h3 className="mt-2 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
        <Link href="/es/como-alquilar/" className="mt-6 inline-block font-semibold text-brand hover:underline">
          Leer cómo alquilar un auto
        </Link>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-3xl font-semibold text-brand-dark">Lo que dicen clientes en el sitio publicado</h2>
          <p className="mt-2 max-w-3xl text-sm text-muted">
            Textos publicados en la portada anterior. No añadimos puntuación ni verificación independiente.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {testimonials.map((item) => (
              <figure key={item.name} className="rounded-2xl border border-line bg-white p-5">
                <blockquote className="text-sm leading-6">{item.text}</blockquote>
                <figcaption className="mt-3 text-sm font-semibold text-brand-dark">{item.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-14 lg:grid-cols-3">
        <article className="rounded-2xl bg-brand-dark p-6 text-white lg:col-span-1">
          <h2 className="text-2xl font-semibold">Qué ofrece la empresa, según sus textos</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-white/85">
            <li>Precios que describen como competitivos frente al mercado, sin una tabla comparativa publicada.</li>
            <li>Asistencia durante el alquiler y contacto por redes y WhatsApp.</li>
            <li>Reservas en línea en el sitio anterior. Esta reconstrucción cotiza por WhatsApp hasta conectar el motor de reservas.</li>
          </ul>
        </article>
        <article className="rounded-2xl border border-line p-6 lg:col-span-2">
          <h2 className="text-2xl font-semibold text-brand-dark">Preguntas que ya responden</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {faqTopics.map((topic) => (
              <li key={topic.slug}>
                <Link href={`/es/preguntas-frecuentes/${topic.slug}/`} className="font-semibold text-brand hover:underline">
                  {topic.title}
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-10 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-brand-dark">Pide disponibilidad antes de viajar</h2>
            <p className="mt-1 text-sm text-muted">WhatsApp {site.phone} · {site.email}</p>
          </div>
          <Link href="/es/cotizar/" className="rounded-full bg-brand px-5 py-3 font-semibold text-white">
            Solicitar cotización
          </Link>
        </div>
      </section>
    </>
  );
}
