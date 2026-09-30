# Información que debe completar el cliente

Nada de esta lista se inventó en el sitio. Donde faltaba un dato, la página lo marca o esta ficha lo deja pendiente.

## Motor de reservas APBHUB360

El sitio de QA (`https://web.multialquileres.com.pa`) ya tiene búsqueda (`/es/buscar/`) y checkout (`/es/reservar/`). `https://qa-multi.apbhub360.com/` hoy solo muestra el acceso de la plataforma y redirige a `/login`. No hay un API público de tarifas, sucursales ni reservas.

Para que cotizar y reservar usen ese sistema, hace falta:

- URL base del API de QA (si no es la misma que el panel de login).
- Token o credenciales de un cliente de servicio, solo en el servidor (`APBHUB360_API_URL`, `APBHUB360_API_TOKEN`). No van en el navegador.
- Contrato: método, ruta y JSON para buscar disponibilidad (lugar, fechas, horas → modelos con tarifa del periodo, depósito, cargos de sucursal, extras e ITBMS).
- Contrato para crear la reserva y, si aplica, la cotización, con el identificador que devuelve el sistema.
- Catálogo de sucursales con el id que usa el motor (en el sitio actual Tocumen es `6` y Oficina Central es `1`) y el equivalente de cada modelo (`modelId`, `bookingBrandId`).
- Lista oficial de tipos de documento, seguros (por ejemplo Full Cover) y adicionales (conductor adicional), con su precio calculado por el motor.
- Si el pago se cobra en APBHUB360 o si la web solo registra la reserva.
- Un ambiente donde se pueda crear una reserva de prueba sin cobrar.

Hasta entonces el botón Reservar ahora abre el checkout, pero `POST /api/reservas/` no registra nada en APBHUB360.

## Empresa

- RUC de Grupo Cáceres, S.A.
- Nombre del representante legal y datos de registro mercantil.
- Año de inicio, si quieren publicarlo.
- Cantidad real de unidades, si es distinta del número de modelos del catálogo (49 fichas).
- Confirmar si “Multi Alquileres” y “Multialquileres” deben unificarse en un solo nombre visible.
- Confirmar si Renault forma parte de la flota. Hay un logo en la home anterior y ningún Renault en el catálogo.

## Contacto

- Teléfono principal único. Hoy conviven +507 6406 7623 (WhatsApp y schema) y los móviles de cada sucursal.
- El fijo +507 211-1325 aparece tanto en Plaza Granada como en David.
- Horario oficial. El schema decía lun–sáb 08:00–20:00; el calendario de Vía Veneto dice lun–vie 08:00–19:00, sáb 08:00–17:00, dom 08:00–14:00; David dice 24/7.
- Zona horaria del punto de Tocumen: el calendario venía con una zona inconsistente.
- Horario de Panamá Pacífico (BLB).
- Coordenadas de Plaza Granada. El catálogo trae 0, 0.
- Dirección única de David: “Calle E Sur 397-21” en contacto y “Calle 360 E Sur” en el catálogo de lugares.

## Servicios

- Precio de silla de niño, chofer bilingüe, GPS y WiFi. Solo se sabe que existen y que pueden costar extra.
- Si el chofer bilingüe sigue disponible y en qué ciudades.
- Si la entrega en un punto distinto (por ejemplo Almirante, citada en una reseña) sigue ofreciéndose. No está en el catálogo de lugares.
- Confirmar si PayPal, Google Pay y Apple Pay están activos. Aparecen en textos de plantilla; el párrafo local habla de efectivo, tarjeta, transferencia, link de pago, Visa y Mastercard.
- Mínimo y máximo de días. La configuración del motor decía 1 a 365.

## Productos

- Fotos que el catálogo no sirve: Mazda CX-5, Hyundai Creta, Ford Edge, Toyota Hilux, Isuzu D-Max, BMW 218, Toyota Yaris Cross, Kia Qashqai y otras con ruta `System.Web.HttpPostedFileBase[]`.
- Depósito de los modelos cuyo valor publicado es 0.
- Transmisión del primer Hyundai Tucson: el campo venía vacío.
- Aclarar los dos Hyundai Tucson (tarifas de referencia 70 USD y 60 USD) para no parecer un duplicado.
- Disponibilidad real. Esta web no consulta el inventario.

## Ubicaciones

- Confirmar que solo operan los cinco puntos publicados.
- Cargo de 15 USD en Panamá Pacífico: confirmar si sigue vigente y qué incluye.

## Precios

- Las tarifas diarias de referencia salen del catálogo público del 22 de septiembre de 2026. Hay que sustituirlas por la fuente que el cliente quiera mantener, o conectar el motor.
- No hay precios de temporada, seguro adicional ni “full cover” en cifras.

## Fotografías

- Autorización de uso de las fotos hospedadas en el CDN de Rently, o un paquete propio.
- El video de portada pesa unos 10 MB y no se usa como LCP.

## Equipo

- No hay nombres de responsables ni fotos de staff publicadas de forma institucional.

## FAQs

- Teléfono del centro de ayuda. La página de cambios publicaba `+0000000000`.
- Confirmar si RentalCover, Rent Protection, Cashback y “Oferta Sorpresa” son productos reales o restos de la plantilla Rentcars/Rently.
- Unificar la edad: los términos dicen 23 años; el FAQ solo dice que el límite varía.
- Precio y condiciones de la protección total.

## Legal

- Revisión de términos, privacidad, cookies y aviso legal.
- RUC y canal formal para acceso, rectificación y supresión de datos.
- Lista de cookies, plazos y base legal si se reactiva publicidad.

## Redes sociales

- Confirmar que las cuentas de Instagram, Facebook y TikTok enlazadas siguen siendo las oficiales.

## Analytics

- Decidir si se reutilizan GTM-MS8QDNQ7, G-R1X4PXLT3G y G-LZ4JY1QPJN.
- El hash de Metricool no se cargó en esta versión.
- Definir qué eventos cuentan como conversión: WhatsApp, teléfono, formulario de cotización.

## Motor de reservas

- Credenciales de Rently/BuilderDuck si quieren volver a confirmar disponibilidad y cobrar en el sitio.
- Mientras no existan, la cotización solo abre WhatsApp y no crea una reserva.
