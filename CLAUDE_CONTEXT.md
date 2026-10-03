# Contexto actual del proyecto PMJ Itagüí

## Resumen
Sitio estático tipo SPA para la Plataforma Municipal de Juventudes de Itagüí. Presenta información institucional, evento, mesa directiva, directorio de colectivos y trámites de participación. Se construye con HTML, CSS y JavaScript vanilla; no usa framework, proceso de compilación, backend ni base de datos.

## Estructura
- `index.html`: estructura general, navegación, skip link, banner, contenido, footer y carga de scripts.
- `css/styles.css`: identidad visual morada, layout responsive, formularios y estados de accesibilidad.
- `js/data.js`: datos institucionales, evento, mesa directiva, comparativa PMJ/CMJ, trámites, colectivos y contacto.
- `js/views.js`: plantillas HTML para `inicio`, `acerca`, `directorio` y `tramites`.
- `js/router.js`: navegación hash, renderizado, filtros y comportamiento interactivo.
- `data/colectivos.json`: registros utilizados por el directorio.
- `README.md`: instrucciones básicas de ejecución y publicación.
- `assets/`: recursos estáticos del proyecto.

## Arquitectura y ejecución
`index.html` carga los scripts en este orden: `js/data.js`, `js/views.js` y `js/router.js`. Las vistas se generan como strings y se insertan en `#view-container` con `innerHTML`.

Las rutas disponibles son `#inicio`, `#acerca`, `#directorio` y `#tramites`. El router normaliza el hash (espacios y mayúsculas), y reemplaza por `#inicio` las rutas inválidas. Al renderizar actualiza el banner, breadcrumb y enlace activo, cierra el menú móvil, inicializa los listeners y desplaza el foco al contenido de la vista.

Se ejecuta como archivos estáticos. Para que `fetch('data/colectivos.json')` funcione, debe servirse por HTTP local (por ejemplo, Live Server) o desde un hosting estático; abrir el HTML como `file://` puede impedir ese fetch.

## Contenido y datos actuales
- **Inicio:** descripción de la PMJ, evento próximo, integrante de la mesa directiva elegido al azar por carga completa, teléfono, enlace de WhatsApp e Instagram.
- **Evento:** “Sesión PMJ”, sábado 3 de octubre a las 3:30 p. m., Casa de las Juventudes, Itagüí.
- **Acerca:** marco legal (leyes 1622 de 2013 y 1885 de 2018), mesa directiva y tabla comparativa PMJ/CMJ.
- **Directorio:** búsqueda de texto y filtro por categoría. Si no hay datos, muestra una nota que permite ir a inscribir un colectivo.
- **Trámites / Únete:** pasos de participación y formulario con nombre, correo, colectivo y motivo.
- **Footer:** identificación institucional, dirección de la Casa de las Juventudes y contacto por Instagram.

### Datos que requieren atención antes de publicar
- Los teléfonos de Sammy García, Emily Urrego y Santiago Gaviria en `js/data.js` son explícitamente placeholders (`+57 300 000 0001` a `0003`); reemplazarlos por números autorizados o no publicar esos contactos.
- Santiago Gaviria aparece con cargo `Por confirmar`; la vista Acerca muestra una nota de confirmación pendiente.
- `data/colectivos.json` contiene ocho registros de ejemplo y `js/data.js` mantiene una copia de respaldo de esos mismos datos. Incluyen URLs `example.com`; no presentarlos como directorio oficial. Sustituir por registros confirmados o vaciar ambas fuentes para que aparezca el estado vacío.
- El evento y los datos de contacto deben verificarse y mantenerse al día.

## Comportamientos del router y formularios
- `currentRoute()` valida y normaliza las rutas; `history.replaceState` corrige hashes no válidos.
- El menú móvil sincroniza `aria-expanded` con su estado abierto/cerrado. El enlace seleccionado recibe `aria-current="page"`.
- Al cambiar de vista, `render()` actualiza el contenido y enfoca `#view-container` (con `tabindex="-1"`), además de mover el scroll al inicio.
- El directorio obtiene primero el JSON y usa `window.DATA.colectivos` como respaldo si falla la carga. Los filtros se aplican en cliente.
- El formulario valida nombre (mínimo 3 caracteres), correo y motivo (mínimo 10 caracteres). Al enviar muestra una confirmación visual por cuatro segundos y restablece los campos. **No envía ni persiste datos**; el texto de confirmación es solo una simulación y debe conectarse a un servicio antes de tratarlo como inscripción recibida.

## Accesibilidad implementada
- Skip link hacia `#main-content` y contenedor de vista enfocable.
- Botón de menú con `aria-label`, `aria-expanded` y `aria-controls` sincronizado.
- Enlace de navegación actual expuesto con `aria-current`.
- Botón de contraste con `aria-pressed`; “Restaurar” restablece tamaño de fuente y desactiva el alto contraste.
- Ajuste de fuente con límites de 13 a 20 px.
- Modo de contraste que conserva la paleta morada, aumenta el peso visual, refuerza bordes/foco y mejora el contraste de textos y enlaces.
- Estado del formulario anunciado con `role="status"` y `aria-live="polite"`.

El CSS incluye breakpoints responsive a 860 px y 640 px. El footer está alineado hacia la izquierda, empieza a 1rem del borde, usa `gap: 0.35rem` y sus párrafos tienen `line-height: 1.4` sin márgenes predeterminados.

## Observaciones técnicas conocidas
- `js/data.js` es una fuente de respaldo para colectivos mientras `data/colectivos.json` es la fuente consultada primero; mantenerlos consistentes o eliminar la duplicación.
- Las vistas interpolan contenido en `innerHTML`. Actualmente los datos son archivos locales controlados; si se incorpora contenido editable por usuarios o un CMS, escapar/sanitizar los valores antes de renderizarlos.
- La regla CSS `.form-status--success` está actualmente dentro de `@media (max-width: 640px)`, por lo que ese estilo específico solo se aplica en pantallas pequeñas. Considerar moverla fuera de esa media query.
- El formulario todavía no tiene envío real, persistencia, panel de administración ni pruebas automatizadas.

## Guía para cambios futuros
Mantener HTML/CSS/JS vanilla y la navegación SPA existente salvo que el cambio requiera lo contrario. Preservar la identidad morada y el diseño responsive. No inventar información institucional ni contactos; verificar los datos con la PMJ. Priorizar el envío real y seguro del formulario, confirmar el directorio oficial de colectivos y mantener accesible el flujo de teclado/lector de pantalla. Hacer cambios puntuales y validar el comportamiento afectado.
