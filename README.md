# PMJ Itagüí

Proyecto estático para la Plataforma Municipal de Juventudes de Itagüí. Está diseñado como Single Page Application (SPA) con HTML, CSS y JavaScript puros.

## Estructura

- `index.html` — página única con el layout general.
- `css/styles.css` — estilos, paleta institucional y diseño responsive.
- `js/data.js` — datos de ejemplo usados en varias vistas.
- `js/views.js` — funciones que devuelven el HTML de cada vista.
- `js/router.js` — router hash-based + `history.pushState`, listeners y renderizado.
- `data/colectivos.json` — datos del directorio en formato JSON listos para fetch.
- `assets/` — carpeta vacía para logos e imágenes futuras.

## Cómo correr localmente

1. Abra la carpeta `pmj-itagui` en VS Code.
2. Instale la extensión Live Server si no la tiene.
3. Haga clic derecho en `index.html` y seleccione "Open with Live Server".

> El proyecto no necesita Node ni herramientas de compilación. Solo se sirve como archivos estáticos.

## Cómo desplegar en GitHub Pages

1. Cree un repositorio en GitHub y suba la carpeta `pmj-itagui`.
2. En GitHub, vaya a "Settings" > "Pages".
3. Seleccione la rama principal (`main` o `master`) y la carpeta `/root`.
4. Guarde los cambios.
5. GitHub Pages publicará la aplicación y mostrará la URL.

## Notas de mantenimiento

- `data.js` contiene la fuente única de verdad para eventos, mesa directiva, tabla comparativa y pasos de trámite.
- `js/router.js` carga `data/colectivos.json` mediante `fetch()` para el Directorio de Colectivos.
- Para conectar un formulario real, puede reemplazar la lógica de `alert()` en `js/router.js` por un `fetch()` a Formspree o Web3Forms.
