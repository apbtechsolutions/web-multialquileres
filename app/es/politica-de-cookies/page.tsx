import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Política de cookies | Multialquileres Panamá",
  description:
    "Qué dice Multialquileres Panamá sobre las cookies de analítica y cómo aceptarlas o rechazarlas en este sitio.",
  path: "/es/politica-de-cookies/",
});

export default function CookiesPage() {
  const crumbs = [
    { name: "Inicio", path: "/es/" },
    { name: "Política de cookies", path: "/es/politica-de-cookies/" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageIntro
        crumbs={crumbs}
        eyebrow="Legal"
        title="Cookies que describe el sitio"
        intro="El aviso publicado dice que las cookies personalizan contenido y anuncios, ofrecen funciones de redes sociales y analizan el tráfico, y que esa información puede compartirse con partners de redes, publicidad y analítica."
      />
      <article className="mx-auto max-w-3xl space-y-4 px-4 py-10 text-sm leading-7">
        <p>
          En esta reconstrucción, las etiquetas de analítica no se cargan hasta que la persona pulsa Aceptar. Rechazar deja el sitio usable. La preferencia se guarda en el navegador con la clave local multialquileres-cookies.
        </p>
        <h2 className="text-2xl font-semibold text-brand-dark">Identificadores encontrados en el sitio anterior</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Google Tag Manager: GTM-MS8QDNQ7</li>
          <li>Google Analytics: G-R1X4PXLT3G y G-LZ4JY1QPJN</li>
          <li>Metricool, con un hash de seguimiento publicado en el HTML</li>
        </ul>
        <p>
          Esos identificadores no se activan solos. Hay que ponerlos en las variables de entorno si el cliente quiere seguir usándolos. Metricool no está incluido en esta versión.
        </p>
        <p>[REQUIERE INFORMACIÓN DEL CLIENTE] Lista cerrada de cookies, plazos y base legal para publicidad.</p>
      </article>
    </>
  );
}
