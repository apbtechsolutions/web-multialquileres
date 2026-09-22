import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Política de privacidad | Multialquileres Panamá",
  description:
    "Cómo describe Multialquileres Panamá el uso de datos personales, la confidencialidad y las cookies en su política publicada.",
  path: "/es/politica-de-privacidad/",
});

export default function PrivacyPage() {
  const crumbs = [
    { name: "Inicio", path: "/es/" },
    { name: "Política de privacidad", path: "/es/politica-de-privacidad/" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageIntro
        crumbs={crumbs}
        eyebrow="Legal"
        title="Política de privacidad publicada"
        intro="El texto siguiente resume la política que Multialquileres Panamá tenía publicada. Debe revisarlo un asesor legal: el original no indica el responsable con RUC ni un correo específico para derechos de datos."
      />
      <article className="mx-auto max-w-3xl space-y-4 px-4 py-10 text-sm leading-7">
        <p>
          La política publicada dice que Multialquileres Panamá usa los datos que el usuario entrega en el sitio solo según ese documento, y que la política puede cambiar, por lo que pide revisarla con frecuencia.
        </p>
        <h2 className="text-2xl font-semibold text-brand-dark">Información que dicen recopilar</h2>
        <p>
          Nombre, datos de contacto como el correo e información demográfica. También información necesaria para un pedido, una entrega o una facturación. La política se declara de cumplimiento obligatorio para quienes administran bases de datos personales de Grupo Cáceres, S.A.
        </p>
        <h2 className="text-2xl font-semibold text-brand-dark">Uso publicado</h2>
        <p>
          Mantener el registro de usuarios y pedidos, mejorar el servicio y enviar correos con ofertas, que se pueden cancelar. Afirman confidencialidad de quienes tratan los datos, incluso después de terminar su relación con la empresa. No publican el plazo exacto, salvo el aviso del formulario de contacto: menos de 2 años de inactividad.
        </p>
        <h2 className="text-2xl font-semibold text-brand-dark">Derechos y contacto</h2>
        <p>
          El formulario publicado dice que la persona puede pedir acceso y eliminación. El canal concreto para ejercer esos derechos no está especificado. Mientras tanto, el correo publicado del sitio es {site.email}.
        </p>
        <p>[REQUIERE INFORMACIÓN DEL CLIENTE] RUC, responsable de protección de datos y procedimiento formal de reclamo.</p>
      </article>
    </>
  );
}
