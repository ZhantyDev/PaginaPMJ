window.DATA = {
  title: 'Plataforma Municipal de Juventudes',
  subtitle: 'Itagüí, Antioquia',
  description: 'La PMJ promueve la participación, el liderazgo y el tejido social de jóvenes en Itagüí.',
  eventos: [
    {
      nombre: 'Sesión PMJ',
      fecha: 'Sábado 3 de octubre, 3:30 p. m.',
      lugar: 'Casa de las Juventudes - Cra. 48 #85-10, San Fernando, Itagüí, Antioquia',
      resumen: 'Sesión de la Plataforma Municipal de Juventudes. Información oficial publicada en @pmj_itagui.'
    }
  ],
  // Mesa directiva confirmada por la PMJ. El cargo de Santiago Gaviria está pendiente de confirmar.
  // Los teléfonos son PLACEHOLDER — reemplazar por los números reales antes de publicar.
  mesaDirectiva: [
    { cargo: 'Coordinadora', nombre: 'Sammy García', telefono: '+57 300 000 0001' },
    { cargo: 'Coordinadora Auxiliar', nombre: 'Emily Urrego', telefono: '+57 300 000 0002' },
    { cargo: 'Por confirmar', nombre: 'Santiago Gaviria', telefono: '+57 300 000 0003' }
  ],
  comparativa: [
    {
      criterio: 'Ámbito de representación',
      pmj: 'Juventud local, política pública y representación especializada',
      cmj: 'Juventud nacional con enfoque consultivo y de políticas generales'
    },
    {
      criterio: 'Alcance de acciones',
      pmj: 'Proyectos municipales y formación comunitaria',
      cmj: 'Estrategias nacionales y coordinación entre departamentos'
    },
    {
      criterio: 'Responsabilidad legal',
      pmj: 'Desarrollo de iniciativas en el municipio de Itagüí',
      cmj: 'Gestión de políticas públicas a nivel nacional'
    }
  ],
  pasosTramites: [
    'Revisar los requisitos básicos de la PMJ y su carta de principios.',
    'Completar el formulario de inscripción con datos de contacto y perfil.',
    'Adjuntar documentos de identificación o respaldo de colectivo.',
    'Esperar confirmación de la Secretaría de Juventudes y recibir seguimiento.'
  ],
  categorias: ['Arte', 'Tecnología', 'Ambiente', 'Deporte'],
  colectivos: [
    {
      nombre: 'Colectivo Semillas',
      categoria: 'Ambiente',
      descripcion: 'Promueve la siembra urbana y la cultura ambiental en barrios de Itagüí.',
      contacto: 'semillas@itagui.gov.co',
      web: 'https://example.com/semillas'
    },
    {
      nombre: 'Laboratorio Joven',
      categoria: 'Tecnología',
      descripcion: 'Impulsa talleres de programación, electrónica y emprendimiento digital.',
      contacto: 'labjoven@itagui.gov.co',
      web: 'https://example.com/laboratorio-joven'
    },
    {
      nombre: 'Movimiento ArteMente',
      categoria: 'Arte',
      descripcion: 'Fomenta expresiones artísticas colectivas y proyectos culturales juveniles.',
      contacto: 'artemente@itagui.gov.co',
      web: 'https://example.com/artemente'
    },
    {
      nombre: 'Deportistas Itagüí',
      categoria: 'Deporte',
      descripcion: 'Red de jóvenes que promueven actividad física y hábitos saludables.',
      contacto: 'deporte@itagui.gov.co',
      web: 'https://example.com/deportistas'
    },
    {
      nombre: 'Jóvenes Innovadores',
      categoria: 'Tecnología',
      descripcion: 'Espacio para el desarrollo de proyectos de innovación social y tecnológica.',
      contacto: 'innovadores@itagui.gov.co',
      web: 'https://example.com/innovadores'
    },
    {
      nombre: 'Cultura Viva',
      categoria: 'Arte',
      descripcion: 'Crea escenarios para jóvenes creadores y agrupaciones culturales.',
      contacto: 'culturaviva@itagui.gov.co',
      web: 'https://example.com/culturaviva'
    },
    {
      nombre: 'Guardianes Verdes',
      categoria: 'Ambiente',
      descripcion: 'Actividades de limpieza, reciclaje y educación ambiental en la ciudad.',
      contacto: 'guardianes@itagui.gov.co',
      web: 'https://example.com/guardianes'
    },
    {
      nombre: 'Entrenamiento Juvenil',
      categoria: 'Deporte',
      descripcion: 'Promueve competencias y formación deportiva en comunidades juveniles.',
      contacto: 'entrenamiento@itagui.gov.co',
      web: 'https://example.com/entrenamiento'
    }
  ],
  
  contacto: {
    instagram: 'https://www.instagram.com/pmj_itagui/',
    instagramHandle: '@pmj_itagui',
    direccion: 'Casa de las Juventudes - Cra. 48 #85-10, San Fernando, Itagüí, Antioquia',
    nota: 'El contacto oficial de la PMJ es a través de esta página y de Instagram.'
  }
};

// Se elige un integrante de la mesa directiva al azar en cada carga completa
// de la página (no en cada cambio de vista dentro de la SPA). Recargar el
// navegador vuelve a ejecutar este script y por lo tanto vuelve a sortear.
window.CONTACTO_ALEATORIO = window.DATA.mesaDirectiva[
  Math.floor(Math.random() * window.DATA.mesaDirectiva.length)
];

