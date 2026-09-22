import type { FaqTopic } from "@/types/content";

export const faqTopics: FaqTopic[] = [
  {
    slug: "confirmacion-de-reserva",
    title: "Confirmación de la reserva",
    h1: "Cómo saber si tu reserva está confirmada",
    description:
      "Formas publicadas por Multialquileres Panamá para comprobar una reserva y los estados que muestra el sitio: confirmada, cancelada, en espera y finalizada.",
    intro:
      "Multialquileres Panamá indica cuatro vías para saber si una reserva está confirmada: la cuenta del cliente, el correo, el chat y las líneas telefónicas. El estado exacto de una reserva concreta solo lo puede confirmar la empresa.",
    items: [
      {
        question: "¿Cómo sé si mi reserva está confirmada?",
        answer:
          "El sitio publicado dice que hay 4 formas: acceder a la cuenta, revisar el correo, usar el chat o llamar a las líneas telefónicas.",
      },
      {
        question: "¿Pueden pedirme información adicional después de reservar?",
        answer:
          "El texto publicado indica que es frecuente solicitar información adicional al titular, por lo general un documento de identificación o la fecha de nacimiento, dentro del plazo que indique la empresa.",
      },
      {
        question: "¿Qué significa el estado Confirmada?",
        answer:
          "Significa que la reserva se emitió o modificó y queda esperar el día de retiro. El sitio pide revisar el correo de confirmación y el comprobante.",
      },
      {
        question: "¿Qué significa Cancelada?",
        answer:
          "Indica que la reserva se canceló. Si corresponde una devolución, el sitio remite a las reglas de reembolso por cancelación.",
      },
      {
        question: "¿Qué significa Esperando confirmación?",
        answer:
          "La reserva está en proceso y la empresa debe notificar por correo el estado, con instrucciones de pago si la opción elegida es pagar ahora.",
      },
      {
        question: "¿Qué significa Esperando pago?",
        answer:
          "El pago de una reserva hecha con la opción “pague ahora” sigue pendiente. Después de confirmarse la transacción, el estado pasa a confirmada.",
      },
      {
        question: "¿Qué significa Finalizada?",
        answer:
          "La reserva se utilizó y se completó. El sitio indica que, en ese punto, la empresa ya informó el uso de la reserva.",
      },
    ],
  },
  {
    slug: "requisitos",
    title: "Requisitos para alquilar",
    h1: "Requisitos para alquilar un auto en Panamá",
    description:
      "Documentos y condiciones publicados por Multialquileres Panamá para retirar un vehículo, y la edad mínima que figura en sus términos.",
    intro:
      "Para retirar el vehículo, el sitio pide voucher, licencia física vigente y una tarjeta de crédito física a nombre del titular, con cupo para el depósito. Los términos publicados fijan como regla general una edad mínima de 23 años.",
    items: [
      {
        question: "¿Cómo se hace una reserva en el sitio publicado?",
        answer:
          "El texto de ayuda describe cuatro pasos: indicar el lugar de recogida y, si aplica, otro lugar de devolución; elegir el vehículo; añadir extras y protecciones; y escoger entre pagar en línea al reservar o pagar al retirar. También dice que el pago en línea suele resultar más económico que pagar al retirar.",
      },
      {
        question: "¿Qué documentos piden para retirar el vehículo?",
        answer:
          "Voucher de confirmación, licencia de conducir física y válida, y tarjeta de crédito física del titular, vigente, emitida por una institución bancaria y con cupo para el bloqueo de garantía. Para viajes internacionales, el mismo texto añade pasaporte y permiso internacional de conducir, y que la tarjeta esté habilitada para uso en el extranjero.",
      },
      {
        question: "¿Cuál es la edad mínima para alquilar?",
        answer:
          "Los términos publicados dicen que la regla general es 23 años. Conductores menores de 23 años con permiso definitivo, o mayores de 70, pueden tener tasas adicionales o reglas más restrictivas. La página de preguntas, en cambio, solo dice que los límites varían y no publica un número distinto.",
      },
    ],
  },
  {
    slug: "pagos-y-tarifas",
    title: "Pagos, tarifas y cargos",
    h1: "Cómo pagar un alquiler en Multialquileres",
    description:
      "Opciones de pago publicadas por Multialquileres Panamá: sucursal, tarjeta, transferencia, link de pago, pago en línea y pago al retirar.",
    intro:
      "En sucursal, el sitio indica pago en efectivo o con tarjeta. En línea, menciona transferencias nacionales, link de pago y tarjeta Visa o Mastercard. El pago en línea no sustituye la tarjeta física que pueden pedir al retirar el auto.",
    items: [
      {
        question: "¿Qué formas de pago publica la empresa?",
        answer:
          "Una respuesta del sitio enumera pago en línea, pago parcial y pago en destino. Otra, más específica de Panamá, dice que se puede pagar en sucursal en efectivo o con tarjeta, o en línea por transferencia bancaria nacional, link de pago o tarjeta Visa o Mastercard.",
      },
      {
        question: "¿Qué tarjetas aceptan para el pago en línea?",
        answer:
          "El texto publicado nombra Visa y Mastercard. También menciona un monedero digital (PayPal) dentro de un apartado que parece plantilla; conviene confirmar con la empresa si PayPal está activo.",
      },
      {
        question: "¿Pagar en línea evita llevar tarjeta al retirar el auto?",
        answer:
          "No. El sitio dice que el pago en línea no modifica la regla de presentar una tarjeta de crédito física a nombre del titular de la reserva al momento del retiro.",
      },
      {
        question: "¿Cómo sé que el pago quedó hecho?",
        answer:
          "El sitio pide revisar el correo, el enlace de pago y, una vez pagado, el correo de confirmación con el voucher en PDF.",
      },
    ],
  },
  {
    slug: "cambios-y-cancelaciones",
    title: "Cambios y cancelaciones",
    h1: "Cambios y cancelaciones de una reserva",
    description:
      "Reglas publicadas para modificar o cancelar una reserva de Multialquileres Panamá, incluido el plazo de 48 horas y la imposibilidad de cambiar el titular.",
    intro:
      "La reserva se puede modificar por el sitio, WhatsApp, las oficinas o el teléfono. Los términos no permiten cambiar el titular después de confirmada. Una cancelación pedida por el cliente antes del retiro puede tener una retención del 20% del total.",
    items: [
      {
        question: "¿Cómo modifico una reserva?",
        answer:
          "El sitio indica tres vías: la cuenta en la web, en Mis reservas; WhatsApp, indicando la novedad a un asesor; o el centro de atención y las oficinas. En la web, el texto dice que se puede entrar a Modificar reserva.",
      },
      {
        question: "¿Hasta cuándo puedo modificarla?",
        answer:
          "El texto publicado dice que no permiten modificaciones dentro de las 48 horas previas al retiro, o que pueden aplicar cargos si la cancelación se hace dentro de ese plazo. La política concreta también debe figurar en el voucher.",
      },
      {
        question: "¿Puede cambiar el precio si modifico la reserva?",
        answer:
          "Sí. El sitio explica que trabajan con precios que cambian según demanda, disponibilidad y el momento de la modificación. Si el nuevo valor es mayor, hay que pagar la diferencia. Si es menor, dice que la diferencia se reembolsa.",
      },
      {
        question: "¿Puedo cambiar el nombre del titular o del conductor?",
        answer:
          "No. Después de confirmada la reserva no se puede cambiar el titular ni el conductor principal. El sitio indica cancelar y crear una reserva nueva, sujeta a disponibilidad y a la tarifa vigente. Si el conductor principal no está en el retiro, el vehículo no se entrega.",
      },
      {
        question: "¿Puedo cambiar el lugar de recogida o de devolución?",
        answer:
          "El texto dice que en muchos casos sí, sujeto a disponibilidad y a cargos adicionales, y que después de recoger el vehículo hay que tratarlo directo con la empresa.",
      },
      {
        question: "¿Qué retención aplica si cancelo?",
        answer:
          "Los términos publicados dicen que, si el cliente cancela antes de la hora prevista de recogida, Multialquileres Panamá puede retener el 20% del valor total antes de reembolsar, cuando la ley lo permita. El no-show también puede generar un cobro del 20%.",
      },
      {
        question: "¿Cuál es el teléfono del centro de ayuda que figura en esa página?",
        answer:
          "[REQUIERE INFORMACIÓN DEL CLIENTE] El texto publicado de esa sección incluye el número +0000000000, que no es un teléfono real. Los teléfonos verificables del sitio están en Contacto.",
      },
    ],
  },
  {
    slug: "proteccion-y-cobertura",
    title: "Protección y cobertura",
    h1: "Qué cubre la protección del alquiler",
    description:
      "Respuestas publicadas por Multialquileres Panamá sobre cobertura básica, deducible, protección adicional y límites dentro de Panamá.",
    intro:
      "La cobertura básica publicada cubre daños por accidente, robo total y responsabilidad civil frente a terceros, con un deducible según el tipo de auto. La protección solo es válida dentro de Panamá y no cubre uso indebido, alcohol, drogas ni conductores no autorizados.",
    items: [
      {
        question: "¿Qué incluye la cobertura básica?",
        answer:
          "Cubre daños al vehículo por accidente, robo total y responsabilidad civil frente a terceros. Aplica un deducible según el tipo de auto.",
      },
      {
        question: "¿Qué es el deducible?",
        answer:
          "Es el monto máximo que pagas si ocurre un daño o accidente. El resto lo cubre el seguro.",
      },
      {
        question: "¿Puedo reducir o eliminar el deducible?",
        answer:
          "Sí. El sitio dice que se puede agregar una protección adicional que reduce o elimina el deducible, sujeta a lo que ofrezcan al reservar.",
      },
      {
        question: "¿Qué es la Protección Total (Full Cover)?",
        answer:
          "La describen como la opción más completa: daños, robo, llantas, vidrios, espejos y asistencia en carretera, con deducible reducido o cero.",
      },
      {
        question: "¿Qué no cubre el seguro?",
        answer:
          "No cubre daños por uso indebido, negligencia, manejo bajo alcohol o drogas, ni si el conductor no está autorizado en el contrato.",
      },
      {
        question: "¿Qué hago si tengo un accidente o daño?",
        answer:
          "Hay que llamar de inmediato al equipo de Multialquileres o a la sucursal más cercana. Los términos añaden que, en general, hace falta un informe policial y el formulario de la empresa en un plazo máximo de 24 horas.",
      },
      {
        question: "¿Otra persona puede conducir el auto?",
        answer:
          "Sí, siempre que esté registrada como conductor adicional en el contrato.",
      },
      {
        question: "¿La cobertura aplica fuera de Panamá?",
        answer:
          "No. La protección publicada solo es válida dentro del territorio panameño. Los términos también indican que cruzar fronteras puede estar prohibido o generar cargos.",
      },
    ],
  },
  {
    slug: "servicios-adicionales",
    title: "Servicios adicionales",
    h1: "Servicios adicionales del alquiler",
    description:
      "Sillas para niños, entrega en Tocumen, chofer bilingüe y accesorios opcionales publicados por Multialquileres Panamá.",
    intro:
      "Los servicios adicionales publicados son sillas para niños, traslado en el Aeropuerto de Tocumen y otros puntos de la ciudad, chofer profesional bilingüe y accesorios como GPS o WiFi portátil. Todos quedan sujetos a disponibilidad y pueden tener un costo extra.",
    items: [
      {
        question: "¿Tienen sillas para niños?",
        answer:
          "Sí. El sitio dice que hay sillas para bebés y niños, con un máximo de 2 por vehículo, sujetas a disponibilidad.",
      },
      {
        question: "¿Hacen entrega en el aeropuerto?",
        answer:
          "Sí. Publican entrega o recogida en el Aeropuerto Internacional de Tocumen y en otros puntos principales de la ciudad. El catálogo de lugares también incluye Panamá Pacífico, con un cargo publicado de 15 USD, y David.",
      },
      {
        question: "¿Puedo solicitar chofer?",
        answer:
          "El sitio ofrece un chofer profesional bilingüe, español e inglés, por horas o por días.",
      },
      {
        question: "¿Qué accesorios opcionales mencionan?",
        answer:
          "GPS, WiFi portátil y otros accesorios. Indican que están sujetos a disponibilidad y pueden tener un costo extra. El precio de cada accesorio no está publicado.",
      },
    ],
  },
];

export function getFaqTopic(slug: string) {
  return faqTopics.find((topic) => topic.slug === slug);
}
