# Auditoría de https://www.multialquileres.com.pa/es/

Fecha: 22 de septiembre de 2026.

El sitio de referencia no es un catálogo de maquinaria. Es el sitio de **Multialquileres Panamá**, marca de **Grupo Cáceres, S.A.**, para **alquiler de autos** en Panamá. Está construido sobre BuilderDuck / Rently (React, Emotion, MUI), detrás de Cloudflare y Azure (`x-azure-ref`). El HTML útil llega en el cliente; el `sitemap.xml` anunciado en `robots.txt` no responde como sitemap.

Esta reconstrucción usa solo datos publicados: catálogo, lugares, teléfonos, textos de empresa, preguntas y términos. Donde el original trae lorem ipsum, un teléfono `+0000000000` o productos de plantilla (Rentcars, RentalCover, Cashback), no se presentan como hechos confirmados.

## Identidad

| Dato | Valor publicado |
| --- | --- |
| Nombre comercial | Multialquileres Panamá / Multi Alquileres Panamá |
| Razón social | Grupo Cáceres, S.A. (también escrito Grupo Caceres, S.A.) |
| Actividad | Alquiler de autos |
| Dirección principal | Vía Veneto, Bella Vista, Calle Hercilia Lamela, frente al hotel Coral Suites, Ciudad de Panamá |
| Teléfono principal / WhatsApp | +507 6406 7623 |
| Correo | info@multialquileres.com.pa |
| Moneda | USD |
| Redes | Instagram, Facebook y TikTok `multialquilerespanama` / `@multialquileres.p` |
| Coordenadas del schema | 8.985833, -79.526943 |

## 1–3. Páginas, URLs y navegación

Menú principal, sin desplegables:

1. Inicio → `/es/`
2. Vehículos → `/es/Vehiculos`
3. Nosotros → `/es/nosotros`
4. Términos y Condiciones → `/es/condiciones`
5. Preguntas Frecuentes → `/es/preguntas-frecuentes`
6. Contáctanos → `/es/contacto`
7. Acceso → `/es/iniciar-sesion`

Footer adicional: política de privacidad, cómo alquilar, rentas corporativas. “Métodos de pago” aparece como texto y no como enlace.

La raíz `/` entrega la misma home que `/es/`. `/en/` responde 404. El CMS tiene etiquetas `en-US` casi vacías. No hay un sitio en inglés publicado.

## 4–10. Header, menús, breadcrumbs, footer, hero y CTA

- Header blanco, logo, enlaces con iconos Material y botón de acceso.
- No hay menú desplegable de categorías.
- Breadcrumb en páginas internas (Inicio / página actual), con CSS inyectado.
- Footer oscuro en la práctica (iconos blancos), columnas Legales y Rentar, contacto, redes y copyright 2026.
- Hero con video MP4 de unos 10 MB (`multialqvideo.mp4`) y buscador: lugar, fechas, horas, “Cotizar”, “Devolver en otro lugar”.
- CTA repetidos: Cotizar, Reservar ahora, Conocer la flota, WhatsApp flotante.

## 11–19. Formularios, cards, categorías y conversión

- Buscador de reserva en home y, en el motor Rently, flujo de resultados y checkout. Esta reconstrucción no puede cobrar ni confirmar stock sin credenciales de Rently.
- Formulario de contacto y formulario corporativo, con reCAPTCHA y texto legal de Grupo Cáceres.
- Cards de vehículos con categoría, pasajeros, maletas, aire, combustible y CTA.
- Categorías reales del API: SUV (26), Sedán (11), Pickup (6), Hatchback (5), Bus (1). 49 modelos.
- Lugares reales: Vía Veneto, Plaza Granada, Tocumen (PTY), David y Panamá Pacífico (BLB, cargo publicado de 15 USD).
- Conversión: teléfono, WhatsApp, correo, cotizar, reservas corporativas.

## 20–30. Imágenes, iconos, tipo, color, estados

- Fotos de autos en `cdn-br.rently.com.ar`. Varias fichas apuntan a `System.Web.HttpPostedFileBase[]` y están rotas (Mazda CX-5, Creta, Edge, Hilux, D-Max, BMW 218, Yaris Cross, Qashqai, entre otras).
- Logo, favicon y marcas en el blob de Rently. Hay logo de Renault sin ningún Renault en el catálogo.
- Iconos Material Icons, más de una familia de iconos.
- Tipografía Roboto.
- Color de acción `#374BD3`, azul marino `#192577`, texto `#626364`, fondo blanco.
- Hover de escala en el botón de WhatsApp. Focus poco visible. Varios H1 en la home (título y cada auto destacado).

