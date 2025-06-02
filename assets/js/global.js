// Aquí van los scripts globales compartidos entre todas las páginas. 

// Cargar header.html y marcar el enlace activo
document.addEventListener('DOMContentLoaded', function() {
  // Header
  fetch('assets/header.html')
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML('afterbegin', html);
      // Marcar el enlace activo según la página o hash
      const path = window.location.pathname;
      const hash = window.location.hash;
      let navKey = '';
      if (path.endsWith('/index.html') || path === '/' || path === '/index.html') navKey = 'inicio';
      else if (path.endsWith('/blog.html')) navKey = 'blog';
      else if (path.endsWith('/nosotros.html')) navKey = 'nosotros';
      else if (hash === '#contacto') navKey = 'contacto';
      // Marcar contacto/inicio si se hace clic
      const navLinks = document.querySelectorAll('nav a[data-nav]');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-nav') === navKey) {
          link.classList.add('active');
        }
        // Scroll suave a contacto
        if (link.getAttribute('data-nav') === 'contacto') {
          link.addEventListener('click', function(e) {
            const contacto = document.getElementById('contacto');
            if (contacto) {
              e.preventDefault();
              navLinks.forEach(l => l.classList.remove('active'));
              link.classList.add('active');
              contacto.scrollIntoView({ behavior: 'smooth' });
              history.replaceState(null, '', '#contacto');
            } else {
              // Si no existe la sección, redirige a index.html con hash
              e.preventDefault();
              window.location.href = 'index.html#contacto';
            }
          });
        }
        // Scroll suave a inicio
        if (link.getAttribute('data-nav') === 'inicio') {
          link.addEventListener('click', function(e) {
            if (window.location.pathname.includes('/index/')) {
              e.preventDefault();
              navLinks.forEach(l => l.classList.remove('active'));
              link.classList.add('active');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              history.replaceState(null, '', '/index/index.html');
            }
          });
        }
        // Scroll suave a servicios
        if (link.getAttribute('data-nav') === 'servicios') {
          link.addEventListener('click', function(e) {
            const servicios = document.getElementById('servicios');
            if (servicios) {
              e.preventDefault();
              navLinks.forEach(l => l.classList.remove('active'));
              link.classList.add('active');
              servicios.scrollIntoView({ behavior: 'smooth' });
              history.replaceState(null, '', '#servicios');
            } else {
              // Si no existe la sección, redirige a index.html con hash
              e.preventDefault();
              window.location.href = 'index.html#servicios';
            }
          });
        }
      });
      // Si el hash cambia a #contacto o #servicios
      window.addEventListener('hashchange', function() {
        if (window.location.hash === '#contacto') {
          const contacto = document.getElementById('contacto');
          if (contacto) contacto.scrollIntoView({ behavior: 'smooth' });
          navLinks.forEach(l => l.classList.remove('active'));
          document.querySelector('nav a[data-nav="contacto"]').classList.add('active');
        }
        if (window.location.hash === '#servicios') {
          const servicios = document.getElementById('servicios');
          if (servicios) servicios.scrollIntoView({ behavior: 'smooth' });
          navLinks.forEach(l => l.classList.remove('active'));
          document.querySelector('nav a[data-nav="servicios"]').classList.add('active');
        }
      });
      // Lógica menú hamburguesa (debe ir aquí para que funcione tras cargar el header)
      const menuToggle = document.querySelector('.menu-toggle');
      const nav = document.getElementById('main-nav');
      const overlay = document.querySelector('.menu-overlay');
      
      if (menuToggle && nav && overlay) {
        menuToggle.addEventListener('click', function() {
          const isOpen = nav.classList.toggle('open');
          overlay.classList.toggle('active');
          menuToggle.setAttribute('aria-expanded', isOpen);
        });

        // Cerrar menú al hacer clic en el overlay
        overlay.addEventListener('click', function() {
          nav.classList.remove('open');
          overlay.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', false);
        });

        // Cerrar menú al hacer clic en un enlace
        nav.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', function() {
            nav.classList.remove('open');
            overlay.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', false);
          });
        });
      }
    });

  // Footer
  fetch('assets/footer.html')
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML('beforeend', html);
    });
}); 