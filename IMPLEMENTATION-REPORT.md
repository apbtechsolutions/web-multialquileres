# Informe de implementación

## Qué se encontró

El sitio de referencia es el rent a car de Multialquileres Panamá (Grupo Cáceres, S.A.), no un catálogo de maquinaria. Corre sobre BuilderDuck/Rently: React en el cliente, titles repetidos, slugs abreviados, un sitemap anunciado que no responde, hreflang `es-MX`, varios H1, imágenes rotas, lorem ipsum, un enlace `/es/es/Vehiculos` y textos de plantilla (Rentcars, teléfono `+0000000000`, Cashback). El catálogo público tiene 49 modelos en SUV, hatchback, sedán, pickup y bus. Hay cinco puntos de entrega.

## Qué se reconstruyó

Un sitio Next.js (App Router), TypeScript y Tailwind, en español de Panamá. Conserva la marca, el logo, la flota, los puntos, los teléfonos, el correo, las preguntas útiles y los términos publicados. La reserva en línea del motor Rently no se puede cobrar ni confirmar sin credenciales: la cotización arma un WhatsApp al número publicado.

## Qué se mejoró

- Una URL por categoría, por modelo y por sucursal.
- Un solo H1, titles y descriptions distintos, canonical y hreflang `es-PA`.
- Datos separados del diseño (`data/`).
- JSON-LD acorde al contenido visible, sin notas ni precios inventados.
- Cookies de analítica apagadas hasta que la persona acepta. Los IDs de GTM y GA quedan en variables de entorno.
- Cabeceras de seguridad, 404 real y 301 de las URLs viejas.
- Sin el video de unos 10 MB en el primer pantallazo.
- Menú móvil, buscador, migas y filtros del catálogo.

## Qué URLs cambiaron

Las de slug opaco o con mayúscula pasan a rutas en español, minúsculas y agrupadas. El detalle está en `AUDIT.md` y `SEO/redirects.csv`. Ejemplos: `/es/Vehiculos` → `/es/vehiculos/`, `/es/poli-privac` → `/es/politica-de-privacidad/`, `/es/req-alq-faq` → `/es/preguntas-frecuentes/requisitos/`.

Se añadieron, porque no existían, las fichas de modelo, las categorías, las sucursales, la cotización, las guías, las cookies y el aviso legal.

## Qué redirects se crearon

`middleware.ts` responde 301. No hay cadena: cada origen apunta al destino final. `/en` también va a `/es/` porque el inglés no está publicado.

## Qué mejoras SEO se implementaron

Arquitectura corta, sitemap, robots que no bloquea crawlers, canonical, Open Graph, Twitter, migas y enlaces internos descritos en `SEO/internal-linking.md`. El SEO local usa solo Ciudad de Panamá, Tocumen, El Cangrejo, Panamá Pacífico y David.

## Qué mejoras GEO/AEO se implementaron

Respuesta breve al inicio de las páginas importantes, preguntas con el texto publicado, entidad consistente (nombre, razón social, teléfono, dirección) y `llms.txt` / `llms-full.txt` como resumen fiel. No se afirma que eso garantice citas.

## Qué problemas de rendimiento se solucionaron

Se quitó el paquete MUI/Emotion/video de portada. Las páginas salen estáticas. El JavaScript compartido del build queda en torno a 103 kB. Las fotos del CDN van con ancho, alto y carga diferida.

## Qué información falta del cliente

Está listada en `CLIENT-DATA-REQUIRED.md`: RUC, horarios que no coinciden, fotos rotas, depósitos en cero, precios de extras, productos de plantilla (RentalCover, Cashback, PayPal) y la API de Rently si quieren volver a reservar dentro del sitio.

## Qué queda pendiente

- Conectar el motor de reservas y el envío de correo, cuando existan credenciales.
- Revisión legal de términos, privacidad y cookies.
- Sustituir las tarifas de referencia si el catálogo público deja de ser la fuente.
- Medición de campo de LCP, INP y CLS en el dominio real.
- Inglés, solo si el cliente aporta textos. Hoy no se publica.

## Verificación

`next build` generó las rutas estáticas, el sitemap, robots, el manifest y el middleware. En local se comprobó:

- 301 en un solo salto desde `/`, `/es/Vehiculos`, `/es/poli-privac`, `/es/pasos-alquiler`, `/es/req-alq-faq`, `/en`, `/es/es/Vehiculos`, `/fleet` y `/contact`.
- 200 en `/es/vehiculos/` y en la ficha del Kia Picanto. 404 en una categoría incorrecta y en `/no-existe/`.
- Escritorio (1280 px): menú horizontal, un H1, sin scroll horizontal.
- Móvil (390 px): botón Menú que abre Inicio, Vehículos, Nosotros, Cómo alquilar, Preguntas frecuentes, Contacto, Iniciar sesión y Solicitar cotización, y navega a contacto.
- El buscador de la home lleva a `/es/cotizar/` con lugar y fechas. El formulario exige teléfono y consentimiento; sin teléfono el foco vuelve al campo y no se envía nada.
- La sucursal de Tocumen muestra dirección, teléfono, horario y el mapa.
