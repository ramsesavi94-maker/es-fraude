# ¿Es fraude? — plan del hackatón

Hackatón: Nebius x NVIDIA Global AI Hackathon, categoría **Best Apps and Agents** (y premio a mejor uso de Tavily).
Entrega: **30-10-2026, 10:00 PT**. Repo público con licencia MIT; materiales de entrega en inglés, la app en español.
Equipo: Nelson, con Claude (código y arquitectura) y Codex (investigación, revisión y segunda opinión).

## El problema

- El fraude y la extorsión ya son los delitos más frecuentes en México: **44% de 33.8 millones** de delitos en 2025 (INEGI, ENVIPE 2026). La mayoría de las extorsiones son por teléfono y el 93.4% de los delitos no se denuncia.
- CONDUSEF recibió **110,000 quejas** de enero a julio de 2026; **60,000** tienen que ver con posibles fraudes que suplantan bancos, el SAT o plataformas digitales.
- Las víctimas buscan ayuda primero en grupos de Facebook, no en canales oficiales.

## La idea en una línea

Una segunda opinión antes de caer: pegas el mensaje sospechoso, subes la captura, describes la llamada o escribes el nombre de la app de préstamos, y la app te muestra las señales de alerta con evidencia, lo que dicen las fuentes oficiales, el canal oficial para confirmar y un borrador de denuncia.

**Regla de oro:** nunca dice "es seguro". Como máximo: "no encontré señales; confirma por este canal oficial".

## Arquitectura

```
entrada (texto | captura | descripción de llamada | nombre de app)
  │
  ├─ 1. Leer       Nemotron 3.5 Super VL lee capturas; Nano extrae datos del texto
  │                (institución que dice ser, enlaces, teléfonos, montos, urgencia)
  ├─ 2. Verificar  código determinista: dominios contra la lista oficial
  │                Tavily: alertas oficiales, registro de CONDUSEF, dominio real
  ├─ 3. Razonar    Nemotron 3 Ultra con el catálogo de patrones y la evidencia
  │                → veredicto estructurado (JSON)
  └─ 4. Responder  señales con cita del mensaje, fuentes, qué hacer,
                   canal oficial y borrador de denuncia
```

- Token Factory: `https://api.tokenfactory.nebius.com/v1` (compatible con OpenAI).
- Modelos: Ultra para el veredicto, Super VL para capturas, Super para extracción (en pruebas fue más rápido y preciso que Nano).
- Stack: TypeScript, Node 24, Hono, página web ligera pensada para celular.
- Privacidad: no se guardan mensajes ni capturas; Tavily solo recibe nombres de instituciones, dominios y apps, nunca el mensaje completo.

## Reparto del trabajo

| Quién | Qué |
|---|---|
| Codex | Catálogo de patrones de fraude con fuentes oficiales; dominios y canales oficiales; cifras; revisión de veredictos |
| Claude | Código: flujo de análisis, Tavily, interfaz, pruebas, despliegue |
| Nelson | Clave de Tavily; probar con mensajes reales de su familia y amigos; video |

## Calendario

| Fecha | Trabajo |
|---|---|
| 18-10 | Plan, repo, primer análisis de punta a punta con Ultra |
| 19-10 | Catálogo de Codex integrado; lectura de capturas con Super VL (hecho el 18-10) |
| 20-10 | Verificación con Tavily y lista de dominios oficiales (hecha el 18-10) |
| 21-10 | Veredicto final: reglas de "nunca es seguro", borrador de denuncia |
| 22-10 | Interfaz web para celular (primera versión el 18-10) |
| 23-10 | Conjunto de evaluación (hecho el 18-10: 30/30 fraudes, 15/15 legítimos tras ajustes). Falta un segundo conjunto no visto para medir sin sesgo |
| 24-10 | Despliegue público (Nebius Serverless si es posible) |
| 25-10 | Pruebas con 5 personas reales; ajustes |
| 26-10 | Ajustes con lo aprendido |
| 27-10 | README en inglés, diagrama, comentarios sobre Token Factory |
| 28-10 | Guion y grabación del video (<3 min) |
| 29-10 | Envío en Devpost |
| 30-10 | Margen; cierre a las 10:00 PT |

## Pendiente de Nelson

- [ ] Inscribirse en el Nebius Builder Program y obtener la clave de Tavily (`TAVILY_API_KEY` en `.env`).
- [ ] Juntar 10 mensajes sospechosos reales (propios o de familia), con datos personales tapados.

## Fuera de alcance

- Bloquear llamadas o leer el teléfono del usuario.
- Dar asesoría legal o financiera; solo orientar hacia canales oficiales.

## Evaluación (18-10-2026)

| Conjunto | Casos | Fraudes detectados | Legítimos sin falsa alarma | Uso |
|---|---|---|---|---|
| `eval/cases.json` | 45 | 30/30 | 15/15 | Se usó para ajustar las reglas |
| `eval/holdout.json` | 40 | 25/25 | 15/15 | Medido sin ajustes primero (24/25, 14/15); después se corrigieron sus fallos |
| `eval/third.json` | 40 | **25/25** | **15/15** | **No visto: medido una sola vez, sin ajustes** (27 casos difíciles; patrón correcto 15/15) |

Los tres conjuntos los creó Codex a partir de alertas oficiales; son mensajes sintéticos. Falta probar con mensajes reales.
