# Guion del video de demostración (objetivo 2:40, límite 3:00)

Graba la app en vivo en https://es-fraude-seven.vercel.app/?lang=en con el navegador en tamaño de celular, o desde tu teléfono. La voz va en inglés; esta es la traducción para que sepas qué dice cada parte. Todos los ejemplos ya vienen en la app, así que no hay que escribir nada mientras grabas.

| Tiempo | En pantalla | Voz (traducción) |
|---|---|---|
| 0:00–0:15 | Imagen `01-cover.jpg` de la galería, o el inicio de la app | "En México, el fraude ya es el delito más común: 8.1 millones de casos en 2025, y el 96.5% nunca se denuncia. Todas las familias reciben estos mensajes. ¿Es fraude? te da una segunda opinión antes de caer." |
| 0:15–0:45 | Toca el ejemplo **Fake tax authority (SAT)**. Muestra las etapas de progreso, el veredicto de riesgo alto y las señales | "Este es un SMS que se hace pasar por el SAT. NVIDIA Nemotron 3 Super extrae quién dice ser, el enlace y lo que pide. Después, Nemotron 3 Ultra, en Nebius Token Factory, lo compara con doce tipos de fraude documentados por autoridades mexicanas. Cada señal cita el propio mensaje." |
| 0:45–1:05 | Baja a **What we checked**: el dominio que imita y las alertas oficiales del SAT que encontró Tavily | "No solo le preguntamos a un modelo. La app compara el dominio real con los oficiales, sat-devoluciones-mx no es el SAT, y Tavily encuentra alertas oficiales sobre este mismo fraude en sitios de gobierno. Tavily nunca recibe el mensaje de la persona." |
| 1:05–1:25 | Toca la pestaña **Screenshot**, sube `samples/sms-falso-banco.png` y muestra el veredicto del falso banco | "La mayoría de la gente solo tiene una captura. Nemotron 3.5 Super VL la lee: remitente, monto, enlace y teléfono. Un falso aviso del banco, detectado en segundos." |
| 1:25–1:40 | Toca el ejemplo **Email "from SAT"** | "Los enlaces y correos se revisan sin abrirlos: dominios que imitan, acortadores, letras disfrazadas, antigüedad del dominio y cuentas de Gmail que se hacen pasar por el SAT." |
| 1:40–2:10 | De vuelta en el resultado del SAT, abre **Report it, step by step**: toca **Yes**, muestra los pasos urgentes, marca una evidencia, elige **Ciudad de México** y muestra las rutas | "Detectar es solo la mitad. Si ya pagaste, recibes pasos urgentes verificados: 90 días para reclamar un cargo y qué decirle a tu banco sobre una transferencia. Tus datos se quedan en tu navegador y se convierten en un borrador de denuncia. Luego, el canal correcto para tu estado, a un toque: la denuncia en línea de la Fiscalía, la policía cibernética o el 089 con un guion de qué decir." |
| 2:10–2:25 | Toca **Real bank alert** y muestra **No clear warning signs** | "Y no da falsas alarmas. Un aviso real del banco no se marca como fraude, pero la app nunca dice 'es seguro'. Esa regla está en el código. Los teléfonos y los pasos salen solo de un catálogo verificado, nunca del modelo." |
| 2:25–2:40 | Imagen `06-evaluation.jpg` de la galería | "En conjuntos que nunca habíamos visto, detectó 25 de 25 fraudes y 18 de 18 enlaces maliciosos, sin falsas alarmas, por unos dos centavos de dólar por análisis. ¿Es fraude? es gratis y de código abierto, hecho con NVIDIA Nemotron en Nebius Token Factory y Tavily." |

## Consejos para grabar

- **Grabador de pantalla:** en Windows, Xbox Game Bar (Win + Alt + R) graba la ventana activa. OBS Studio también sirve y es gratis.
- **Tamaño de celular en el navegador:** presiona F12, abre la barra de dispositivos (Ctrl + Shift + M) y elige un teléfono, por ejemplo "iPhone 12 Pro".
- **Voz:** puedes grabarla aparte o leerla mientras grabas. Habla despacio: 2:40 deja margen antes de los 3:00.
- **Sin música con derechos:** no uses música, o usa una pista de la Biblioteca de audio de YouTube.
- **Sube el video a YouTube como Público**, porque las reglas piden un video visible públicamente. Copia el enlace en "Demo video URL".
