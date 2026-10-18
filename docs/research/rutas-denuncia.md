# Rutas oficiales de denuncia en México: investigación

Investigación hecha por Codex (OpenAI) con búsqueda web el 18-10-2026 y revisada por Claude. Es la fuente de `src/report.ts`.

**La app debe distinguir tres acciones: proteger cuentas, reclamar el dinero y denunciar el delito.** Un reporte a Policía Cibernética, al SAT o a una plataforma no equivale automáticamente a una denuncia penal.

Verificación web: **18 de octubre de 2026**. Usé fuentes gubernamentales mexicanas y, para sus propios servicios, fuentes oficiales de WhatsApp, Meta, bancos y Buró de Crédito. **“No verificado” significa que no pude confirmar el dato o funcionamiento; no demuestra que el servicio no exista.** No envié reportes ni modifiqué archivos.

**1. Si ya pagaste o diste tus datos: primeras horas**

El siguiente orden es una propuesta práctica para la app, apoyada en las recomendaciones citadas.

1. **Contacta inmediatamente a tu banco por un canal que tú abras.** Usa el teléfono del reverso de la tarjeta o su aplicación oficial. Reporta lo sucedido, solicita bloquear las tarjetas comprometidas y, si entregaste credenciales, el acceso a banca digital. Cambia la contraseña y revisa movimientos. El procedimiento concreto depende del banco. [CONDUSEF: contacto seguro con el banco](https://revista.condusef.gob.mx/usuario-inteligente/tu-bolsillo/2023/03/los-fraudes-ciberneticos-se-actualizan/), [Santander: actuación ante fraude](https://www.santander.com.mx/personas/informacion-y-ayuda/centro-de-seguridad).

2. **Si hay operaciones que no hiciste, presenta la aclaración y conserva el folio.** Identifica fecha, importe y operación; solicita acuse de recepción y posteriormente el dictamen. CONDUSEF recomienda cancelar la tarjeta afectada y acudir a la Unidad Especializada de Atención a Usuarios —UNE— del banco. [CONDUSEF: cargos no reconocidos](https://www.gob.mx/condusef/es/articulos/cargos-no-reconocidos?idiom=es).

3. **Si tú transferiste por engaño, informa exactamente eso al banco emisor.** Pide que registre el fraude, contacte al banco receptor y evalúe una solicitud de apoyo o devolución. No lo describas como una operación que nunca autorizaste si sí la hiciste. CONDUSEF recomienda avisar inmediatamente en transferencias equivocadas; esa gestión no garantiza recuperar el dinero. [CONDUSEF: transferencias equivocadas](https://revista.condusef.gob.mx/usuario-inteligente/tu-bolsillo/2021/11/te-equivocaste-al-hacer-un-deposito/).

4. **Recupera las cuentas comprometidas y cambia las contraseñas expuestas.** Prioriza correo electrónico, banca y mensajería; activa verificación en dos pasos. Cambiar contraseñas y avisar a las instituciones donde tienes cuentas forma parte de las recomendaciones oficiales ante robo de identidad. [CONDUSEF: qué hacer ante robo de identidad](https://www.condusef.gob.mx/documentos/com71_reclamaciones-robo-identidad.pdf), [SSPC: protección de cuentas](https://www.gob.mx/sspc/prensa/alerte-la-sspc-sobre-ataques-ciberneticos-en-redes-sociales-de-cuentas-oficiales-213638).

5. **Guarda evidencia y presenta la denuncia correspondiente.** Conserva mensajes, correos, capturas y enlaces antes de borrar conversaciones o reportar perfiles. La campaña oficial recomienda respaldarlos y acudir al Ministerio Público. [Campaña Nacional Antifraude Cibernético](https://www.gob.mx/profeco/articulos/campana-nacional-antifraude-cibernetico-260577?idiom=es).

**Plazos bancarios: qué puede afirmarse**

| Supuesto | Plazo y alcance verificado | Fuente |
|---|---|---|
| Solicitud general de aclaración | **90 días naturales** desde la fecha de corte o, según corresponda, desde la operación o servicio. | [LTOSF, artículo 23, fracción I](https://www.diputados.gob.mx/LeyesBiblio/pdf/LTOSF.pdf) |
| Respuesta del banco | Máximo **45 días** desde que recibe la solicitud: dictamen escrito, evidencia e informe que responda los hechos. Para operaciones en el extranjero: hasta **180 días naturales**. | [LTOSF, artículo 23, fracción II](https://www.diputados.gob.mx/LeyesBiblio/pdf/LTOSF.pdf) |
| Abono por cargos no reconocidos con tarjeta de crédito | A más tardar el **segundo día hábil**, bajo los supuestos y excepciones del numeral 3.4. Este contempla reclamaciones dentro de **90 días naturales posteriores al cargo**. | [Banxico, Circular 34/2010, numerales 3.4 y 3.6](https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-34-2010/%7B0C55B906-6DB4-6B88-FED0-67987E9FB3CC%7D.pdf) |
| Abono por cargos no reconocidos con tarjeta de débito | A más tardar el **segundo día hábil bancario**, con condiciones y excepciones; el artículo 19 Bis 3 contempla el aviso dentro de **90 días posteriores al cargo**. | [Banxico, modificación a la Circular 3/2012, artículos 19 Bis 3 y 19 Bis 4](https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-3-2012/%7B267759B9-4597-E005-B7D9-973334E7D3E1%7D.pdf) |

**No publicar “el banco siempre devuelve en 48 horas”.** Son días hábiles y existen excepciones relacionadas con la acreditación de los mecanismos de autenticación. El abono puede ser objeto de investigación y reversión conforme al dictamen. Tampoco debe confundirse el plazo para reclamar con la cobertura de ciertas operaciones ocurridas durante las 48 horas anteriores al aviso de robo o extravío. [Banxico: reglas de tarjetas de crédito](https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-34-2010/%7B0C55B906-6DB4-6B88-FED0-67987E9FB3CC%7D.pdf).

**SPEI: sí hay mecanismos de apoyo, pero no una cancelación garantizada**

- Una transferencia **liquidada y acreditada** es firme e irrevocable conforme a las reglas del SPEI. Banxico remite al usuario a la UNE o CONDUSEF para orientación. [Banxico: preguntas frecuentes](https://www.banxico.org.mx/footer-es/preguntas-frecuentes-dudas-ba.html).
- La **regla 43ª de la Circular 14/2017** establece convenios entre participantes para solicitudes de apoyo ante transferencias **no instruidas por el cliente**. Incluye eventual restricción de disposición de recursos, evaluación y devolución. **No verifiqué que toda transferencia autorizada por engaño quede automáticamente cubierta** ni un formulario de Banxico donde la víctima ordene congelar fondos. [Banxico: regla 43ª](https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-14-2017/%7BA06FBFEE-06BB-F249-32FC-25B334B2A744%7D.pdf).
- Descarga el **CEP** en [banxico.org.mx/cep](https://www.banxico.org.mx/cep/). Necesitas fecha, clave de rastreo o referencia, bancos emisor y receptor, cuenta beneficiaria y monto. Acredita el abono; **no es una denuncia ni una solicitud de devolución**. [Banxico: información del CEP](https://www.banxico.org.mx/servicios/mi-spei_-transferencias-ban.html).

Texto sugerido para llamar, como propuesta editorial: «Transferí por engaño el día __, por $__; la clave de rastreo es __. Solicito registrar el fraude y evaluar de inmediato la gestión de apoyo o devolución con el banco receptor. Necesito el folio».

**Si entregaste el código de WhatsApp**

1. Abre WhatsApp y elige volver a iniciar sesión.
2. Registra tu número completo e introduce el código de seis dígitos recibido por SMS o llamada.
3. Al volver a registrar la cuenta, WhatsApp cierra las sesiones de los dispositivos conectados.
4. Si solicita un PIN de verificación en dos pasos que desconoces, la ayuda indica esperar **siete días** y volver a intentarlo. Introducir el código SMS ya desconecta a quien utiliza la cuenta.
5. No reportes tu propia cuenta comprometida como infractora para recuperarla: WhatsApp advierte que podría suspenderla.

Fuente: [WhatsApp: recuperar una cuenta comprometida](https://faq.whatsapp.com/1131652977717250/). Es fuente oficial de la plataforma, no del Gobierno mexicano.

**Si entregaste identificación o datos personales**

Solicita tu Reporte de Crédito Especial y revisa créditos desconocidos. CONDUSEF **sí atiende reclamaciones por afectaciones financieras derivadas de robo de identidad**: pide escrito de hechos, identificación, estados de cuenta y avisos de operaciones desconocidas; también recomienda denunciar ante el Ministerio Público. **No equivale a un registro preventivo universal para cualquier filtración de datos.** [CONDUSEF: reclamación por robo de identidad](https://www.condusef.gob.mx/documentos/com71_reclamaciones-robo-identidad.pdf).

Existen **Alertas Buró**, que avisan de cambios, y **Bloqueo**, que restringe temporalmente consultas al historial. Son servicios de una empresa privada y pueden tener costo; no cancelan por sí solos créditos fraudulentos. [CONDUSEF: servicios de Buró](https://www.gob.mx/condusef/articulos/buro-de-credito?idiom=es), [Buró: productos actuales](https://www.burodecredito.com.mx/), [Buró: Bloqueo y requisitos](https://www.burodecredito.com.mx/personas-f%C3%ADsicas/productos/bloqueo.html).

**2. Rutas para reportar o denunciar**

**CONDUSEF**

- **Queja electrónica: reclamación financiera.** La instrucción oficial reciente dirige a [RUT](https://rut.condusef.gob.mx/public/): registrarse, obtener la Clave de Identidad CONDUSEF —CIC— e ingresar la queja. También está publicado el [Portal de Queja Electrónica](https://tramites.condusef.gob.mx/QuejaElectronica/) y su [formulario de registro](https://tramites.condusef.gob.mx/QuejaElectronica/registro.php). Pide datos personales, institución, producto, hechos, monto y pretensión; identificación vigente, documento de relación contractual y comprobantes. Los PDF tienen límite publicado de 7 MB. [Instrucción oficial de CONDUSEF](https://www.condusef.gob.mx/index.php?idc=2793&idcat=3&p=contenido).
- **Cuándo aplica:** controversias con instituciones financieras. El formulario excluye empresas no financieras y exige acreditar la relación con la institución; no es una vía para perseguir penalmente a un estafador particular. [Alcance y requisitos del formulario](https://tramites.condusef.gob.mx/QuejaElectronica/registro.php).
- **Portal de Fraudes Financieros: reporte preventivo.** [Destino publicado](https://phpapps.condusef.gob.mx/fraudes_financieros/index.php). Recopila teléfonos, correos, páginas, perfiles e instituciones falsas y experiencias de fraude. **No sustituye la reclamación ni la denuncia penal. No pude verificar los campos actuales ni completar la comprobación funcional del portal.** [Descripción oficial](https://www.condusef.gob.mx/?idc=360&p=contenido).
- **Orientación:** 55 5340 0999 y asesoria@condusef.gob.mx. [Directorio oficial](https://www.condusef.gob.mx/uau/).

**Fiscalías: denuncia penal y sus límites**

| Institución | Ruta y naturaleza | Datos y verificación |
|---|---|---|
| **FGR** | [CEDAC](https://appcedpro.fgr.org.mx/): **orientación y canalización**. También 800 008 5400 y atencionfgr@fgr.org.mx. | El formulario pide identidad/contacto —con opción anónima—, lugar, fecha, hora, narración, personas relacionadas y documentos. **Advierte expresamente que su folio no constituye denuncia formal ni carpeta de investigación.** La FGR atiende competencia federal; no debe ser la ruta predeterminada para cualquier fraude. [Formulario](https://appcedpro.fgr.org.mx/), [canales publicados](https://www.gob.mx/fgr/acciones-y-programas/denuncias-fgr). |
| **CDMX** | [Denuncia Digital](https://denunciadigital.cdmx.gob.mx/): vía de **denuncia penal**; el catálogo oficial incluye fraude. | El flujo publicado utiliza Llave CDMX y recaba datos personales, domicilio, contacto y hechos. La procedencia depende de las respuestas y revisión ministerial. **No comprobé el flujo completo después de autenticación.** [Servicio vigente en el directorio de Fiscalía](https://fgjcdmx.gob.mx/nuestros-servicios/en-linea), [inclusión de fraude](https://adip.cdmx.gob.mx/comunicacion/nota/presentacion-de-nuevo-sistema-de-denuncia-digital), [explicación del flujo](https://www.jefaturadegobierno.cdmx.gob.mx/comunicacion/nota/mensaje-de-la-fiscal-general-de-justicia-de-la-ciudad-de-mexico-ernestina-godoy-ramos-y-del-titular-de-la-agencia-digital-de-innovacion-publica-jose-antonio-pena-merino-durante-la-videoconferencia-de-prensa-en-el-antiguo-palacio-del-ayuntamiento). |
| **Estado de México** | [Predenuncia en línea](https://fgjem.edomex.gob.mx/pre-denuncia-en-linea): inicio de la ruta penal. | El Gobierno estatal la enlaza para fraude. **No pude verificar los campos actuales ni que permita concluir una denuncia de fraude íntegramente en línea.** No mostrar el folio inicial como denuncia ya formalizada; deben seguirse las instrucciones del MP. [Referencia estatal](https://sseguridad.edomex.gob.mx/fraude-extorsion-telefonico). |
| **Nuevo León** | [Sistema de Video Denuncia](https://denuncia.fiscalia-nl.gob.mx:8443/Bienvenida.html): atención remota con MP. | Su existencia sigue enlazada por INFONL en 2026. **No pude acceder al sistema ni confirmar su catálogo actual para fraude o campos obligatorios.** Preparar identificación y relato; la documentación adicional depende del caso. [INFONL](https://infonl.mx/denuncia/), [documentación oficial del servicio](https://www.pjenl.gob.mx/ViolenciaDeGenero/Download/Manual-Actuacion-Proteccion-Mujeres-Covid19.pdf). |
| **Jalisco** | **No verifiqué un formulario vigente para formalizar por internet una denuncia de fraude.** | La página oficial sobre delitos por internet indica acudir al MP y llevar identificación y evidencia documental. Es una página con referencias antiguas: **no tomo sus teléfonos históricos como vigentes**. Para orientación actual: policia.cibernetica@jalisco.gob.mx, 33 3837 6000, ext. 15832. [Denuncia y documentos](https://fge.jalisco.gob.mx/policia-cibernetica/reporte/denuncia), [contacto actual publicado](https://fiscalia.jalisco.gob.mx/policia-cibernetica/orientacion-y-contacto/). |

**Policía Cibernética y 089**

- **SSC CDMX:** policia.cibernetica@ssc.cdmx.gob.mx y **55 5242 5100, ext. 5086**, para reportes y apoyo. Es orientación y atención policial; no asumir que el correo abre una carpeta. La página no publica un listado obligatorio de datos: preparar relato, número, enlaces y evidencia. [Contacto oficial](https://www.ssc.cdmx.gob.mx/organizacion-policial/subsecretaria-de-inteligencia-e-investigacion-policial/policia-cibernetica).
- **Guardia Nacional/CERT-MX:** **088**, confirmado en una publicación de 2026 para orientar sobre la denuncia. **cert-mx@sspc.gob.mx** aparece como receptor de reportes en la campaña oficial; **su recepción efectiva actual no fue comprobada**. No verifiqué un formulario público vigente específico de CERT-MX. [088, publicación de 2026](https://www.gob.mx/gncertmx/articulos/en-caso-de-ser-victima-de-algun-ciberdelito-llama-al-088-atencion-ciudadana), [correo publicado](https://www.gob.mx/profeco/articulos/campana-nacional-antifraude-cibernetico-260577?idiom=es).
- **Directorio estatal:** la SSPC remite a su [Ciberguía](https://www.gob.mx/sspc/documentos/ciberguia?idioma=es), que contiene unidades por entidad. **No comprobé individualmente los 32 contactos.** [Referencia oficial de 2026 al directorio](https://www.gob.mx/sspc/prensa/sspc-emite-recomendaciones-para-prevenir-fraudes-en-inversiones-y-plataformas-financieras-irregulares).
- **089:** denuncia anónima para canalización e investigación, especialmente útil ante extorsión. No solicita nombre ni datos personales del denunciante. **No debe presentarse como sustituto automático de la querella de la víctima.** [SSPC: funcionamiento](https://www.gob.mx/sspc/prensa/sesnsp-lanza-campana-de-difusion-del-numero-nacional-de-denuncia-anonima-089?idiom=es).

Para el **089**, conviene decir qué ocurrió, dónde, cuándo, número que contactó, cantidad exigida y entregada, banco/cuenta de depósito y modalidad. Estos datos aparecen en el formulario oficial de fraude/extorsión de Sonora; **no verifiqué un cuestionario telefónico nacional idéntico para todos los estados**. [Ejemplo oficial de datos recabados](https://089.sspsonora.gob.mx/denunciaextorsion).

**SAT, PROFECO y Bienestar**

- **SAT:** reporta correos sospechosos a **denuncias@sat.gob.mx**. El [Buscador de correos falsos](https://www.sat.gob.mx/minisitio/BuscadorCorreosFalsos/buscador.html) permite consultar el remitente y dirige a ese correo para reportarlo. **No publica ahí un formato obligatorio:** incluir remitente, mensaje y enlace es una recomendación práctica. El [portal de quejas y denuncias](https://www.sat.gob.mx/portal/public/tramites/quejas-o-denuncias) también publica el **55 8852 2222**; no verifiqué un formulario distinto exclusivo para toda suplantación del SAT. Reportar al SAT no equivale a denunciar penalmente el fraude.
- **PROFECO:** [Concilianet](https://concilianet.profeco.gob.mx/Concilianet/) es una **reclamación de consumo** para proveedores participantes. Pide registro, identificación por ambos lados, recibo/factura, contrato o garantía y documentos que acrediten la compra. Que el proveedor sea identificable no basta: debe participar en el sistema; de lo contrario, acudir a ODECO o solicitar orientación en **asesoria@profeco.gob.mx**. [Requisitos](https://concilianet.profeco.gob.mx/Concilianet/requisitos.jsp), [alcance y alternativas](https://www.gob.mx/profeco/documentos/tuviste-algun-problema-de-consumo?state=published).
- **Bienestar:** **800 639 4264** es el canal verificado para consultar programas y recibir orientación frente a ofertas falsas. La dependencia lo incluye en su alerta de fraude. Para atención de beneficiarios recomienda tener INE y CURP. **No verifiqué un formulario o correo vigente dedicado exclusivamente a denunciar falsos programas**, ni que la línea abra denuncias penales. [Alerta oficial](https://www.gob.mx/bienestar/prensa/bienestar-no-entrega-prestamos-ni-creditos-a-cuenta-de-los-programas-del-bienestar?idiom=es), [datos para atención](https://www.gob.mx/bienestar/prensa/linea-de-bienestar-suma-mas-de-un-millon-de-llamadas-atendidas?idiom=es).

**WhatsApp y Facebook/Marketplace**

- **WhatsApp, verificado:** abrir chat → tocar nombre o número → **Reportar** → confirmar; se puede añadir bloqueo. WhatsApp recibe hasta los cinco últimos mensajes y datos asociados. Guarda antes la evidencia. [Centro de ayuda oficial](https://faq.whatsapp.com/1142481766359885/).
- **Facebook/Marketplace, verificación parcial:** el centro oficial incluye la opción de reportar vendedores, pero el artículo detallado redirigió a inicio de sesión. **No pude verificar directamente en Meta la secuencia actual de botones para cuenta, vendedor o anuncio.** Para la app, dejar provisionalmente: abrir perfil o publicación → menú de opciones → buscar “Reportar” y seguir las indicaciones, **marcado como recorrido pendiente de validar**. [Centro oficial de seguridad en compras](https://www.facebook.com/help/123884166448529/), [artículo de Marketplace que exigió sesión](https://www.facebook.com/help/1713241952104830).

**Números y SMS fraudulentos**

**No pude verificar un canal nacional de CRT/IFT equivalente a reenviar SMS al 7726**, ni un formulario universal que permita a cualquier persona solicitar la baja de un número por fraude. No debe publicarse “no existe” como hecho demostrado.

Sí hay rutas oficiales para comunicar el incidente: Policía Cibernética, 088 y el Portal de Fraudes Financieros cuando sea financiero. Telcel publica **\*111 y \*264** como atención para verificar promociones, pero **no los confirmé como una ventanilla especializada para denunciar números ajenos**. [Telcel: avisos de seguridad](https://www.telcel.com/personas/politicas-y-codigos/avisos-de-seguridad).

Además, el sitio del IFT advierte que es **archivo histórico** y remite los trámites vigentes a la CRT; no conviene incorporar sus antiguos formularios como actuales sin revisión. [Aviso institucional](https://www.ift.org.mx/usuarios-y-audiencias/consulta-de-imei-0).

**3. Evidencia que conviene preparar**

No todos estos elementos son requisitos obligatorios en todas las fiscalías. El artículo 223 del CNPP pide identificación del denunciante —salvo anonimato/reserva—, domicilio, relato circunstanciado y los datos conocidos de responsables y testigos. **No exige que la víctima ya haya identificado al delincuente.** [CNPP, artículo 223](https://congreso.gob.mx/LeyesBiblio/pdf_mov/Codigo_Nacional_de_Procedimientos_Penales.pdf).

| Evidencia o dato | Qué guardar | Fuente oficial |
|---|---|---|
| Relato cronológico | Fecha, hora aproximada, lugar, cómo ocurrió el engaño, qué entregaste y monto perdido. | [Formulario FGR/CEDAC](https://appcedpro.fgr.org.mx/) |
| Identificación y contacto | Identificación oficial, domicilio y medios de contacto; para representación, documentos correspondientes. | [CNPP, art. 223](https://congreso.gob.mx/LeyesBiblio/pdf_mov/Codigo_Nacional_de_Procedimientos_Penales.pdf), [Fiscalía Jalisco](https://fge.jalisco.gob.mx/policia-cibernetica/reporte/denuncia) |
| Conversaciones y capturas | Mensajes, correos, imágenes, conversaciones y URLs completas. | [Campaña oficial antifraude](https://www.gob.mx/profeco/articulos/campana-nacional-antifraude-cibernetico-260577?idiom=es) |
| Número y perfil | Teléfono usado, nombre/alias del perfil, página y enlace. Son datos observados; no asumir identidad real. | [Fiscalía Yucatán](https://fge.yucatan.gob.mx/noticias/recomienda-fge-tomar-medidas-preventivas-en-el-buen-fin-9324), [Fiscalía Jalisco](https://fge.jalisco.gob.mx/policia-cibernetica/reporte/denuncia) |
| Pago | Ticket, comprobante, estado de cuenta, monto, fecha, banco, cuenta/CLABE y CEP si fue SPEI. | [Fiscalía Yucatán](https://fge.yucatan.gob.mx/noticias/recomienda-fge-tomar-medidas-preventivas-en-el-buen-fin-9324), [Banxico: CEP](https://www.banxico.org.mx/servicios/mi-spei_-transferencias-ban.html) |
| Titular beneficiario | Conservar el nombre que efectivamente aparezca en comprobantes o documentos, indicando de dónde se obtuvo. **No verifiqué que sea requisito universal ni que deba conseguirse para denunciar.** | [CNPP: aportar lo que conste al denunciante](https://congreso.gob.mx/LeyesBiblio/pdf_mov/Codigo_Nacional_de_Procedimientos_Penales.pdf) |
| Gestión con banco/proveedor | Folios, aclaración, respuesta, contrato, factura y promesa de entrega. | [CONDUSEF: documentación](https://tramites.condusef.gob.mx/QuejaElectronica/registro.php), [PROFECO: requisitos](https://concilianet.profeco.gob.mx/Concilianet/requisitos.jsp) |

**4. Tabla resumen para la app**

En el catálogo solicitado, `orientación` incluye reportes informativos que **no acreditan por sí mismos una denuncia penal**. Las rutas de predenuncia conservan su limitación en “para qué casos”.

| id | nombre | tipo | canal | destino exacto | para qué casos | fuente |
|---|---|---|---|---|---|---|
| condusef_rut | CONDUSEF RUT | reclamación | formulario | https://rut.condusef.gob.mx/public/ | Queja contra institución financiera; requiere registro/CIC | [CONDUSEF](https://www.condusef.gob.mx/index.php?idc=2793&idcat=3&p=contenido) |
| condusef_queja | Queja Electrónica CONDUSEF | reclamación | formulario | https://tramites.condusef.gob.mx/QuejaElectronica/registro.php | Productos financieros y causas admitidas | [Formulario](https://tramites.condusef.gob.mx/QuejaElectronica/registro.php) |
| condusef_orientacion | Atención CONDUSEF | orientación | teléfono | 55 5340 0999 | Aclaraciones, robo de identidad financiero y canalización | [Directorio](https://www.condusef.gob.mx/uau/) |
| condusef_fraudes | Portal de Fraudes Financieros | orientación | formulario | https://phpapps.condusef.gob.mx/fraudes_financieros/index.php | Reportar teléfonos, perfiles, correos y páginas; funcionamiento no comprobado | [CONDUSEF](https://www.condusef.gob.mx/?idc=360&p=contenido) |
| fgr_cedac | FGR CEDAC | orientación | formulario | https://appcedpro.fgr.org.mx/ | Orientación/canalización; **no abre carpeta por sí solo** | [Aviso del formulario](https://appcedpro.fgr.org.mx/) |
| fgr_correo | Atención FGR | orientación | correo | atencionfgr@fgr.org.mx | Hechos de posible competencia federal | [FGR](https://www.gob.mx/fgr/acciones-y-programas/denuncias-fgr) |
| fgr_telefono | Atención FGR | orientación | teléfono | 800 008 5400 | Orientación y canalización federal | [FGR](https://www.gob.mx/fgr/acciones-y-programas/denuncias-fgr) |
| cdmx_denuncia_digital | Denuncia Digital CDMX | denuncia_penal | formulario | https://denunciadigital.cdmx.gob.mx/ | Fraude y delitos admitidos; sujeto a revisión | [FGJ CDMX](https://fgjcdmx.gob.mx/nuestros-servicios/en-linea) |
| edomex_predenuncia | Predenuncia Edomex | denuncia_penal | formulario | https://fgjem.edomex.gob.mx/pre-denuncia-en-linea | Inicio de ruta penal; formalización y funcionamiento no comprobados | [Gobierno estatal](https://sseguridad.edomex.gob.mx/fraude-extorsion-telefonico) |
| nuevo_leon_video | Video Denuncia Nuevo León | denuncia_penal | formulario | https://denuncia.fiscalia-nl.gob.mx:8443/Bienvenida.html | Acceso a atención con MP por video; admisión actual de fraude no comprobada | [INFONL](https://infonl.mx/denuncia/), [Poder Judicial NL](https://www.pjenl.gob.mx/ViolenciaDeGenero/Download/Manual-Actuacion-Proteccion-Mujeres-Covid19.pdf) |
| jalisco_cibernetica | Policía Cibernética Jalisco | orientación | correo | policia.cibernetica@jalisco.gob.mx | Orientación sobre fraude digital; denuncia penal en línea no verificada | [Fiscalía Jalisco](https://fiscalia.jalisco.gob.mx/policia-cibernetica/orientacion-y-contacto/) |
| cdmx_cibernetica_correo | Policía Cibernética SSC | orientación | correo | policia.cibernetica@ssc.cdmx.gob.mx | Reportes y apoyo por incidentes digitales | [SSC](https://www.ssc.cdmx.gob.mx/organizacion-policial/subsecretaria-de-inteligencia-e-investigacion-policial/policia-cibernetica) |
| cdmx_cibernetica_telefono | Policía Cibernética SSC | orientación | teléfono | 55 5242 5100 ext. 5086 | Reportes y apoyo por incidentes digitales | [SSC](https://www.ssc.cdmx.gob.mx/organizacion-policial/subsecretaria-de-inteligencia-e-investigacion-policial/policia-cibernetica) |
| guardia_nacional_088 | Guardia Nacional | orientación | teléfono | 088 | Ciberdelitos y orientación para denunciar | [GN, 2026](https://www.gob.mx/gncertmx/articulos/en-caso-de-ser-victima-de-algun-ciberdelito-llama-al-088-atencion-ciudadana) |
| cert_mx_correo | CERT-MX | orientación | correo | cert-mx@sspc.gob.mx | Reportes de ciberdelitos; recepción actual no comprobada | [Campaña oficial](https://www.gob.mx/profeco/articulos/campana-nacional-antifraude-cibernetico-260577?idiom=es) |
| denuncia_anonima_089 | Denuncia anónima | orientación | teléfono | 089 | Información delictiva y extorsión; canalización anónima | [SSPC](https://www.gob.mx/sspc/prensa/sesnsp-lanza-campana-de-difusion-del-numero-nacional-de-denuncia-anonima-089?idiom=es) |
| sat_correos_falsos | SAT: correos falsos | orientación | correo | denuncias@sat.gob.mx | Correos que suplantan al SAT | [Buscador SAT](https://www.sat.gob.mx/minisitio/BuscadorCorreosFalsos/buscador.html) |
| sat_denuncias_telefono | SAT: quejas y denuncias | orientación | teléfono | 55 8852 2222 | Canal general; alcance específico para suplantación por confirmar | [SAT](https://www.sat.gob.mx/portal/public/tramites/quejas-o-denuncias) |
| profeco_concilianet | PROFECO Concilianet | reclamación | formulario | https://concilianet.profeco.gob.mx/Concilianet/ | Compras con proveedores participantes | [Requisitos](https://concilianet.profeco.gob.mx/Concilianet/requisitos.jsp) |
| profeco_asesoria | PROFECO asesoría | orientación | correo | asesoria@profeco.gob.mx | Canalización de problemas de consumo | [PROFECO](https://www.gob.mx/profeco/documentos/tuviste-algun-problema-de-consumo?state=published) |
| bienestar_linea | Línea de Bienestar | orientación | teléfono | 800 639 4264 | Verificar ofertas y programas; no es denuncia penal | [Bienestar](https://www.gob.mx/bienestar/prensa/bienestar-no-entrega-prestamos-ni-creditos-a-cuenta-de-los-programas-del-bienestar?idiom=es) |
| whatsapp_reportar | Reportar en WhatsApp | reporte_plataforma | en_app | Chat → nombre/número → Reportar | Cuenta o mensajes fraudulentos | [WhatsApp](https://faq.whatsapp.com/1142481766359885/) |
| facebook_reportar | Reportar Facebook/Marketplace | reporte_plataforma | en_app | Perfil/publicación → opciones → Reportar; **recorrido pendiente de validar** | Perfiles, vendedores y anuncios sospechosos | [Ayuda oficial; acceso limitado](https://www.facebook.com/help/1713241952104830) |
| telcel_consulta | Telcel: verificar promociones | orientación | teléfono | *111 / *264 | Consultar mensajes que aparenten ser promociones Telcel; no canal especializado verificado | [Telcel](https://www.telcel.com/personas/politicas-y-codigos/avisos-de-seguridad) |