// Scripts específicos para la página de entrada-plantilla
document.addEventListener('DOMContentLoaded', function() {
  // Animación suave al hacer scroll a los enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Lazy loading para imágenes
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // Animación de aparición para elementos
  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  });

  document.querySelectorAll('.widget, .entrada-contenido > *').forEach(el => {
    animateOnScroll.observe(el);
  });

  // Manejar enlaces activos en la tabla de contenidos
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.tabla-contenidos a[href="#${id}"]`);
      
      if (entry.isIntersecting) {
        document.querySelectorAll('.tabla-contenidos a').forEach(a => a.classList.remove('active'));
        if (link) link.classList.add('active');
      }
    });
  }, {
    threshold: 0.5
  });

  // Observar todas las secciones
  document.querySelectorAll('h2[id], h3[id]').forEach(section => {
    observer.observe(section);
  });
}); 