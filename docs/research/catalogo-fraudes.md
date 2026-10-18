# Catálogo de fraudes en México: investigación

Investigación hecha por Codex (OpenAI) con búsqueda web el 18-10-2026 y revisada por Claude. Es la fuente de `src/catalog.ts`.

### Parte 1: patrones de fraude y extorsión en México (12)

**Corte de consulta: 18 de octubre de 2026.** Las frases entre comillas son ejemplos de detección, no transcripciones de casos. Las señales sirven para orientar la revisión; ninguna, por sí sola, demuestra un delito. No se establecen montos mínimos: la cantidad solicitada no determina si hay fraude.

**1. `sat_impersonation` — Falso SAT: adeudos, devoluciones y Buzón Tributario**

- **Cómo llega:** correo, SMS, WhatsApp o llamada.
- **Señales observables:** supuesto saldo a favor con enlace para reclamarlo; petición de contraseñas, códigos o datos bancarios; presión para realizar un depósito. Incluir como variantes de análisis “adeudo pendiente” y “aviso del Buzón Tributario”.
- **Institución suplantada:** SAT.
- **Qué hacer y canal:** entrar por cuenta propia a [sat.gob.mx](https://www.sat.gob.mx/) y consultar el Buzón; buscar el remitente en el [Buscador de correos falsos](https://www.sat.gob.mx/minisitio/BuscadorCorreosFalsos/buscador.html). Si no figura, puede reportarse a **denuncias@sat.gob.mx**. La ausencia en el buscador no autentica el correo.
- **Fuentes oficiales:** [Gobierno de Guanajuato: campaña que suplanta al SAT y paqueterías](https://boletines.guanajuato.gob.mx/2026/05/28/); [SAT: funcionamiento del Buzón Tributario](https://www.sat.gob.mx/minisitio/BuzonTributario/index.html).
- **Precisión:** el SAT **sí envía avisos por correo y SMS** sobre nuevos mensajes en el Buzón. No clasificar automáticamente esos avisos como fraude. **Verificación parcial:** encontré documentación oficial específica de falsas devoluciones; no corroboré en las fuentes consultadas una alerta específica que documentara juntas las variantes de falso adeudo y falso Buzón.

**2. `bank_impersonation` — Falso banco o “cargo no reconocido”**

- **Cómo llega:** llamada, SMS o correo.
- **Señales observables:** alerta de compra o movimiento extraño; supuesto asesor que ofrece cancelarlo; solicitud de contraseña, código de verificación o credenciales de banca electrónica; enlace para “proteger” la cuenta. El identificador de llamada puede mostrar el nombre o número del banco.
- **Institución suplantada:** banco o institución financiera.
- **Qué hacer y canal:** terminar la comunicación; revisar movimientos desde la aplicación bancaria abierta por cuenta propia y contactar al banco mediante el número de la tarjeta o su sitio oficial. Reportar operaciones desconocidas y solicitar folio; acudir a CONDUSEF si corresponde.
- **Fuentes oficiales:** [CONDUSEF: actualización del modus operandi](https://www.condusef.gob.mx/index.php?idc=2718&idcat=3&p=contenido); [CONDUSEF: suplantación telefónica del banco](https://revista.condusef.gob.mx/usuario-inteligente/primer-plano/2020/12/que-los-fraudes-no-arruinen-tu-navidad/).

**3. `virtual_kidnapping` — Secuestro virtual**

- **Cómo llega:** llamada; puede continuar mediante mensajes.
- **Señales observables:** afirmación de que tienen secuestrado a un familiar; exigencia de rescate inmediato; instrucciones para aislarse, incomunicarse o impedir que la familia confirme dónde está la persona.
- **Institución suplantada:** puede no haberla; los responsables simulan ser secuestradores.
- **Qué hacer y canal:** interrumpir la comunicación y tratar de localizar al familiar por otro medio; no depositar siguiendo las instrucciones del interlocutor. Solicitar apoyo al **089**; ante peligro inmediato o una persona realmente desaparecida, **911** y Fiscalía/Unidad Especializada en Combate al Secuestro.
- **Fuentes oficiales:** [SSPC: qué es el secuestro virtual](https://www.gob.mx/sspc/articulos/que-es-el-secuestro-virtual?idiom=es); [Seguridad Pública de BCS: caso y recomendaciones, octubre de 2026](https://www.sspbcs.gob.mx/noticia/evita-sspe-secuestro-virtual-de-dos-adultos-y-un-menor-en-los-cabos).
- **Regla para la app:** no afirmar que el familiar está a salvo a partir del mensaje.

**4. `phone_extortion` — Extorsión telefónica**

- **Cómo llega:** llamada o mensajes.
- **Señales observables:** amenazas contra la persona, familiares o negocio; exigencias de dinero para evitar daños; intimidación y presión para pagar.
- **Institución suplantada:** puede simular una autoridad o atribuirse pertenencia a un grupo criminal.
- **Qué hacer y canal:** colgar, conservar número, mensajes y datos del pago solicitado; verificar la situación por vías independientes y reportar al **089**. Si hay una amenaza inmediata, llamar al **911**.
- **Fuentes oficiales:** [SEGOB: modalidades de extorsión telefónica](https://www.gob.mx/segob/articulos/denuncia-la-mejor-arma-contra-la-extorsion-telefonica); [Gobierno de Michoacán: “Cuelga, Verifica y Marca al 089”, octubre de 2026](https://michoacan.gob.mx/noticias/avanza-combate-a-la-extorsion-informa-ssp-ladas-relacionadas-con-mas-de-600-llamadas-delictivas/).

**5. `loan_app_extortion` — Montadeudas y aplicaciones de préstamo abusivas**

- **Cómo llega:** anuncios en redes, aplicaciones y plataformas digitales; después, llamadas y mensajes de cobranza.
- **Señales observables:** préstamo inmediato y sin requisitos; acceso a contactos o fotografías; depósito menor al ofrecido; intereses que aumentan sin aviso; plazos muy cortos; amenazas de difundir imágenes o mensajes a los contactos.
- **Institución suplantada:** financiera real o supuesta empresa de préstamos.
- **Qué hacer y canal:** identificar la razón social y contrastarla en SIPRES; confirmar la aplicación desde los contactos registrados de la entidad. Conservar evidencia de amenazas y solicitar orientación a Policía Cibernética; reportar extorsión al **089** y presentar denuncia ante Fiscalía.
- **Fuentes oficiales:** [SSPC: advertencia sobre montadeudas](https://www.gob.mx/sspc/prensa/la-sspc-alerta-a-la-ciudadania-a-tomar-precauciones-para-evitar-ser-victima-de-prestamos-montadeudas-en-aplicaciones-moviles); [SSC CDMX: aplicaciones de préstamos y extorsión](https://www.ssc.cdmx.gob.mx/comunicacion/nota/COM2881-06-10-25).
- **Regla para la app:** no declarar ilegal una aplicación únicamente porque su nombre comercial no aparece en SIPRES.

**6. `fake_job_offer` — Falsas ofertas de empleo**

- **Cómo llega:** redes sociales y mensajería.
- **Señales observables:** cobros para continuar una contratación; remuneraciones por tareas simples, como dar “me gusta”; primeros pagos pequeños seguidos de una exigencia de depósito para liberar ganancias mayores.
- **Institución suplantada:** empresa, reclutadora o marca.
- **Qué hacer y canal:** confirmar la vacante con la empresa mediante contactos obtenidos independientemente; no transferir dinero para desbloquear ganancias o conseguir el puesto. Conservar conversaciones y solicitar orientación a Policía Cibernética.
- **Fuentes oficiales:** [SSC CDMX: falsas ofertas de empleo](https://www.ssc.cdmx.gob.mx/index.php/comunicacion/nota/COM1374-12-05-2025); [SSPC: fraude de recompensas por tareas en redes](https://www.gob.mx/sspc/prensa/sspc-alerta-sobre-fraudes-por-recompensas-falsas-en-redes-sociales?idiom=es).

**7. `fake_delivery` — Paquete retenido o entrega falsa**

- **Cómo llega:** SMS, WhatsApp o llamada.
- **Señales observables:** paquete inesperado; dirección incompleta; pago pendiente para liberarlo; plazo breve para recogerlo; enlace ajeno a la empresa; solicitud de un código recibido por SMS para “confirmar la entrega”.
- **Institución suplantada:** paquetería; la alerta consultada menciona DHL.
- **Qué hacer y canal:** consultar la guía en el sitio de la paquetería abierto por cuenta propia; no compartir códigos ni pagar desde el mensaje. Si se entregaron datos bancarios, contactar al banco. Reportar a Policía Cibernética.
- **Fuentes oficiales:** [Gobierno de Guanajuato: paquetes retenidos y enlaces apócrifos](https://boletines.guanajuato.gob.mx/2026/05/28/); [PROFECO: falsa paquetería que solicita el código de WhatsApp](https://www.gob.mx/profeco/prensa/recuerda-profeco-recomendaciones-de-seguridad-para-evitar-enganos-o-fraudes?idiom=es-MX).

**8. `fake_prize` — Premios y sorteos falsos**

- **Cómo llega:** llamada o SMS.
- **Señales observables:** premio de un concurso en el que no se participó; depósito sorpresa; enlace para reclamarlo o verificarlo; uso del nombre de una autoridad para dar credibilidad.
- **Institución suplantada:** empresa organizadora, institución financiera o SEGOB.
- **Qué hacer y canal:** no proporcionar datos ni seguir el enlace; confirmar con el organizador mediante su canal independiente. Consultar permisos en la [Dirección General de Juegos y Sorteos](https://www.juegosysorteos.gob.mx/). Reportar amenazas al **089**.
- **Fuentes oficiales:** [CONDUSEF: premio o depósito sorpresa](https://www.condusef.gob.mx/index.php?idc=2718&idcat=3&p=contenido); [SEGOB: no notifica a personas ganadoras](https://www.gob.mx/segob/prensa/alerta-gobernacion-por-estafas-en-juegos-y-sorteos-no-notifica-a-personas-ganadoras).
- **Precisión:** que exista un permiso no autentica el mensaje recibido.

**9. `family_impersonation` — Familiar suplantado por WhatsApp**

- **Cómo llega:** WhatsApp, desde otra cuenta o una cuenta comprometida.
- **Señales observables:** petición inusual de dinero; uso de nombre y foto conocidos desde otro número; supuesto cambio de teléfono seguido de una solicitud de transferencia.
- **Institución suplantada:** ninguna; se suplanta a un familiar o conocido.
- **Qué hacer y canal:** llamar al número previamente conocido o confirmar por otra persona; no transferir basándose solamente en foto y nombre. Reportar la cuenta y conservar evidencia; Policía Cibernética y Ministerio Público si hubo delito.
- **Fuentes oficiales:** [SSC y Meta: confirmar por llamada las peticiones inusuales de familiares](https://www.ssc.cdmx.gob.mx/comunicacion/nota/2774-la-unidad-de-policia-cibernetica-de-la-ssc-y-meta-emiten-recomendaciones-para-evitar-el-robo-de-cuentas-de-whatsapp); [INDEP: suplantación con otro número y fotografías del perfil real](https://www.gob.mx/indep/prensa/no-caigas-en-estafas).
- **Verificación parcial:** el mecanismo está documentado; no encontré la frase literal “cambié de número” en las fuentes oficiales consultadas.

**10. `fake_government_aid` — Falsos programas sociales o apoyos**

- **Cómo llega:** WhatsApp, SMS, llamada, redes o sitios web.
- **Señales observables:** cobro por registro, incorporación o gestión; intermediario que promete un apoyo; utilización de logotipos de Bienestar o del Banco del Bienestar; enlaces a supuestos programas no confirmados.
- **Institución suplantada:** Secretaría de Bienestar, Banco del Bienestar u otro programa gubernamental.
- **Qué hacer y canal:** verificar en [gob.mx/bienestar](https://www.gob.mx/bienestar) y en la **Línea de Bienestar: 800 639 4264**. Los trámites de los Programas para el Bienestar son gratuitos y sin intermediarios.
- **Fuentes oficiales:** [Programas para el Bienestar: prevención de fraudes](https://www.programasparaelbienestar.gob.mx/noticias-y-comunicados/noticia/evita-fraudes-los-tramites-de-los-programas-para-el-bienestar-son-gratuitos-y-sin-intermediarios/); [Bienestar: alerta por falsos programas en WhatsApp y canal de consulta](https://www.gob.mx/bienestar/prensa/tarjeta-informativa-396016?idiom=es).

**11. `fake_traffic_fine` — Phishing de multas o fotomultas**

- **Cómo llega:** principalmente SMS.
- **Señales observables:** multa pendiente con pago inmediato; amenaza de recargos o consecuencias administrativas; enlace que imita un portal gubernamental y solicita datos personales o bancarios.
- **Institución suplantada:** autoridad de tránsito, movilidad o finanzas estatal/municipal.
- **Qué hacer y canal:** consultar la infracción desde el portal oficial del gobierno de la entidad correspondiente, entrando por cuenta propia; no pagar mediante el enlace recibido. Solicitar orientación a Policía Cibernética o **088**.
- **Fuentes oficiales:** [SSPC: multas de tránsito falsas vía SMS](https://www.gob.mx/sspc/prensa/sspc-emite-recomendaciones-para-evitar-fraudes-por-multas-de-transito-falsas-via-sms?idiom=es); [Guardia Nacional CERT-MX: falsos mensajes de multas](https://www.gob.mx/gncertmx/articulos/falsos-mensajes-multas-de-gobierno).
- **Precisión:** no hay un único portal nacional para confirmar todas las multas; la app debe identificar primero la jurisdicción.

**12. `marketplace_scam` — Venta falsa en marketplace**

- **Cómo llega:** anuncios y perfiles en redes, plataformas de compraventa y mensajes.
- **Señales observables:** oferta extraordinariamente barata; perfil o datos del vendedor difíciles de verificar; enlaces a tiendas clonadas; productos inexistentes, falsificados o robados.
- **Institución suplantada:** tienda, marca o vendedor particular.
- **Qué hacer y canal:** verificar vendedor y producto antes de pagar; conservar anuncio, conversaciones y comprobantes. Para posible delito, Policía Cibernética y Fiscalía; para incumplimiento de un proveedor comercial identificable, orientación de PROFECO.
- **Fuentes oficiales:** [SSC CDMX: fraudes en compras en línea](https://www.ssc.cdmx.gob.mx/index.php/comunicacion/nota/COM1334-08-05-2025); [SSC CDMX: vehículos inexistentes o robados anunciados mediante perfiles falsos](https://www.ssc.cdmx.gob.mx/blog/post/la-policia-cibernetica-de-la-ssc-recomienda-los-usuarios-de-internet-tener-precaucion-en-la-transaccion-de-vehiculos-de-transporte-difundidos-en-redes-sociales); [PROFECO: canales de reclamación](https://www.gob.mx/profeco/articulos/telefono-del-consumidor?idiom=es).

### Parte 2: verificaciones oficiales que una app puede consultar

**Registro de financieras y aplicaciones de préstamo**

| Consulta | URL oficial exacta | Qué permite verificar |
|---|---|---|
| SIPRES | https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp | Institución financiera, denominación, registro, estatus y datos de contacto. |
| Portal de Fraudes Financieros | https://phpapps.condusef.gob.mx/fraudes_financieros/index.php | Consultar información y reportes sobre mecanismos de fraude. Su existencia y dirección están documentadas por CONDUSEF. |
| Alertas de suplantación | https://www.condusef.gob.mx/index.php/buros-de-credito.html?idc=2899&idcat=1&p=contenido | Ejemplo reciente: instituciones que reportaron suplantación durante septiembre de 2026. Son entidades **suplantadas**, no una lista de entidades culpables. |
| Padrón de Entidades Supervisadas de CNBV | https://www.cnbv.gob.mx/Paginas/TiposDeConsulta.aspx | Contrastar supervisión y acceder a información sobre entidades autorizadas, incluida captación de recursos. |

**SIPRES sí admite búsqueda por nombre completo o parcial y razón social**, además de sector. Los resultados básicos incluyen clave de registro, denominación social, estatus y entidad federativa. El detalle permite consultar RFC, domicilio, teléfonos, sitio web, correo, sector, fecha de alta, autorización cuando corresponda, observaciones e historial de cambios. Fuentes: [guía de CONDUSEF](https://www.condusef.gob.mx/?idc=2732&idcat=3&p=contenido), [ejemplo de consulta y resultados](https://revista.condusef.gob.mx/credito/personal/2020/11/te-ofrecieron-un-credito-facilito/) y [campos previstos en el artículo 41 de las disposiciones de registro](https://www.condusef.gob.mx/documentos/marco_legal/DispRegistrosAnte-CONDUSEF.pdf).

Para una aplicación, buscar primero **la entidad legal que ofrece el crédito**, no solamente el nombre mostrado en la tienda. SIPRES registra instituciones y no certifica cada producto o aplicación. Contrastar los contactos del mensaje con los del registro y confirmar con la entidad por esos canales. Las alertas de CONDUSEF documentan que incluso entidades registradas son suplantadas. Fuentes: [alcance de SIPRES](https://www.condusef.gob.mx/?idc=2732&idcat=3&p=contenido), [alerta de septiembre de 2026](https://www.condusef.gob.mx/index.php/buros-de-credito.html?idc=2899&idcat=1&p=contenido).

**Limitaciones verificadas o pendientes:**

- **Portal de Fraudes Financieros:** URL corroborada en [CONDUSEF](https://www.condusef.gob.mx/?idc=1577&idcat=3&p=contenido), pero el acceso directo falló durante esta consulta. **No verifiqué su disponibilidad operativa ni sus filtros actuales.**
- **Lista nacional exhaustiva de apps fraudulentas:** **no verificada**. Sí existen alertas oficiales sobre montadeudas y relaciones de instituciones suplantadas; no deben presentarse como una lista completa.
- **API pública oficial de SIPRES o del Portal de Fraudes:** **no verificada**. Para el prototipo, tratarlos como consultas web y enlaces de confirmación, sin prometer integración mediante API.
- **Regla propuesta para la app:** una búsqueda sin coincidencias debe responder “no pude verificar el registro”, no “es ilegal”; una coincidencia debe responder “encontré esta institución registrada”, no “esta app es segura”.

**Dominios oficiales para contrastar enlaces**

| Institución | Dominio de referencia | URL oficial |
|---|---|---|
| SAT | `sat.gob.mx` | https://www.sat.gob.mx/ |
| IMSS | `imss.gob.mx` | https://www.imss.gob.mx/ |
| CONDUSEF | `condusef.gob.mx` | https://www.condusef.gob.mx/ |
| Banco de México | `banxico.org.mx` | https://www.banxico.org.mx/ |
| BBVA México | `bbva.mx` | https://www.bbva.mx/ |
| Banorte | `banorte.com` | https://www.banorte.com/ |
| Santander México | `santander.com.mx` | https://www.santander.com.mx/ |
| Banamex | `banamex.com` | https://www.banamex.com/ |
| HSBC México | `hsbc.com.mx` | https://www.hsbc.com.mx/ |
| Scotiabank México | `scotiabank.com.mx` | https://www.scotiabank.com.mx/ |

Los portales son las fuentes primarias de los dominios. Para los dos accesos que fallaron, el dominio quedó corroborado mediante [documentación oficial del IMSS](https://imss.gob.mx/sites/all/statics/pdf/avisos-privacidad/DIR/CA/APS-solicitud-asignacion-localizacion-NSS.pdf) y [Gobierno Corporativo de Banorte](https://www.banorte.com/GFB/Gobierno-Corporativo.html).

**Ranking bancario: verificación parcial.** Estos son seis bancos de gran presencia; **no corroboré que constituyan exactamente los seis mayores por activos al corte de octubre de 2026**. Banxico identifica a BBVA, Santander, Banorte, Banamex y HSBC como los cinco con mayor concentración de activos, con cifras a marzo de 2026. No atribuir a Scotiabank el sexto puesto sin completar esa comprobación. [Fuente: Reporte de Estabilidad Financiera, junio de 2026](https://www.banxico.org.mx/publicaciones-y-prensa/reportes-sobre-el-sistema-financiero/%7B86FBB07E-F883-0A38-2110-3C736DB0760E%7D.pdf).

**Regla técnica propuesta:** comparar el nombre de host real, no buscar la marca como texto dentro de la URL. Por ejemplo, `sat.gob.mx.ejemplo.com` pertenece a `ejemplo.com`. La tabla es una base de referencia, no un inventario exhaustivo de dominios autorizados ni una garantía de seguridad de cualquier enlace.

**Teléfonos y canales oficiales**

| Canal | Contacto | Uso y fuente oficial |
|---|---|---|
| Denuncia anónima | **089** | Reportar extorsión y hechos que requieren investigación. [SSPC: diferencias entre 088, 089 y 911](https://www.gob.mx/sspc/es/articulos/sabes-cual-es-la-diferencia-entre-los-numeros-088-089-y-911). |
| Emergencias | **911** | Peligro inmediato y emergencias. [SSPC](https://www.gob.mx/sspc/es/articulos/sabes-cual-es-la-diferencia-entre-los-numeros-088-089-y-911). |
| Guardia Nacional | **088** | Orientación para presentar denuncia por ciberdelitos. [CERT-MX, enero de 2026](https://www.gob.mx/gncertmx/articulos/en-caso-de-ser-victima-de-algun-ciberdelito-llama-al-088-atencion-ciudadana). |
| CONDUSEF | **55 5340 0999** | Orientación y atención sobre servicios financieros. Número corroborado en [alerta de septiembre de 2026](https://www.condusef.gob.mx/index.php/buros-de-credito.html?idc=2899&idcat=1&p=contenido). |
| Queja electrónica CONDUSEF | https://tramites.condusef.gob.mx/QuejaElectronica/registro.php | Reclamaciones contra instituciones financieras; revisar requisitos y materias admitidas. |
| Policía Cibernética CDMX | **55 5242 5100, ext. 5086**; **policia.cibernetica@ssc.cdmx.gob.mx** | Orientación y reporte de posibles fraudes digitales. [SSC, septiembre de 2026](https://www.ssc.cdmx.gob.mx/comunicacion/nota/COM2612-25-09-26). |
| Policías cibernéticas estatales | https://www.gob.mx/sspc/documentos/ciberguia | Directorio y orientación para localizar la unidad correspondiente; referenciado por [SSPC](https://www.gob.mx/sspc/prensa/la-sspc-alerta-a-la-ciudadania-a-tomar-precauciones-para-evitar-ser-victima-de-prestamos-montadeudas-en-aplicaciones-moviles). |
| Policía Cibernética Guanajuato | **policiaciberneticafspe@guanajuato.gob.mx** | Reporte de números, correos y enlaces sospechosos. [Gobierno estatal, mayo de 2026](https://boletines.guanajuato.gob.mx/2026/05/28/). |
| SAT | **55 6272 2728**, MarcaSAT; **denuncias@sat.gob.mx** para correos sospechosos | [Portal SAT: contacto](https://www.sat.gob.mx/minisitio/CartaPorte/index.html); [Buscador de correos falsos](https://www.sat.gob.mx/minisitio/BuscadorCorreosFalsos/buscador.html). |
| PROFECO | **55 5568 8722** y **800 468 8722** | Orientación y quejas por relaciones de consumo. [Teléfono del Consumidor](https://www.gob.mx/profeco/articulos/telefono-del-consumidor?idiom=es). |
| Bienestar | **800 639 4264** | Confirmación de información sobre programas y pensiones. [Secretaría de Bienestar](https://www.gob.mx/bienestar/prensa/tarjeta-informativa-396016?idiom=es). |

Para el borrador de denuncia, distinguir **orientación**, **reclamación financiera o de consumo** y **denuncia penal ante Fiscalía/Ministerio Público**. La SSC indica expresamente acudir al Ministerio Público cuando se es víctima de un delito; contactar a Policía Cibernética no debe mostrarse como equivalente a haber presentado esa denuncia. [Fuente oficial](https://www.ssc.cdmx.gob.mx/comunicacion/nota/2774-la-unidad-de-policia-cibernetica-de-la-ssc-y-meta-emiten-recomendaciones-para-evitar-el-robo-de-cuentas-de-whatsapp).

### Parte 3: cifras para el README (máximo 6)

Las siguientes son las cifras recientes que pude corroborar. **ENVIPE 2026 describe delitos ocurridos durante 2025**; no deben etiquetarse como delitos ocurridos en 2026. Las primeras cuatro proceden del análisis oficial del Centro de Excelencia UNODC-INEGI publicado el 10 de septiembre de 2026.

| # | Texto utilizable en el README | Periodo y alcance | Fuente oficial |
|---|---|---|---|
| 1 | **En México ocurrieron aproximadamente 8.1 millones de fraudes durante 2025.** | Estimación ENVIPE 2026; eventos, no personas únicas. | [UNODC-INEGI: ENVIPE 2026](https://www.cdeunodc.inegi.org.mx/unodc/index.php/2026/09/10/envipe-2026-el-fraude-se-consolida-como-el-delito-mas-frecuente-en-mexico-y-revela-una-victimizacion-crecientemente-digital/index.htm). |
| 2 | **El 80.6% de los fraudes involucró internet o medios electrónicos.** | Fraudes ocurridos en 2025; incluye redes, correo y banca electrónica. | [UNODC-INEGI, tabla 1](https://www.cdeunodc.inegi.org.mx/unodc/index.php/2026/09/10/envipe-2026-el-fraude-se-consolida-como-el-delito-mas-frecuente-en-mexico-y-revela-una-victimizacion-crecientemente-digital/index.htm). |
| 3 | **La cifra oculta del fraude fue de 96.5%.** | Delitos de 2025 no denunciados o sin inicio de carpeta; no equivale solamente a “no denunciados”. | [UNODC-INEGI, tabla 6](https://www.cdeunodc.inegi.org.mx/unodc/index.php/2026/09/10/envipe-2026-el-fraude-se-consolida-como-el-delito-mas-frecuente-en-mexico-y-revela-una-victimizacion-crecientemente-digital/index.htm). |
| 4 | **La cifra oculta de la extorsión alcanzó 97.5%.** | Delitos de 2025; misma definición de cifra oculta. | [UNODC-INEGI, tabla 6](https://www.cdeunodc.inegi.org.mx/unodc/index.php/2026/09/10/envipe-2026-el-fraude-se-consolida-como-el-delito-mas-frecuente-en-mexico-y-revela-una-victimizacion-crecientemente-digital/index.htm). |
| 5 | **Nueve instituciones financieras reportaron suplantación de identidad a CONDUSEF en septiembre de 2026.** | Reportes de instituciones registradas; no número de víctimas ni de apps fraudulentas. | [CONDUSEF: comunicado sobre septiembre de 2026](https://www.condusef.gob.mx/index.php/buros-de-credito.html?idc=2899&idcat=1&p=contenido). |
| 6 | **SSPC reportó 2,000 personas detenidas relacionadas con extorsión en el marco de la estrategia nacional.** | Acumulado del 6 de julio de 2025 al 31 de agosto de 2026; detenciones, no condenas ni estimación de incidencia. | [SSPC: balance publicado en septiembre de 2026](https://www.gob.mx/sspc/prensa/avances-de-la-estrategia-nacional-de-seguridad-disminuyen-53-los-homicidios-dolosos-a-nivel-nacional-representa-46-homicidios-menos). |

**Actualización no verificada:** no corroboré un balance nacional posterior de SSPC sobre extorsión hasta el 18 de octubre de 2026. La sexta cifra debe conservar su fecha de corte; no presentarla como total actualizado a octubre.