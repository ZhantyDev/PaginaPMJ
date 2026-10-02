# Contexto del proyecto PMJ Itagüí

## 1. Resumen ejecutivo
Este proyecto es una landing page / SPA (Single Page Application) estática para la Plataforma Municipal de Juventudes de Itagüí. Su objetivo es presentar información institucional, eventos, estructura, directorio de colectivos y procesos de participación juvenil.

La web está diseñada para ser ligera, fácil de mantener y desplegar sin backend ni dependencias complejas. Está construida con HTML, CSS y JavaScript puro, y usa una navegación por hash para simular rutas de una SPA.

## 2. Objetivo funcional
El sitio busca:
- informar a jóvenes y ciudadanía sobre la PMJ;
- presentar eventos y actividades locales;
- explicar la estructura y normativa de la plataforma;
- catalogar colectivos juveniles del municipio;
- permitir la inscripción o contacto a través de un formulario;
- reforzar la identidad institucional de la Alcaldía de Itagüí.

## 3. Estado técnico actual
### Stack
- HTML5
- CSS3
- JavaScript vanilla
- JSON para datos estructurados
- Sin Node.js
- Sin framework
- Sin build tooling
- Sin base de datos
- Sin backend real

### Tipo de proyecto
- Sitio estático
- SPA de una sola página
- Navegación con hash (#inicio, #acerca, #directorio, #tramites)
- Renderizado dinámico desde JavaScript

## 4. Arquitectura del proyecto

### Archivos principales
- index.html: estructura base de la página
- css/styles.css: estilos visuales, responsive y accesibilidad
- js/data.js: contenido y datos del sitio
- js/views.js: plantillas HTML de cada vista
- js/router.js: lógica de rutas, render, interacción y navegación
- data/colectivos.json: listado de colectivos juveniles
- README.md: documentación básica del proyecto
- assets/: carpeta reservada para imágenes, logos u otros recursos

## 5. Qué hace cada archivo

### index.html
Define la estructura global:
- barra de accesibilidad
- cabecera principal
- navegación
- banner superior
- breadcrumb
- contenedor principal donde se inyecta contenido
- footer
- botón de volver arriba
- carga de scripts:
  - js/data.js
  - js/views.js
  - js/router.js

### css/styles.css
Contiene los estilos del sitio:
- esquema cromático institucional
- tipografía Work Sans
- layout general
- cards, tablas, formularios, banner, nav, footer
- menú móvil
- estilos de accesibilidad (alto contraste, ajuste de tamaño de fuente)
- responsive design

### js/data.js
Es la fuente de contenido principal. Aquí se definen:
- título y descripción global
- eventos
- mesa directiva
- comparativa PMJ vs CMJ
- pasos de trámites
- categorías de colectivos
- lista inicial de colectivos

Este archivo actúa como un "modelo de datos" del sitio.

### js/views.js
Define funciones que devuelven HTML para cada vista:
- inicio
- acerca
- directorio
- tramites

Cada vista monta contenido usando datos desde window.DATA.

### js/router.js
Es el centro de la lógica interactiva:
- identifica la ruta actual desde el hash
- renderiza la vista correcta
- actualiza el banner y breadcrumb
- activa los enlaces del menú
- gestiona menú móvil
- controla accesibilidad
- controla scroll hacia arriba
- inicializa listeners según la vista activa
- carga y filtra los colectivos desde data/colectivos.json
- maneja el envío del formulario de inscripción

### data/colectivos.json
Archivo estructurado con la colección de colectivos juveniles, incluyendo:
- nombre
- categoría
- descripción
- contacto
- sitio web

## 6. Cómo funciona la lógica

### Navegación
El flujo principal es:
1. `window.location.hash` determina la ruta actual.
2. El router llama la función de vista correspondiente.
3. El contenido HTML se inserta en `#view-container`.
4. Se actualiza banner, breadcrumb y estado activo del menú.

### Renderizado
Las vistas se construyen con strings de HTML y luego se insertan con `innerHTML`.

### Directorio de colectivos
Cuando se entra a la vista `directorio`:
- se leen los colectivos desde `fetch('data/colectivos.json')`
- se guardan en `colectivosCache`
- se aplican filtros por:
  - búsqueda por texto
  - categoría
- se renderizan tarjetas con información de cada colectivo

### Formulario de inscripción
En la vista `tramites`:
- se escucha el evento submit
- se previene el comportamiento por defecto
- se lee nombre, correo, colectivo y motivo
- se muestra un `alert()` con el mensaje final
- se reinicia el formulario

Esto funciona como simulación de envío; no hay conexión real con backend.

## 7. Mapa de contenido actual
### Secciones visibles
- Inicio
  - resumen institucional
  - próximos eventos
- Acerca de
  - marco legal
  - mesa directiva
  - comparación PMJ vs CMJ
- Directorio de colectivos
  - filtro por categoría
  - caja de búsqueda
  - tarjetas de colectivos
- Trámites / Únete
  - pasos para vincularse
  - formulario

### Contenido institucional principal
- Plataforma Municipal de Juventudes de Itagüí
- Participación juvenil
- Política pública local
- liderazgo
- cultura
- servicios
- formación comunitaria

## 8. Fortalezas del proyecto actual
- estructura clara y entendible
- fácil de mantener
- sin herramientas pesadas
- muy adecuado como prototipo o versión inicial
- usa datos centralizados y reutilizables
- buena base para un sitio institucional de gestión pública
- cuenta con accesibilidad básica y diseño responsive

## 9. Limitaciones y riesgos
- no tiene backend real ni persistencia de datos
- el formulario no envía información a un servicio externo
- los correos y sitios web de colectivos son ejemplos ficticios
- la información puede quedar desactualizada si no se mantiene
- no hay validación avanzada ni manejo de errores profesional
- no hay pruebas automatizadas ni calidad de código formalizada
- no hay definición clara de administración de contenidos

## 10. Ajustes recomendados para mejorar el proyecto

### Ajuste 1: Reestructurar la fuente de verdad de contenido
Objetivo: centralizar mejor la información.
Recomendación:
- mantener `js/data.js` como contenido base inicial
- definir un esquema más estricto de datos
- hacer que los textos sean reutilizables para otras páginas o CMS futuro

### Ajuste 2: Sustituir alert() por flujo real de formulario
Objetivo: convertir la inscripción en una acción real.
Opciones:
- Formspree
- Web3Forms
- backend propio con Node/Express
- Google Forms con redirección o webhook

### Ajuste 3: Separar datos del render
Objetivo: reducir acoplamiento.
Recomendación:
- que `views.js` permanezca solo como generador visual
- que `data.js` sea estrictamente datos
- evitar mezclar lógica de negocio con templating

### Ajuste 4: Mejorar la arquitectura de rutas y navegación
Objetivo: hacer el router más robusto.
Recomendación:
- soportar vista por defecto segura
- manejar rutas inexistentes
- normalizar rutas y prevenir errores
- mantener compatibilidad con navegadores

### Ajuste 5: Mejorar la calidad del contenido institucional
Objetivo: que la web se vea más profesional.
Incluir:
- misión, visión, objetivos
- convocatoria abierta
- noticias y actividades
- contacto institucional
- mapa de ubicación
- enlaces a servicios reales

### Ajuste 6: Añadir componentes más completos
Sugerencias:
- noticias destacadas
- agenda de eventos
- categorías de proyectos
- cards con CTA
- filtro por barrio o tipo de colectivo
- panel de estadísticas

### Ajuste 7: Mejorar la experiencia de administrador y mantenimiento
Recomendación:
- usar JSON más organizado por módulo
- permitir edición desde un archivo central
- preparar el proyecto para migrar a un CMS o framework posterior

## 11. Observación clave para Claude
El proyecto está bien como base conceptual y visual, pero aún es una versión inicial o prototipo. La arquitectura es simple y funcional, pero necesita un ajuste más sólido en contenido, flujo de formularios y mantenimiento para pasar de “demo institucional” a “plataforma operativa y escalable”.

## 12. Instrucción de trabajo sugerida para Claude
Claude debería considerar esta prioridad:
1. revisar la estructura actual y no romper la SPA;
2. mantener el estilo institucional actual;
3. mejorar la organización del contenido y la lógica de render;
4. preparar un plan de ajustes realistas y graduales;
5. priorizar mejoras de valor funcional sobre cambios visuales innecesarios.

## 13. Resumen corto para contexto
Proyecto: sitio web estático de la PMJ Itagüí.
Tecnología: HTML + CSS + JS vanilla.
Objetivo: informar, promocionar y facilitar participación juvenil.
Arquitectura: una sola página con vistas dinámicas.
Punto fuerte: claridad y rapidez de implementación.
Punto débil: falta de backend, contenido más completo y flujo de inscripción real.

## 14. Recomendación final
El proyecto no necesita reescribirse desde cero. Lo más sano es mantener la base actual y aplicar ajustes de contenido y arquitectura para convertirlo en una plataforma más profesional, mantenible y útil para la administración pública.
