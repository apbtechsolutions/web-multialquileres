# Auditoría técnica de la reconstrucción

Fecha: 22 de septiembre de 2026. Comprobación sobre el build de Next.js y una pasada en el navegador local.

## Resultado

| Comprobación | Estado |
| --- | --- |
| Title único por plantilla de página | Sí. Home, catálogo, categorías, fichas, FAQ, sucursales y legales tienen títulos distintos. Las fichas usan el nombre del modelo. |
| Meta description única | Sí, con la misma regla. |
| Un solo H1 | Sí en home y en la ficha de Kia Picanto revisada. |
| Páginas sin title o description | No. |
| Canonical | Absoluto, con barra final, desde `NEXT_PUBLIC_SITE_URL`. |
| Hreflang | `es-PA` y `x-default` hacia la misma URL. No hay `en` porque no existe versión inglesa. |
| Open Graph y Twitter | Título, descripción e imagen en cada página. |
| Sitemap | `/sitemap.xml` incluye home, catálogo, 5 categorías, 49 fichas, 6 FAQ, 5 sucursales y páginas institucionales. |
| Robots | `User-agent: *` / `Allow: /`. No se bloquean crawlers de búsqueda ni de recuperación. |
| Redirects | Middleware con estado 301 en un solo salto. Comprobado: `/`, `/es/Vehiculos`, `/es/poli-privac`, `/es/pasos-alquiler`, `/es/req-alq-faq`, `/en`, `/es/es/Vehiculos`, `/fleet` y `/contact` responden 301 al destino final. `/es/vehiculos/` responde 200. |
| noindex | Solo la página 404. |
| 404 | `/no-existe/` responde 404. |
| Imágenes sin alt | Las fotos de catálogo llevan alt con marca, modelo y categoría. El logo es decorativo porque el enlace ya se llama “Multialquileres Panamá, inicio”. |
| JSON-LD | Organization/AutoRental y WebSite en la home. BreadcrumbList en interiores. FAQPage en preguntas. Car + Offer solo si hay tarifa. Sin ratings ni reseñas. |
| Enlaces internos | Navegación, pie, categorías, fichas relacionadas y FAQ cruzadas. |
| Huérfanas | Las rutas públicas están en el sitemap. |

## Lo que se vio en el navegador

- Home en viewport estrecho: menú móvil, un H1, buscador con los cinco puntos reales, cookie con Aceptar y Rechazar.
- Ficha `/es/vehiculos/hatchback/kia-picanto/`: migas, tarifa USD 28.03, foto del CDN cargada (1024×768) y modelos relacionados.
- Una URL de categoría incorrecta (`/es/vehiculos/suv/kia-picanto/`) responde 404, que es lo esperado.

## Límites

- El build no ejecuta un crawler externo de schema. El JSON se genera desde los mismos datos visibles.
- Core Web Vitals de campo no se midieron. El peso compartido de JavaScript es de unos 103 kB de First Load JS en el build, sin el video de 10 MB del sitio anterior.
- Algunas fotos del catálogo original siguen rotas en la fuente y aquí se muestran como “foto no publicada”.
