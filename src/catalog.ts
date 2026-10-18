// Verified knowledge the app relies on. Contacts and next steps shown to people
// come only from here, never from the model. Source: docs/research/catalogo-fraudes.md.

export interface Channel {
  name: string;
  contact: string;
  url: string;
  use: string;
}

export const CHANNELS = {
  "089": { name: "Denuncia anónima", contact: "089", url: "https://www.gob.mx/sspc/es/articulos/sabes-cual-es-la-diferencia-entre-los-numeros-088-089-y-911", use: "Reportar extorsión y hechos que requieren investigación" },
  "911": { name: "Emergencias", contact: "911", url: "https://www.gob.mx/sspc/es/articulos/sabes-cual-es-la-diferencia-entre-los-numeros-088-089-y-911", use: "Peligro inmediato" },
  "088": { name: "Guardia Nacional", contact: "088", url: "https://www.gob.mx/gncertmx/articulos/en-caso-de-ser-victima-de-algun-ciberdelito-llama-al-088-atencion-ciudadana", use: "Orientación para denunciar ciberdelitos" },
  condusef: { name: "CONDUSEF", contact: "55 5340 0999", url: "https://www.condusef.gob.mx", use: "Orientación sobre servicios financieros" },
  condusef_queja: { name: "Queja electrónica CONDUSEF", contact: "En línea", url: "https://tramites.condusef.gob.mx/QuejaElectronica/registro.php", use: "Reclamar a una institución financiera" },
  sipres: { name: "SIPRES de CONDUSEF", contact: "Consulta en línea por nombre o razón social", url: "https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp", use: "Verificar si una financiera está registrada" },
  ciberpolicia_cdmx: { name: "Policía Cibernética CDMX", contact: "55 5242 5100 ext. 5086 · policia.cibernetica@ssc.cdmx.gob.mx", url: "https://www.ssc.cdmx.gob.mx/comunicacion/nota/COM2612-25-09-26", use: "Orientación y reporte de fraudes digitales" },
  ciberpolicias_estatales: { name: "Policías cibernéticas estatales", contact: "Directorio en línea", url: "https://www.gob.mx/sspc/documentos/ciberguia", use: "Encontrar la unidad de tu estado" },
  sat: { name: "SAT (MarcaSAT)", contact: "55 6272 2728 · denuncias@sat.gob.mx", url: "https://www.sat.gob.mx", use: "Confirmar trámites fiscales y reportar correos falsos" },
  sat_correos_falsos: { name: "Buscador de correos falsos del SAT", contact: "Consulta en línea", url: "https://www.sat.gob.mx/minisitio/BuscadorCorreosFalsos/buscador.html", use: "Revisar si un remitente ya fue reportado" },
  profeco: { name: "PROFECO", contact: "55 5568 8722 · 800 468 8722", url: "https://www.gob.mx/profeco/articulos/telefono-del-consumidor?idiom=es", use: "Quejas de consumo" },
  bienestar: { name: "Línea de Bienestar", contact: "800 639 4264", url: "https://www.gob.mx/bienestar", use: "Confirmar programas sociales y pensiones" },
  juegos_sorteos: { name: "Dirección General de Juegos y Sorteos", contact: "Consulta en línea", url: "https://www.juegosysorteos.gob.mx/", use: "Revisar permisos de sorteos" },
} satisfies Record<string, Channel>;

export type ChannelId = keyof typeof CHANNELS;

export interface Pattern {
  id: string;
  name: string;
  /** Observable signals, given to the model as reference. */
  signals: string;
  /** Caveats that prevent false alarms or overclaiming. */
  caveat?: string;
  steps: string[];
  channels: ChannelId[];
  sources: string[];
}