## 31–40. Dinámico, integraciones, contacto, mapas, scripts

Integraciones vistas:

- API pública `api.builderduck.com` (categorías, lugares, horarios, páginas).
- Google Tag Manager `GTM-MS8QDNQ7`.
- Google Analytics `G-R1X4PXLT3G` y `G-LZ4JY1QPJN`.
- Metricool (`tracker.metricool.com`).
- reCAPTCHA en formularios.
- Banner de cookies con Aceptar / Rechazar. El consentimiento no bloquea de forma clara los tags ya insertados en el head.
- WhatsApp `50764067623`, mensaje: “Buen día, estoy interesado/a en alquilar un auto…”.
- No hay un mapa embebido fiable en la home. Plaza Granada viene con latitud y longitud 0.

Teléfonos de sucursal publicados en contacto, distintos del principal:

- Vía Veneto: +507 6585-1514, +507 6073-9474, fijo +507 380-9334.
- Plaza Granada: +507 6992-1707, fijo +507 211-1325.
- David: +507 6755-5355, fijo +507 211-1325. El fijo coincide con el de Plaza Granada.

Horarios que no coinciden entre schema (lun–sáb 08:00–20:00), calendario de la oficina central (lun–vie 08:00–19:00, sáb 08:00–17:00, dom 08:00–14:00) y el texto de David (“24/7”).

## 41–46. Metadatos, canonical, hreflang, robots, sitemap, datos estructurados

- Title y description de la home son de renta de autos, pero **se repiten en todas las páginas internas**.
- Canonical de cada URL existe, pero el title no es único.
- `lang` y `og:locale` están en `es-MX`, no en `es-PA`.
- hreflang solo `es-MX` y `x-default` hacia `/es/`. No hay inglés real.
- `robots.txt` permite todo menos `/bd-admin/` y apunta a un sitemap que no devuelve XML (500/404 según el método).
- JSON-LD `AutomotiveBusiness` en la home, con NAP. El schema de página está vacío (`{"@context":"https://schema.org"}`).
- Open Graph de tipo `article` en la home. La imagen OG es el favicon.
- No hay hreflang en inglés porque `/en/` no existe.

## 47–50. Accesibilidad, rendimiento, SEO y URLs

Accesibilidad:

- Varios H1 en la portada.
- Iconos de Material leídos como texto (“home”, “directions_car”).
- Contraste del gris de cuerpo justo en el límite.
- El buscador depende del widget del motor.
- FAQ en acordeones que no exponen la respuesta en el HTML inicial de forma útil para quien no abre el panel.

Rendimiento:

- Muchos chunks de vendor (React, MUI, Emotion, carrusel, pagos, recaptcha, webcam).
- Video de hero de ~10 MB.
- Imágenes mezcladas (jpg, png, webp, avif, jfif) y rotas.
- Fuentes de Google cargadas además del CSS del builder.
- Cache HTML `max-age=3600`, pero el contenido útil es de cliente.

SEO y URLs:

- Slugs abreviados: `poli-privac`, `conf-reserva-faq`, `req-alq-faq`, `pag-tar-faq`, `camb-canc-faq`, `prot-cobe-faq`, `serv-adc-faq`.
- `/es/Vehiculos` lleva mayúscula.
- Enlace interno roto `/es/es/Vehiculos` (“Mostrar más” y “Conocé nuestra flota”).
- “Conocé” es voseo rioplatense, no el tono del resto del sitio.
- H2 de portada cita **Rentcars**, marca que no es la empresa.
- Lorem ipsum en páginas de ayuda, pasos, vehículos, nosotros y legales.
- Términos muy largos con apartados de plantilla (Oferta Sorpresa, PayPal, Cashback, Rental Cover) y una URL `/es/cashback` que no forma parte del menú.
- Preguntas de cambios incluyen el teléfono falso `+0000000000`.
- Duplicados de modelo (dos Hyundai Tucson) sin URL propia.
- No hay ficha indexable por vehículo ni por sucursal.
- El SPA puede responder 200 con el shell de la aplicación en rutas inexistentes, lo que estropea los 404.

