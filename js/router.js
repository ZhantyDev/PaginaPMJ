// Router hash-based que mantiene la aplicación como SPA sin recargar la página.
const viewContainer = document.getElementById('view-container');
const breadcrumbList = document.getElementById('breadcrumb-list');
const bannerCategory = document.getElementById('banner-category');
const bannerTitle = document.getElementById('banner-title');
const bannerDescription = document.getElementById('banner-description');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mainNav = document.getElementById('main-nav');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopButton = document.getElementById('scroll-top');
let colectivosCache = [];

const routes = {
  inicio: window.views.inicio,
  acerca: window.views.acerca,
  directorio: window.views.directorio,
  tramites: window.views.tramites
};

const VALID_ROUTES = ['inicio', 'acerca', 'directorio', 'tramites'];
const DEFAULT_ROUTE = 'inicio';

function currentRoute() {
  // Normaliza el hash: sin '#', sin espacios, en minúsculas.
  const raw = window.location.hash.replace('#', '').trim().toLowerCase();
  if (!raw) return DEFAULT_ROUTE;
  if (!VALID_ROUTES.includes(raw)) {
    // Ruta inexistente (p. ej. '#loquesea' o un hash mal escrito):
    // se corrige la URL para que coincida con lo que realmente se muestra,
    // en vez de dejar un hash inválido en la barra de direcciones.
    history.replaceState({ route: DEFAULT_ROUTE }, '', `#${DEFAULT_ROUTE}`);
    return DEFAULT_ROUTE;
  }
  return raw;
}

function updateBreadcrumb(route) {
  const labels = {
    inicio: 'Inicio',
    acerca: 'Acerca',
    directorio: 'Directorio',
    tramites: 'Trámites / Únete'
  };
  const label = labels[route] || 'Inicio';
  breadcrumbList.innerHTML = route === 'inicio'
    ? `<li>Inicio</li>`
    : `<li><a href="#inicio">Inicio</a></li><li>${label}</li>`;
}

function updateBanner(route) {
  const bannerData = {
    inicio: {
      category: 'Portal juvenil',
      title: 'Conéctate con la PMJ',
      description: 'Información centralizada sobre eventos, directivos y oportunidades para jóvenes de Itagüí.'
    },
    acerca: {
      category: 'Normativa y estructura',
      title: 'Acerca de la PMJ',
      description: 'Cifras, mesa directiva y el marco legal que sustenta la Plataforma Municipal de Juventudes.'
    },
    directorio: {
      category: 'Colectivos juveniles',
      title: 'Directorio de colectivos',
      description: 'Busque colectivos por categoría, revise su perfil y contacte iniciativas juveniles activas.'
    },
    tramites: {
      category: 'Participación',
      title: 'Trámites y unión',
      description: 'Siga los pasos para inscribirse, presentar proyectos o formar parte de la PMJ.'
    }
  };
  const item = bannerData[route] || bannerData.inicio;
  bannerCategory.textContent = item.category;
  bannerTitle.textContent = item.title;
  bannerDescription.textContent = item.description;
}