export const PATTERNS: Pattern[] = [
  {
    id: "sat_impersonation",
    name: "Falso SAT",
    signals: "Supuesta devolución o saldo a favor con enlace; adeudo o aviso del Buzón Tributario urgente; pide contraseña, e.firma, códigos o datos bancarios; pide depósito.",
    caveat: "El SAT sí envía avisos reales por correo y SMS sobre mensajes nuevos en el Buzón Tributario; lo sospechoso es que pida datos, pagos o use enlaces ajenos a sat.gob.mx.",
    steps: ["No abras el enlace ni respondas.", "Entra tú mismo a sat.gob.mx y revisa tu Buzón Tributario.", "Busca el remitente en el buscador de correos falsos del SAT y repórtalo a denuncias@sat.gob.mx."],
    channels: ["sat", "sat_correos_falsos", "088"],
    sources: ["https://boletines.guanajuato.gob.mx/2026/05/28/", "https://www.sat.gob.mx/minisitio/BuzonTributario/index.html"],
  },
  {
    id: "bank_impersonation",
    name: "Falso banco o cargo no reconocido",
    signals: "Alerta de compra o movimiento extraño; supuesto asesor que ofrece cancelarlo; pide contraseña, NIP, código de verificación o token; enlace para proteger la cuenta. El identificador puede mostrar el nombre del banco.",
    steps: ["Cuelga o no respondas; ningún banco pide contraseñas, NIP ni códigos.", "Abre tú mismo la app de tu banco o llama al número que viene en tu tarjeta.", "Si ves movimientos que no reconoces, repórtalos al banco y pide folio; si no lo resuelven, acude a CONDUSEF."],
    channels: ["condusef", "condusef_queja", "088"],
    sources: ["https://www.condusef.gob.mx/index.php?idc=2718&idcat=3&p=contenido"],
  },
  {
    id: "virtual_kidnapping",
    name: "Secuestro virtual",
    signals: "Dicen tener secuestrado a un familiar; exigen rescate inmediato; piden que no cuelgues, que te aísles o que no avises a nadie.",
    caveat: "Nunca afirmes que el familiar está a salvo; recomienda localizarlo por otro medio.",
    steps: ["Cuelga y trata de localizar a tu familiar por otro medio (llamada, otra persona, su trabajo o escuela).", "No deposites ni sigas instrucciones.", "Repórtalo al 089; si hay peligro inmediato o no localizas a tu familiar, llama al 911."],
    channels: ["911", "089"],
    sources: ["https://www.gob.mx/sspc/articulos/que-es-el-secuestro-virtual?idiom=es"],
  },
  {
    id: "phone_extortion",
    name: "Extorsión telefónica",
    signals: "Amenazas contra ti, tu familia o tu negocio; exigen dinero para evitar daños; dicen ser autoridad o pertenecer a un grupo criminal; presión para pagar ya.",
    steps: ["Cuelga sin dar información.", "Guarda el número, los mensajes y los datos de pago que te pidieron.", "Verifica la situación por tu cuenta y repórtalo al 089; si hay amenaza inmediata, llama al 911."],
    channels: ["089", "911"],
    sources: ["https://www.gob.mx/segob/articulos/denuncia-la-mejor-arma-contra-la-extorsion-telefonica"],
  },
  {
    id: "loan_app_extortion",
    name: "Montadeudas (apps de préstamo abusivas)",
    signals: "Préstamo inmediato sin requisitos; la app pide acceso a contactos o fotos; depositan menos de lo ofrecido; intereses que suben sin aviso; plazos muy cortos; amenazas de exhibirte con tus contactos.",
    caveat: "Que el nombre comercial no aparezca en SIPRES no prueba que sea ilegal: busca la razón social. Aparecer registrada tampoco prueba que la app sea legítima.",
    steps: ["Busca la razón social de la empresa en SIPRES de CONDUSEF.", "Guarda capturas de las amenazas y de los cobros.", "Reporta la extorsión al 089 y pide orientación a la policía cibernética; presenta denuncia ante la Fiscalía."],
    channels: ["sipres", "089", "ciberpolicias_estatales"],
    sources: ["https://www.gob.mx/sspc/prensa/la-sspc-alerta-a-la-ciudadania-a-tomar-precauciones-para-evitar-ser-victima-de-prestamos-montadeudas-en-aplicaciones-moviles"],
  },
  {
    id: "fake_job_offer",
    name: "Falsa oferta de empleo",
    signals: "Te cobran para continuar el proceso; pagan por tareas simples como dar 'me gusta'; primeros pagos pequeños y luego exigen un depósito para liberar ganancias.",
    steps: ["Confirma la vacante con la empresa por un contacto que busques tú.", "No transfieras dinero para conseguir el puesto o liberar ganancias.", "Guarda las conversaciones y pide orientación a la policía cibernética."],
    channels: ["ciberpolicias_estatales", "088"],
    sources: ["https://www.gob.mx/sspc/prensa/sspc-alerta-sobre-fraudes-por-recompensas-falsas-en-redes-sociales?idiom=es"],
  },
  {
    id: "fake_delivery",
    name: "Paquete retenido o entrega falsa",
    signals: "Paquete que no esperabas; dirección incompleta; pago pendiente para liberarlo; plazo breve; enlace ajeno a la paquetería; piden un código que te llegó por SMS.",
    steps: ["Consulta la guía en el sitio de la paquetería, entrando tú mismo.", "No compartas códigos ni pagues desde el mensaje.", "Si diste datos bancarios, llama a tu banco de inmediato."],
    channels: ["ciberpolicias_estatales", "088"],
    sources: ["https://www.gob.mx/profeco/prensa/recuerda-profeco-recomendaciones-de-seguridad-para-evitar-enganos-o-fraudes?idiom=es-MX"],
  },
  {
    id: "fake_prize",
    name: "Premio o sorteo falso",
    signals: "Premio de un concurso en el que no participaste; depósito sorpresa; enlace para reclamarlo; usan el nombre de una autoridad (por ejemplo SEGOB) para dar credibilidad.",
    caveat: "SEGOB no notifica a personas ganadoras. Que un sorteo tenga permiso no autentica el mensaje.",
    steps: ["No des datos ni abras el enlace.", "Confirma con el organizador por un canal que busques tú."],
    channels: ["juegos_sorteos", "condusef", "089"],
    sources: ["https://www.gob.mx/segob/prensa/alerta-gobernacion-por-estafas-en-juegos-y-sorteos-no-notifica-a-personas-ganadoras"],
  },
  {
    id: "family_impersonation",
    name: "Familiar suplantado por WhatsApp",
    signals: "Petición inusual de dinero; usan nombre y foto de un conocido desde otro número; dicen que cambiaron de teléfono y luego piden una transferencia.",
    steps: ["Llama al número que ya conocías de esa persona o confirma con alguien más.", "No transfieras basándote solo en la foto y el nombre.", "Reporta la cuenta en WhatsApp y guarda la evidencia."],
    channels: ["ciberpolicias_estatales", "088"],
    sources: ["https://www.ssc.cdmx.gob.mx/comunicacion/nota/2774-la-unidad-de-policia-cibernetica-de-la-ssc-y-meta-emiten-recomendaciones-para-evitar-el-robo-de-cuentas-de-whatsapp"],
  },
  {
    id: "fake_government_aid",
    name: "Falso programa social o apoyo",
    signals: "Cobran por registrarte o gestionar un apoyo; intermediarios; usan logos de Bienestar o del Banco del Bienestar; enlaces a programas no confirmados.",
    caveat: "Los trámites de los Programas para el Bienestar son gratuitos y sin intermediarios.",
    steps: ["No pagues por registrarte a ningún programa.", "Confirma en gob.mx/bienestar o en la Línea de Bienestar."],
    channels: ["bienestar", "089"],
    sources: ["https://www.programasparaelbienestar.gob.mx/noticias-y-comunicados/noticia/evita-fraudes-los-tramites-de-los-programas-para-el-bienestar-son-gratuitos-y-sin-intermediarios/"],
  },
  {
    id: "fake_traffic_fine",
    name: "Multa o fotomulta falsa",
    signals: "Multa pendiente con pago inmediato; amenaza de recargos; enlace que imita un portal de gobierno y pide datos personales o bancarios.",
    caveat: "No hay un portal nacional único de multas: se consulta en el portal oficial del estado o municipio.",
    steps: ["No pagues desde el enlace.", "Consulta la infracción en el portal oficial de tu estado o municipio, entrando tú mismo."],
    channels: ["088", "ciberpolicias_estatales"],
    sources: ["https://www.gob.mx/sspc/prensa/sspc-emite-recomendaciones-para-evitar-fraudes-por-multas-de-transito-falsas-via-sms?idiom=es"],
  },
  {
    id: "marketplace_scam",
    name: "Venta falsa en marketplace",
    signals: "Oferta demasiado barata; vendedor difícil de verificar; enlaces a tiendas clonadas; piden pago por adelantado fuera de la plataforma.",
    steps: ["Verifica al vendedor y el producto antes de pagar.", "Guarda el anuncio, las conversaciones y los comprobantes."],
    channels: ["ciberpolicias_estatales", "profeco"],
    sources: ["https://www.ssc.cdmx.gob.mx/index.php/comunicacion/nota/COM1334-08-05-2025"],
  },
];

export const OFFICIAL_DOMAINS: Record<string, string[]> = {
  SAT: ["sat.gob.mx"],
  IMSS: ["imss.gob.mx"],
  CONDUSEF: ["condusef.gob.mx"],
  "Banco de México": ["banxico.org.mx"],
  "Gobierno de México": ["gob.mx"],
  "BBVA México": ["bbva.mx"],
  Banorte: ["banorte.com"],
  "Santander México": ["santander.com.mx"],
  Banamex: ["banamex.com"],
  "HSBC México": ["hsbc.com.mx"],
  "Scotiabank México": ["scotiabank.com.mx"],
};

export const GENERAL_STEPS = ["Si tienes dudas, confirma directamente con la institución por un número o sitio que busques tú, no por los datos del mensaje."];
export const GENERAL_CHANNELS: ChannelId[] = ["088", "condusef"];
