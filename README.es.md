# ¿Es fraude? — una segunda opinión antes de caer en un fraude

[English](README.md) · **Español**

**Pega un mensaje sospechoso, sube una captura, describe una llamada o escribe el nombre de una app de préstamos. En segundos obtienes las señales de alerta (citadas del mensaje), lo que dicen las fuentes oficiales de México, qué hacer, dónde confirmar o denunciar y un borrador de denuncia.** Gratis, sin registro, en español e inglés, hecho para México.

> **Demo en vivo: [Español](https://es-fraude-seven.vercel.app/) · [English](https://es-fraude-seven.vercel.app/?lang=en)** · Hecho para el Nebius x NVIDIA Global AI Hackathon (categoría Best Apps and Agents)

## Por qué

- El fraude ya es **el delito más frecuente en México**: se estiman **8.1 millones de fraudes en 2025**, y el **80.6%** fue por internet o medios electrónicos ([UNODC-INEGI, ENVIPE 2026](https://www.cdeunodc.inegi.org.mx/unodc/index.php/2026/09/10/envipe-2026-el-fraude-se-consolida-como-el-delito-mas-frecuente-en-mexico-y-revela-una-victimizacion-crecientemente-digital/index.htm)).
- El **96.5%** de los fraudes y el **97.5%** de las extorsiones no se denuncian o no llegan a una investigación (misma fuente).
- La CONDUSEF recibió **110,000 quejas** de enero a julio de 2026; cerca de **60,000** tienen que ver con posibles fraudes que suplantan a bancos, al SAT o a plataformas digitales ([DPL News](https://dplnews.com/?p=329509)).
- Las víctimas buscan ayuda primero en grupos de Facebook y después en un canal oficial ([Publimetro](https://www.publimetro.com.mx/noticias/2026/08/18/mexicanos-corren-a-facebook-antes-de-denunciar-fraudes-de-montadeudas/)).

La gente no necesita otra campaña de prevención. Necesita una respuesta sobre **el mensaje que tiene enfrente, en este momento**, basada en fuentes oficiales y que termine en un siguiente paso concreto.

## Qué hace

| Entrada | Ejemplo |
|---|---|
| Mensaje | Texto de SMS, WhatsApp o correo |
| Captura | Foto del chat o del SMS; la lee un modelo de visión |
| Llamada | "Me dijeron que eran de mi banco y me pidieron el código que me llegó por SMS…" |
| App de préstamo | Solo el nombre de la app o de la financiera |

La página y la respuesta están en **español e inglés** (`?lang=en`). En inglés, las citas se quedan en el español original porque son la evidencia, y el borrador de denuncia también, porque se presenta ante autoridades mexicanas.

La respuesta siempre incluye:

- **Nivel de riesgo**: alto, medio o "sin señales claras". **Nunca dice que un mensaje es seguro**; como mucho, dice que no encontró señales y te indica cómo confirmarlo por un canal oficial.
- **Señales de alerta**, cada una respaldada por una **cita textual** del mensaje o de una página oficial.
- **Lo que se revisó**: enlaces comparados con dominios oficiales, dominios que imitan a una institución, alertas oficiales sobre la institución suplantada, teléfonos en listas oficiales y búsquedas del registro de financieras.
- **Qué hacer** y **dónde confirmar o denunciar**, con números que se marcan con un toque.
- **Denuncia paso a paso**, para que las víctimas sí denuncien:
  1. *¿Ya pagaste o diste tus datos?* Si es así, primero los pasos urgentes: bloquear la tarjeta, reclamar los cargos dentro del plazo legal (90 días para reclamar y 45 días para que el banco responda), qué decirle al banco si transferiste por engaño y cómo obtener el comprobante CEP, y cómo recuperar una cuenta de WhatsApp robada.
  2. *Lista de evidencia* que conviene guardar antes de borrar nada.
  3. *Completa tu denuncia*: fecha, estado, nombre, monto y cuenta se llenan **solo en el navegador** y se integran a un borrador de denuncia en español, listo para las autoridades. Se puede copiar, descargar o compartir.
  4. *Envíala por el canal correcto*, con botones de un toque: abrir la denuncia en línea de la Fiscalía de tu estado (Ciudad de México, Estado de México, Nuevo León) con el texto ya copiado, mandar un correo a la policía cibernética o al SAT con asunto y texto ya escritos, llamar al 089 con un guion de qué decir, o reportar la cuenta dentro de WhatsApp o Facebook. Cada canal aclara si es orientación, reclamación o denuncia penal formal.
  Todas las rutas, plazos y contactos salen de fuentes oficiales ([investigación](docs/research/rutas-denuncia.md), `src/report.ts`).

## Cómo funciona

```
entrada (texto | captura | descripción de llamada | nombre de app)
  │
  ├─ 1. Leer       Nemotron 3.5 Super VL transcribe las capturas
  │                Nemotron 3 Super extrae los datos: quién dice ser, enlaces,
  │                teléfonos, montos, qué pide y si hay urgencia
  ├─ 2. Verificar  sin modelo: dominio real contra dominios oficiales y detección
  │                de imitaciones (bbva-mx-seguridad.com imita a BBVA)
  │                Tavily: alertas oficiales, reportes de dominios, teléfonos en
  │                listas oficiales, menciones de financieras en CONDUSEF
  ├─ 3. Razonar    Nemotron 3 Ultra compara el contenido y la evidencia con un
  │                catálogo de 12 tipos de fraude documentados por autoridades
  │                mexicanas → veredicto estructurado (modo JSON)
  └─ 4. Componer   reglas del producto + pasos y contactos verificados del catálogo
```

### NVIDIA Nemotron en Nebius Token Factory

**Toda la inferencia corre en el momento de cada consulta en [Nebius Token Factory](https://tokenfactory.nebius.com)**, a través de su API compatible con OpenAI (`https://api.tokenfactory.nebius.com/v1`). Cada análisis hace dos o tres llamadas a modelos:

| Paso | Modelo | Por qué este modelo |
|---|---|---|
| Leer capturas | `nvidia/Nemotron-3.5-Super-VL` | Transcribe remitente, montos, enlaces y teléfonos de capturas de celular en unos 2.5 s |
| Extraer datos | `nvidia/nemotron-3-super-120b-a12b` | En nuestras pruebas fue más rápido (≈2 s contra ≈3.6 s) y más preciso que Nano: identificó al "SAT" como remitente donde Nano devolvió "devolución pendiente" |
| Veredicto | `nvidia/Nemotron-3-Ultra-550b-a55b` | Razona sobre el mensaje, la evidencia de las búsquedas y el catálogo de patrones; el modo JSON mantiene la respuesta válida aunque el mensaje traiga comillas raras |

Token Factory nos permitió cambiar de modelo en cada paso, comparar velocidad y precisión con llamadas reales y mantener todo el proceso en unos **6–7 segundos por análisis** (mediana), sin tener que operar GPU propias.

### Reglas para no inventar y no confundir

- **El modelo nunca escribe teléfonos, correos ni pasos a seguir.** En las primeras pruebas, Ultra inventó un teléfono del SAT y un código para reportar mensajes que no existe en México. Ahora los contactos y los pasos salen solo de un catálogo verificado (`src/catalog.ts`), cada uno con su fuente oficial.
- **Se compara el dominio real, no el texto**: `sat.gob.mx.validacion.com` pertenece a `validacion.com`, no al SAT.
- **Sin falsa tranquilidad**: cuando no hay señales, el resumen es un texto fijo que aclara que eso no es una garantía.
- **No encontrar a una financiera no prueba que sea ilegal**: la app pide buscar su razón social en el registro de la CONDUSEF (SIPRES) en lugar de acusarla.
- **Privacidad**: los mensajes y las capturas no se guardan. Tavily solo recibe nombres de instituciones, dominios y teléfonos, nunca el mensaje.
- **Protección contra abuso**: límite por IP por hora y un tope diario, para que la demo pública no pase de los créditos gratuitos.

## Evaluación

Tres conjuntos de casos sintéticos escritos a partir de alertas oficiales (CONDUSEF, SAT, SSPC, SSC CDMX, PROFECO, Bienestar y gobiernos estatales). Cada conjunto incluye mensajes legítimos que parecen sospechosos, como un aviso real del banco que pide llamar al número de la tarjeta, o un familiar que pide que pasen por él.

| Conjunto | Casos | Fraudes detectados | Legítimos sin falsa alarma | Notas |
|---|---|---|---|---|
| `eval/cases.json` | 45 | 30/30 | 15/15 | Se usó para ajustar las reglas |
| `eval/holdout.json` | 40 | 25/25 | 15/15 | Primera medición antes de ajustar: 24/25 y 14/15 |
| `eval/third.json` | 40 | **25/25** | **15/15** | **No visto: medido una sola vez, sin cambios**; 27 casos difíciles; patrón correcto 15/15 |
| `eval/third.json`, respuestas en inglés | 40 | 25/25 | 15/15 | El mismo conjunto con `--lang en`; patrón correcto 14/15 |

Latencia mediana de 5.7 a 6.8 s, p90 de 7.2 a 10.1 s. Los casos son sintéticos; el siguiente paso es probar con mensajes reales de personas reales.

Para correrla tú mismo:

```bash
npx tsx --env-file=.env scripts/evaluate.ts eval/third.json            # agrega --lang en para respuestas en inglés
```

## Cómo correrlo

Requisitos: Node.js 22 o posterior, una clave de Nebius Token Factory y una clave de Tavily (las dos se obtienen con el Nebius Builder Program).

```bash
git clone https://github.com/ramsesavi94-maker/es-fraude
cd es-fraude
npm install
cp .env.example .env   # agrega NEBIUS_API_KEY y TAVILY_API_KEY
npm run dev            # http://localhost:8787
```

Otros comandos:

```bash
npm test                                                   # pruebas unitarias
npx tsx --env-file=.env scripts/try.ts "texto del mensaje" # un análisis en la terminal
npx tsx --env-file=.env scripts/try.ts --image archivo.png # analizar una captura
npx tsx --env-file=.env scripts/samples.ts                 # cuatro casos de ejemplo
```

Sin `TAVILY_API_KEY` la app sigue funcionando, solo con las verificaciones sin modelo y el modelo.

### Despliegue

- **Vercel** (la demo en vivo, en el plan gratuito Hobby; toda la inferencia sigue corriendo en Token Factory): importa el repo; `src/app.ts` exporta la app Hono y Vercel la detecta sin configuración. Agrega las variables de entorno de `.env.example`.
- **Contenedor**: cada push a `main` publica `ghcr.io/ramsesavi94-maker/es-fraude:latest` (puerto 8787), que puede correr en endpoints de Nebius Serverless AI o en cualquier servicio de contenedores.

## Estructura del proyecto

| Ruta | Qué es |
|---|---|
| `src/analyze.ts` | El proceso completo: leer, extraer, verificar, razonar y componer |
| `src/catalog.ts` | Patrones de fraude, canales oficiales y dominios verificados |
| `src/report.ts` | Rutas de denuncia, pasos urgentes y lista de evidencia verificados |
| `src/i18n.ts` | Textos de la app en español e inglés |
| `src/official.ts` | Comparación de dominios y detección de imitaciones |
| `src/tavily.ts` | Búsqueda limitada a nombres, dominios y teléfonos |
| `src/llm.ts` | Cliente de Token Factory |
| `src/app.ts` | API HTTP y límites de uso |
| `public/index.html` | Página pensada para celular |
| `eval/` | Conjuntos de evaluación y resultados |
| `docs/research/` | Investigación de fuentes detrás del catálogo y de las rutas de denuncia |

## Equipo

Hecho por Nelson Ramses Aviles con dos compañeros de IA: **Claude Code** (arquitectura y código) y **Codex** (investigación de patrones de fraude y fuentes oficiales en México, conjuntos de evaluación y segundas opiniones).

Esto es una orientación, no asesoría legal. Si estás en peligro, llama al 911.

## Licencia

[MIT](LICENSE)