function setActiveNav(route) {
  navLinks.forEach(link => {
    const isActive = link.getAttribute('href') === `#${route}`;
    link.classList.toggle('active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function render() {
  const route = currentRoute();
  const viewFunction = routes[route] || routes.inicio;
  viewContainer.innerHTML = viewFunction();
  updateBanner(route);
  updateBreadcrumb(route);
  setActiveNav(route);
  closeMobileMenu();
  initViewListeners(route);

  // En una SPA, cambiar de "ruta" no recarga la página, así que el navegador
  // no mueve el foco ni el scroll por sí solo. Sin esto, un usuario de teclado
  // o de lector de pantalla se queda "parado" donde estaba al hacer clic,
  // en vez de llegar al contenido nuevo.
  window.scrollTo({ top: 0, behavior: 'smooth' });
  viewContainer.focus({ preventScroll: true });
}

function navigate(route) {
  const hash = `#${route}`;
  if (window.location.hash !== hash) {
    history.pushState({ route }, '', hash);
  }
  render();
}

function closeMobileMenu() {
  mainNav.classList.remove('open');
  mobileMenuToggle.setAttribute('aria-expanded', 'false');
}

function toggleMobileMenu() {
  const isOpen = mainNav.classList.toggle('open');
  mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
}

function initAccessibility() {
  const accessibilityBar = document.getElementById('accessibility-bar');
  const accessibilityMenuToggle = document.getElementById('accessibility-menu-toggle');
  const btnContrast = document.getElementById('btn-contrast');
  const btnDecrease = document.getElementById('btn-font-decrease');
  const btnIncrease = document.getElementById('btn-font-increase');
  const btnReset = document.getElementById('btn-font-reset');

  accessibilityMenuToggle.addEventListener('click', () => {
    const isOpen = accessibilityBar.classList.toggle('open');
    accessibilityMenuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  btnContrast.addEventListener('click', () => {
    const isActive = document.body.classList.toggle('high-contrast');
    btnContrast.setAttribute('aria-pressed', String(isActive));
  });

  btnIncrease.addEventListener('click', () => {
    adjustFontSize(1.1);
  });

  btnDecrease.addEventListener('click', () => {
    adjustFontSize(0.9);
  });

  btnReset.addEventListener('click', () => {
    document.documentElement.style.setProperty('--base-font-size', '16px');
    document.body.classList.remove('high-contrast');
    btnContrast.setAttribute('aria-pressed', 'false');
  });
}

function adjustFontSize(factor) {
  const current = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const next = Math.min(20, Math.max(13, current * factor));
  document.documentElement.style.setProperty('--base-font-size', `${next}px`);
}

function initScrollButton() {
  window.addEventListener('scroll', () => {
    scrollTopButton.style.display = window.scrollY > 360 ? 'flex' : 'none';
  });

  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initViewListeners(route) {
  if (route === 'directorio') {
    const searchInput = document.getElementById('search-colectivo');
    const categorySelect = document.getElementById('filter-categoria');

    const searchOptions = {
      term: '',
      categoria: ''
    };

    const renderFilteredList = () => {
      const filtered = colectivosCache.filter(item => {
        const matchCategory = !searchOptions.categoria || item.categoria === searchOptions.categoria;
        const matchTerm = [item.nombre, item.categoria, item.descripcion].some(value =>
          value.toLowerCase().includes(searchOptions.term.toLowerCase())
        );
        return matchCategory && matchTerm;
      });
      displayColectivos(filtered);
    };

    searchInput.addEventListener('input', (event) => {
      searchOptions.term = event.target.value.trim();
      renderFilteredList();
    });

    categorySelect.addEventListener('change', (event) => {
      searchOptions.categoria = event.target.value;
      renderFilteredList();
    });

    loadColectivos().then(() => renderFilteredList());
  }

  if (route === 'tramites') {
    const form = document.getElementById('inscripcion-form');
    const statusMsg = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-inscripcion');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const nombre = form.querySelector('#nombre').value.trim();

      // Solo visual por ahora: no hay envío real a ningún servicio/backend.
      // (Conexión real con Formspree/Web3Forms queda pendiente para más adelante.)
      statusMsg.textContent = `¡Gracias, ${nombre || 'joven'}! Tu solicitud fue registrada. Pronto nos comunicaremos contigo.`;
      statusMsg.classList.add('form-status--success');
      submitBtn.disabled = true;

      form.reset();

      setTimeout(() => {
        statusMsg.textContent = '';
        statusMsg.classList.remove('form-status--success');
        submitBtn.disabled = false;
      }, 4000);
    });
  }
}

async function loadColectivos() {
  try {
    const response = await fetch('data/colectivos.json');
    if (!response.ok) {
      throw new Error('No se pudo leer el archivo de colectivos.');
    }
    colectivosCache = await response.json();
  } catch (error) {
    colectivosCache = window.DATA.colectivos || [];
  }
}

function displayColectivos(colectivos) {
  const container = document.getElementById('colectivos-cards');
  const emptyNote = document.getElementById('colectivos-empty-note');
  if (!container) return;

  if (!colectivosCache.length) {
    container.innerHTML = '';
    if (emptyNote) emptyNote.style.display = 'block';
    return;
  }
  if (emptyNote) emptyNote.style.display = 'none';

  if (!colectivos.length) {
    container.innerHTML = '<p>No se encontraron colectivos con esos criterios.</p>';
    return;
  }

  container.innerHTML = colectivos.map(item => `
    <article class="card">
      <h3>${item.nombre}</h3>
      <p class="meta"><span class="highlight">${item.categoria}</span></p>
      <p>${item.descripcion}</p>
      <p class="meta"><strong>Contacto:</strong> ${item.contacto}</p>
      <p class="meta"><strong>Sitio:</strong> <a href="${item.web}" target="_blank" rel="noreferrer">${item.web}</a></p>
    </article>
  `).join('');
}

function initNavigation() {
  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetRoute = link.getAttribute('href').replace('#', '');
      navigate(targetRoute);
    });
  });

  mobileMenuToggle.addEventListener('click', toggleMobileMenu);
}

function init() {
  initAccessibility();
  initScrollButton();
  initNavigation();
  render();
}

window.addEventListener('DOMContentLoaded', init);
window.addEventListener('popstate', render);
