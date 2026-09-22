# Multialquileres Panamá

Reconstrucción del sitio de alquiler de autos de Multialquileres Panamá (Grupo Cáceres, S.A.) con Next.js, TypeScript y Tailwind CSS.

## 1. Instalación

```bash
npm install
npm run generate:fleet
```

`generate:fleet` vuelve a leer `_audit/categories.json` si todavía existe. El catálogo ya está en `data/fleet.json`.

## 2. Variables de entorno

Copia `.env.example` a `.env.local`.

- `NEXT_PUBLIC_SITE_URL`: URL canónica, sin barra final. En este proyecto es `https://web.multialquileres.com.pa`.
- `NEXT_PUBLIC_GTM_ID` y `NEXT_PUBLIC_GA_ID`: vacíos por defecto. Solo se cargan si la persona acepta cookies.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: número publicado, sin signos. Por defecto `50764067623`.

No hay secretos en el cliente. No hay servidor de correo.

## 3. Desarrollo

```bash
npm run dev
```

Abre http://localhost:3000. La raíz redirige a `/es/`.

## 4. Build

```bash
npm run lint
npm run typecheck
npm run build
```

## 5. Deploy

El sitio público es `https://web.multialquileres.com.pa`. El repositorio es `https://github.com/apbtechsolutions/web-multialquileres`. El deploy lo hace una persona en EasyPanel (`app-websites` / `apbhub360-qamulti-api`). Desde el repositorio solo se hace commit y push.

En EasyPanel, antes de construir:

- `NEXT_PUBLIC_SITE_URL=https://web.multialquileres.com.pa`
- Puerto del contenedor: `3000`
- Si el servicio no usa el Dockerfile, el arranque es `npm start` (escucha en `0.0.0.0`)

`NEXT_PUBLIC_SITE_URL` tiene que existir en el build. Canonical, sitemap y Open Graph salen de esa variable. Si falta, el código usa `https://web.multialquileres.com.pa`. Los 301 los responde `middleware.ts`.

## 6. Arquitectura

- `app/es/`: páginas en español de Panamá.
- `components/`: cabecera, pie, fichas, formularios, FAQ y JSON-LD.
- `data/`: flota, sucursales, preguntas, textos y términos.
- `lib/`: URL, metadata y schema.
- `SEO/`: redirects y enlazado.
- No hay inglés. `/en` redirige a `/es/` porque el sitio anterior no tenía versión inglesa publicada.

## 7. SEO

Cada ruta exporta title, description, canonical, hreflang `es-PA` y `x-default`, Open Graph y Twitter. Un solo `h1` por página. Las fichas y las FAQ llevan datos estructurados acordes al contenido visible.

## 8. Sitemap

`app/sitemap.ts` genera `/sitemap.xml` con la home, el catálogo, las fichas, las sucursales, las FAQ y las páginas legales.

## 9. Redirects

`middleware.ts` responde **301** para las URLs viejas y también para la barra final que falte. `next.config.ts` deja `skipTrailingSlashRedirect` activo para que Next no inserte un 308 delante. `SEO/redirects.csv` documenta el mapa. Cada URL antigua apunta al destino final en un solo salto.

## 10. Metadata

`lib/seo.ts` centraliza canonical, idiomas y redes. Las páginas pasan title, description y path.

## 11. Structured data

`components/seo/JsonLd.tsx` imprime JSON-LD. La home lleva Organization/AutoRental y WebSite. Las interiores llevan BreadcrumbList. Las FAQ llevan FAQPage. Las fichas llevan Car y Offer solo cuando hay tarifa de referencia. No hay ratings ni reseñas marcadas.

## 12. Mantenimiento

- Para cambiar un teléfono o la dirección, edita `lib/site.ts` y `data/branches.ts` juntos, para no romper el NAP.
- Para actualizar tarifas, sustituye `data/fleet.json` o vuelve a generar el catálogo desde la fuente que indique el cliente.
- No rellenes los huecos marcados `[REQUIERE INFORMACIÓN DEL CLIENTE]` con suposiciones. La lista está en `CLIENT-DATA-REQUIRED.md`.
- `llms.txt` y `llms-full.txt` son un resumen fiel. Hay que actualizarlos si cambian sucursales o servicios. No posicionan por sí solos.
