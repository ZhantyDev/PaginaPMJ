window.views = {
  inicio: function () {
    const eventos = window.DATA.eventos.map(evento => `
      <article class="card">
        <h3>${evento.nombre}</h3>
        <p class="meta"><strong>Fecha:</strong> ${evento.fecha} · <strong>Lugar:</strong> ${evento.lugar}</p>
        <p>${evento.resumen}</p>
      </article>
    `).join('');
    const contacto = window.CONTACTO_ALEATORIO;
    const telLimpio = contacto.telefono.replace(/[^\d+]/g, '');

    return `
      <section class="section-block">
        <h2>Resumen de la Plataforma Municipal de Juventudes</h2>
        <p>${window.DATA.description}</p>
      </section>
      <section class="section-block">
        <h2>Próximos eventos</h2>
        <div class="card-grid">${eventos}</div>
      </section>
      <section class="section-block">
        <h2>¿Nos escribes? Hoy te atiende:</h2>
        <p>Cada vez que recargas esta página, se elige al azar un integrante de la mesa directiva para mostrarte su contacto directo.</p>
        <div class="card">
          <h3>${contacto.nombre}</h3>
          <p class="meta"><span class="highlight">${contacto.cargo}</span></p>
          <p><strong>Teléfono:</strong> <a href="tel:${telLimpio}">${contacto.telefono}</a></p>
          <p><strong>WhatsApp:</strong> <a href="https://wa.me/${telLimpio.replace('+', '')}" target="_blank" rel="noreferrer">Escribir por WhatsApp</a></p>
        </div>
        <p class="meta">También puedes escribirnos por Instagram: <a href="${window.DATA.contacto.instagram}" target="_blank" rel="noreferrer">${window.DATA.contacto.instagramHandle}</a></p>
      </section>
    `;
  },

  acerca: function () {
    const directiva = window.DATA.mesaDirectiva.map(miembro => `
      <li><strong>${miembro.cargo}:</strong> ${miembro.nombre}</li>
    `).join('');
    const cargoPendiente = window.DATA.mesaDirectiva.some(m => m.cargo === 'Por confirmar')
      ? '<p class="meta">El cargo de uno de los integrantes está pendiente de confirmación oficial.</p>'
      : '';

    const filas = window.DATA.comparativa.map(item => `
      <tr>
        <td>${item.criterio}</td>
        <td>${item.pmj}</td>
        <td>${item.cmj}</td>
      </tr>
    `).join('');

    return `
      <section class="section-block">
        <h2>Marco legal</h2>
        <p>La PMJ de Itagüí se enmarca en las normas que reconocen la participación juvenil en Colombia:</p>
        <ul>
          <li>Ley 1622 de 2013: reforma política y fortalecimiento de la participación juvenil.</li>
          <li>Ley 1885 de 2018: establece la Política Pública de Juventudes en Colombia.</li>
        </ul>
      </section>
      <section class="section-block">
        <h2>Mesa directiva</h2>
        <ul>${directiva}</ul>
        ${cargoPendiente}
      </section>
      <section class="section-block">
        <h2>Comparativa PMJ vs. CMJ</h2>
        <table>
          <thead>
            <tr>
              <th>Criterio</th>
              <th>PMJ</th>
              <th>CMJ</th>
            </tr>
          </thead>
          <tbody>${filas}</tbody>
        </table>
      </section>
    `;
  },

  directorio: function () {
    const opciones = window.DATA.categorias.map(categoria => `
      <option value="${categoria}">${categoria}</option>
    `).join('');

    return `
      <section class="section-block">
        <h2>Directorio de colectivos</h2>
        <p>Use el buscador y el filtro por categoría para encontrar colectivos juveniles activos en Itagüí.</p>
        <div class="form-field">
          <label for="search-colectivo">Buscar colectivo</label>
          <input id="search-colectivo" type="search" placeholder="Nombre, categoría, palabra clave" />
        </div>
        <div class="form-field">
          <label for="filter-categoria">Filtrar por categoría</label>
          <select id="filter-categoria">
            <option value="">Todas</option>
            ${opciones}
          </select>
        </div>
      </section>
      <section id="colectivos-list" class="section-block">
        <h2>Resultados</h2>
        <div id="colectivos-cards" class="card-grid"></div>
        <p id="colectivos-empty-note" class="meta" style="display:none">
          Aún no contamos con un directorio oficial de colectivos. Si representas uno,
          puedes <a href="#tramites">inscribirlo aquí</a>.
        </p>
      </section>
    `;
  },

  tramites: function () {
    const pasos = window.DATA.pasosTramites.map(paso => `
      <li>${paso}</li>
    `).join('');

    return `
      <section class="section-block">
        <h2>Trámites y unión</h2>
        <p>Estos son los pasos principales para vincularse a la PMJ o presentar un proyecto colectivo.</p>
        <ol>${pasos}</ol>
      </section>
      <section class="section-block">
        <h2>Formulario de inscripción</h2>
        <p>Complete el formulario para que la PMJ se comunique con usted o su colectivo.</p>
        <form id="inscripcion-form">
          <div class="form-field">
            <label for="nombre">Nombre completo</label>
            <input id="nombre" name="nombre" type="text" required minlength="3" />
          </div>
          <div class="form-field">
            <label for="correo">Correo electrónico</label>
            <input id="correo" name="correo" type="email" required />
          </div>
          <div class="form-field">
            <label for="colectivo">Colectivo o grupo (opcional)</label>
            <input id="colectivo" name="colectivo" type="text" />
          </div>
          <div class="form-field">
            <label for="motivo">¿Por qué desea unirse?</label>
            <textarea id="motivo" name="motivo" required minlength="10"></textarea>
          </div>
          <button class="primary" type="submit" id="submit-inscripcion">Enviar inscripción</button>
          <p id="form-status" class="meta" role="status" aria-live="polite"></p>
        </form>
      </section>
    `;
  }
};
