// Aquí van los scripts globales compartidos entre todas las páginas. 

// Cargar header.html y marcar el enlace activo
document.addEventListener('DOMContentLoaded', function() {
  // Header
  fetch('../assets/header.html')
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML('afterbegin', html);
      // Marcar el enlace activo según la página o hash
      const path = window.location.pathname;
      const hash = window.location.hash;
      let navKey = '';
      if (path.includes('/index/')) navKey = 'inicio';
      else if (path.includes('/blog/')) navKey = 'blog';
      else if (path.includes('/nosotros/')) navKey = 'nosotros';
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
              // Si no existe la sección, solo marca el menú
              navLinks.forEach(l => l.classList.remove('active'));
              link.classList.add('active');
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
      });
      // Si el hash cambia a #contacto
      window.addEventListener('hashchange', function() {
        if (window.location.hash === '#contacto') {
          navLinks.forEach(l => l.classList.remove('active'));
          document.querySelector('nav a[data-nav="contacto"]').classList.add('active');
        }
      });
    });

  // Footer
  fetch('../assets/footer.html')
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML('beforeend', html);
    });
}); 