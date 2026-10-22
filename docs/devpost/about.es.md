## Inspiración

En México, el fraude ya es el delito más común. El INEGI estima **8.1 millones de fraudes en 2025**; el **80.6%** fue por internet o medios electrónicos y el **96.5%** nunca se denunció. De enero a julio de 2026, la CONDUSEF recibió 110,000 quejas, y cerca de 60,000 tienen que ver con fraudes que suplantan a bancos, al SAT o a plataformas digitales.

Todas las familias aquí tienen una versión de la misma historia: un mensaje que dice que tu banco detectó un cargo, el "número nuevo" de un sobrino que pide dinero, una app de préstamos que amenaza con exhibirte ante tus contactos. La gente pregunta en grupos de Facebook antes que en una fuente oficial, y cuando encuentra la institución correcta, el dinero ya no está.

No queríamos otra campaña de prevención. Queríamos responder sobre **el mensaje que tienes enfrente, en este momento**, con fuentes oficiales mexicanas, y después ayudarte a actuar.

## Qué hace

**¿Es fraude?** es una app web gratuita, de código abierto y pensada para celular, en español e inglés. Puedes:

- pegar un mensaje,
- subir una captura,
- describir una llamada,
- pegar un enlace o un correo,
- o escribir el nombre de una app de préstamos.

En unos 6 a 9 segundos obtienes:

- **Un nivel de riesgo** que **nunca dice "es seguro"**. Como mucho, dice que no encontró señales claras y cómo confirmarlo por un canal oficial.
- **Señales de alerta**, cada una respaldada por una **cita textual** del mensaje o de una página oficial.
- **Lo que revisamos**: dominio real contra dominios oficiales, dominios que imitan (`bbva-mx-seguridad.xyz`, `sat.gob.mx.validar.com`), letras disfrazadas (punycode), acortadores, direcciones IP, cuentas de correo gratuitas que dicen ser instituciones, **antigüedad del dominio según el registro público RDAP**, alertas oficiales sobre la institución suplantada y teléfonos en listas oficiales.
- **Denuncia paso a paso**:
  - pasos urgentes si ya pagaste (plazos legales para reclamar un cargo, qué decirle a tu banco sobre una transferencia SPEI, cómo recuperar WhatsApp);
  - lista de evidencia;
  - tus datos, que se llenan **solo en tu navegador** y completan un borrador de denuncia;
  - botones para el canal correcto de tu estado: abrir la denuncia en línea de la Fiscalía con el texto ya copiado, escribir a la policía cibernética o llamar al 089 con un guion de qué decir.

## Cómo lo construimos

Toda la inferencia corre en el momento de cada consulta en **Nebius Token Factory**, con su API compatible con OpenAI, usando tres modelos **NVIDIA Nemotron**, cada uno elegido para una tarea:

| Paso | Modelo | Por qué |
|---|---|---|
| Leer capturas | Nemotron 3.5 Super VL | Transcribe remitente, montos, enlaces y teléfonos en unos 2.5 s |
| Extraer datos | Nemotron 3 Super | En nuestras pruebas fue más rápido que Nano (≈2 s contra ≈3.6 s) y más preciso: identificó al "SAT" como remitente y Nano no |
| Veredicto | Nemotron 3 Ultra | Razona sobre el mensaje, la evidencia y un catálogo de 12 tipos de fraude documentados por autoridades mexicanas, en modo JSON |

Entre los modelos hay una capa sin IA:
- comparación de dominios y detección de imitaciones;
- consulta RDAP de antigüedad del dominio;
- búsquedas con **Tavily** limitadas a dominios oficiales mexicanos (gob.mx, sat.gob.mx, condusef.gob.mx).

Tavily solo recibe nombres de instituciones, dominios y teléfonos, nunca el mensaje de la persona.

El stack es TypeScript, Hono y una sola página HTML, desplegada gratis en Vercel. También se publica una imagen Docker para Nebius Serverless.

Nuestro equipo: Nelson Ramses Aviles (producto y pruebas) y Aldo Montes de Oca, con dos compañeros de IA: **Claude Code** (arquitectura y código) y **Codex** (investigación). Codex investigó los patrones de fraude en México, las rutas oficiales de denuncia, los plazos legales y los conjuntos de evaluación, siempre con fuentes oficiales.

## Retos que enfrentamos

- **El modelo inventaba teléfonos.** En una de las primeras pruebas, Ultra dio un teléfono del SAT sin fuente y recomendó un código para reportar mensajes que no existe en México. En una herramienta contra el fraude, eso es inaceptable. Lo rediseñamos para que **el modelo solo clasifique y explique**; todos los teléfonos, pasos, plazos y rutas de denuncia salen ahora de un catálogo verificado con fuentes oficiales.
- **Falsas alarmas en mensajes reales.** Nuestra primera evaluación marcó como fraude mensajes legítimos: un código del banco, un aviso de recibo de CFE con su dominio real. Agregamos lógica para distinguir el dominio propio de una marca de uno que la imita, y criterios explícitos para avisos normales.
- **Evitar el sobreajuste.** Cada corrección salía de nuestro propio conjunto de prueba, así que le pedimos a Codex conjuntos nuevos que nunca habíamos visto y los medimos una sola vez, sin cambios.
- **Robustez.** Un mensaje con comillas «» rompía la respuesta JSON. Lo resolvimos con modo JSON en Ultra, un reintento, límites de tiempo y temperatura 0 para veredictos estables.
- **Denunciar es confuso.** Un reporte a la policía cibernética no es una denuncia penal, y no todos los estados tienen denuncia en línea. Cada ruta en la app aclara si es orientación, reclamación o denuncia formal.

## Logros de los que estamos orgullosos

- **Ningún fraude se escapó y no hubo falsas alarmas** en nuestros conjuntos no vistos. Tercer conjunto: **25/25** fraudes detectados y **15/15** mensajes legítimos sin falsa alarma, con 27 casos difíciles. Conjunto de enlaces y correos: **18/18** y **12/12**. Los mismos resultados con respuestas en inglés.
- **Unos US$0.017 por análisis**, y medimos en qué se va el costo.
- Un flujo completo, de "¿esto es fraude?" a "ya presenté la denuncia", en español e inglés, que funciona en el celular.

## Lo que aprendimos

- **En herramientas de seguridad, importa más basarse en fuentes que el tamaño del modelo.** El modelo es excelente para leer y razonar, pero los datos con los que la gente actúa deben salir de fuentes verificadas.
- **"Nunca decir que es seguro" es una decisión de producto, no solo una línea del prompt.** La aplicamos en el código.
- **Token Factory facilitó comparar modelos paso a paso** con llamadas reales y elegir el Nemotron correcto para cada tarea.

## Qué sigue

- Probar con mensajes reales compartidos por familias, sin datos personales.
- Un **canal de WhatsApp**, porque ahí es donde la gente ya reenvía los mensajes sospechosos.
- Trabajar con instituciones financieras y de protección al consumidor para que el camino de "ya pagué" se conecte directamente con sus equipos de fraude.

Los conjuntos de evaluación son sintéticos, creados a partir de alertas oficiales. Falta medir la precisión en el mundo real con usuarios reales.
