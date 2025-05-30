// Carousel functionality
let currentSlideIndex = 0;
const totalSlides = 5;
let autoSlideInterval;

function showSlide(index) {
  const container = document.querySelector('.carousel-images');
  const indicators = document.querySelectorAll('.indicator');
  
  // Update slide position
  container.style.transform = `translateX(-${index * 20}%)`;
  
  // Update indicators
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle('active', i === index);
  });
  
  currentSlideIndex = index;
}

function nextSlide() {
  const nextIndex = (currentSlideIndex + 1) % totalSlides;
  showSlide(nextIndex);
}

function previousSlide() {
  const prevIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
  showSlide(prevIndex);
}

function currentSlide(index) {
  showSlide(index);
  resetAutoSlide();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', function() {
  showSlide(0);
  startAutoSlide();
  
  // Pause auto-slide on hover
  const carousel = document.querySelector('.hero-carousel');
  carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
  carousel.addEventListener('mouseleave', startAutoSlide);
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowLeft') previousSlide();
  if (e.key === 'ArrowRight') nextSlide();
});

// Touch/swipe support for mobile
let startX = 0;
let endX = 0;

document.querySelector('.hero-carousel').addEventListener('touchstart', function(e) {
  startX = e.touches[0].clientX;
});

document.querySelector('.hero-carousel').addEventListener('touchend', function(e) {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const threshold = 50;
  const diff = startX - endX;
  
  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      nextSlide(); // Swipe left, go to next
    } else {
      previousSlide(); // Swipe right, go to previous
    }
    resetAutoSlide();
  }
}

// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form data
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };

  // Here you would typically send the form data to your server
  // For now, we'll just log it and show a success message
  console.log('Form submitted:', formData);
  
  // Show success message
  alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
  
  // Reset form
  this.reset();
}); 