## Tabla de migración

| URL actual | Tipo de página | Objetivo | Problemas | URL propuesta | Title propuesta | Meta description propuesta |
| --- | --- | --- | --- | --- | --- | --- |
| `/` y `/es/` | Home | Alquiler de autos en Ciudad de Panamá | Title distinto del H1, varios H1, video pesado, mención a Rentcars, OG de favicon, hreflang es-MX | `/es/` | Alquiler de autos en Ciudad de Panamá \| Multialquileres | Multialquileres Panamá alquila autos en Ciudad de Panamá, Tocumen, Panamá Pacífico y David. Consulta el catálogo publicado y pide una cotización por WhatsApp. |
| `/es/Vehiculos` | Catálogo | Ver la flota | Mayúscula, title genérico, lorem, sin filtros semánticos, imágenes rotas | `/es/vehiculos/` | Catálogo de autos en alquiler en Panamá \| Multialquileres | Consulta los modelos publicados por Multialquileres Panamá: SUV, hatchback, sedán, pickup y busito, con tarifa diaria de referencia. |
| No existía | Categoría SUV | Intención “SUV en Panamá” con modelos reales | Los modelos no tenían URL | `/es/vehiculos/suv/` | Alquiler de SUV en Panamá \| Multialquileres | Los SUV del catálogo publicado de Multialquileres Panamá, con tarifa diaria de referencia. |
| No existía | Categoría hatchback | Compactos urbanos | Igual | `/es/vehiculos/hatchback/` | Alquiler de hatchback en Panamá \| Multialquileres | Hatchbacks compactos del catálogo publicado para moverse en Ciudad de Panamá. |
| No existía | Categoría sedán | Sedanes del catálogo | Igual | `/es/vehiculos/sedan/` | Alquiler de sedán en Panamá \| Multialquileres | Sedanes publicados por Multialquileres, con pasajeros, maletas y tarifa de referencia. |
| No existía | Categoría pickup | Pickup del catálogo | Igual | `/es/vehiculos/pickup/` | Alquiler de pickup en Panamá \| Multialquileres | Pickup publicadas en el catálogo de Multialquileres Panamá. |
| No existía | Categoría bus | Chevrolet Busito | Igual | `/es/vehiculos/bus/` | Alquiler de busito en Panamá \| Multialquileres | Categoría bus del catálogo, correspondiente al Chevrolet Busito. |
| No existía | Ficha de modelo | Una URL por auto real | Sin ficha, sin canonical propio | `/es/vehiculos/{categoria}/{modelo}/` | Alquiler de {modelo} en Panamá \| Multialquileres | Ficha con los datos publicados de ese modelo y enlace a cotización. |
| `/es/pasos-alquiler` | Guía | Explicar el proceso | Lorem ipsum, title genérico | `/es/como-alquilar/` | Cómo alquilar un auto en Panamá \| Multialquileres | Pasos publicados para alquilar un auto con Multialquileres Panamá. |
| `/es/nosotros` | Corporativa | Presentar la empresa | Lorem, title genérico, visión mezclada con valores | `/es/nosotros/` | Multialquileres Panamá, empresa de alquiler de autos | Empresa panameña de Grupo Cáceres, S.A. para alquiler de autos. |
| `/es/contacto` | Contacto | Llamar, escribir o visitar | Title genérico, teléfonos distintos del NAP, sin mapa | `/es/contacto/` | Contacto y sucursales de Multialquileres en Panamá | Teléfono, correo y sucursales publicadas. |
| `/es/preguntas-frecuentes` | Hub FAQ | Orientar | Title genérico, buscador frágil | `/es/preguntas-frecuentes/` | Preguntas frecuentes sobre alquiler de autos en Panamá | Respuestas publicadas sobre reservas, requisitos, pagos, cambios y cobertura. |
| `/es/conf-reserva-faq` | FAQ | Estados de reserva | Slug opaco, title genérico, lorem | `/es/preguntas-frecuentes/confirmacion-de-reserva/` | Confirmación de la reserva \| Multialquileres Panamá | Cómo comprobar una reserva y qué significa cada estado publicado. |
| `/es/req-alq-faq` | FAQ | Requisitos | Slug opaco, edad sin número en el FAQ y 23 años en los términos | `/es/preguntas-frecuentes/requisitos/` | Requisitos para alquilar \| Multialquileres Panamá | Documentos publicados y edad mínima de los términos. |
| `/es/pag-tar-faq` | FAQ | Pagos | Slug opaco, PayPal mezclado con texto local | `/es/preguntas-frecuentes/pagos-y-tarifas/` | Pagos, tarifas y cargos \| Multialquileres Panamá | Efectivo, tarjeta, transferencia, link de pago y pago al retirar. |
| `/es/camb-canc-faq` | FAQ | Cambios | Teléfono falso, productos de plantilla | `/es/preguntas-frecuentes/cambios-y-cancelaciones/` | Cambios y cancelaciones \| Multialquileres Panamá | Plazo de 48 horas, cambio de titular y retención publicada del 20%. |
| `/es/prot-cobe-faq` | FAQ | Cobertura | Slug opaco | `/es/preguntas-frecuentes/proteccion-y-cobertura/` | Protección y cobertura \| Multialquileres Panamá | Cobertura básica, deducible y límite territorial en Panamá. |
| `/es/serv-adc-faq` | FAQ | Extras | Slug opaco, sin precios de extras | `/es/preguntas-frecuentes/servicios-adicionales/` | Servicios adicionales \| Multialquileres Panamá | Sillas, Tocumen, chofer bilingüe y accesorios sujetos a disponibilidad. |
| `/es/cliente-corporativo-reservaciones` | Lead corporativo | Cuentas de empresa | Slug largo, sin condiciones reales | `/es/rentas-corporativas/` | Alquiler de autos para empresas en Panamá \| Multialquileres | Solicitud para que un ejecutivo contacte a la empresa. |
| `/es/condiciones` | Legal | Términos | Title genérico, plantilla mezclada | `/es/terminos-y-condiciones/` | Términos y condiciones de alquiler \| Multialquileres Panamá | Condiciones publicadas de reserva, documentos, cancelación y depósito. |
| `/es/poli-privac` | Legal | Privacidad | Slug cortado | `/es/politica-de-privacidad/` | Política de privacidad \| Multialquileres Panamá | Uso publicado de datos personales y confidencialidad. |
| No existía como página propia | Legal | Cookies | Solo el banner | `/es/politica-de-cookies/` | Política de cookies \| Multialquileres Panamá | Aviso publicado y control de analítica por consentimiento. |
| No existía | Legal | Aviso legal | RUC ausente | `/es/aviso-legal/` | Aviso legal \| Multialquileres Panamá | Identidad publicada de Grupo Cáceres, S.A. |
| `/es/iniciar-sesion` | Cuenta | Ver reservas | Depende de Rently | `/es/iniciar-sesion/` | Acceso a reservas \| Multialquileres Panamá | Explica que la cuenta del motor anterior no está conectada. |
| No existía | Lugares | SEO local real | Sin URL por sucursal | `/es/sucursales/` y `/es/sucursales/{lugar}/` | Sucursales de alquiler de autos en Panamá \| Multialquileres | Puntos publicados en la ciudad, Tocumen, David y Panamá Pacífico. |
| No existía | Índice | Enlazar guías reales | No hay blog con artículos fiables | `/es/recursos/` | Guías para alquilar un auto en Panamá \| Multialquileres | Índice de páginas ya documentadas, sin artículos inventados. |
| No existía | Conversión | Pedir precio y disponibilidad | El checkout anterior no se puede replicar sin API | `/es/cotizar/` | Solicitar cotización de alquiler de auto \| Multialquileres | Arma un WhatsApp con lugar, fechas y modelo. No cobra ni confirma stock. |

## Decisiones que salen de la auditoría

- Idioma vivo: solo español de Panamá (`es-PA`). No se publica `/en/` porque el inglés del CMS está vacío y `/en/` ya era 404.
- Las URLs nuevas de fichas, categorías y sucursales no sustituyen una URL antigua: son páginas nuevas. Las URLs viejas que cambian de slug llevan 301.
- No se inventan precios fuera del `dailyPrice` / `lowerPrice` del catálogo público, ni reseñas, ni nota media, ni años de experiencia, ni cantidad de unidades.
- El botón de reserva del motor Rently se sustituye por cotización por WhatsApp hasta que el cliente entregue la API.
