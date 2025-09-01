document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarNav = document.querySelector('.navbar-nav');

  if (navbarToggle && navbarNav) {
    navbarToggle.addEventListener('click', () => {
      console.log('Toggle clicked');
      const isActive = navbarNav.classList.contains('active');
      navbarNav.classList.toggle('active');
      navbarToggle.setAttribute('aria-expanded', !isActive);
    });
  } else {
    console.error('Navbar toggle or nav not found. Check HTML structure.');
  }

  // Hero carousel
  const heroCarousel = document.querySelector('.hero-carousel-container');
  const heroItems = document.querySelectorAll('.hero-carousel-item');
  const heroPrev = document.querySelector('.hero-carousel-btn.prev');
  const heroNext = document.querySelector('.hero-carousel-btn.next');
  let heroIndex = 0;

  function updateHeroCarousel() {
    if (heroCarousel) {
      heroCarousel.style.transform = `translateX(-${heroIndex * 100}%)`;
    }
  }

  if (heroNext) {
    heroNext.addEventListener('click', () => {
      heroIndex = (heroIndex + 1) % heroItems.length;
      updateHeroCarousel();
    });
  }

  if (heroPrev) {
    heroPrev.addEventListener('click', () => {
      heroIndex = (heroIndex - 1 + heroItems.length) % heroItems.length;
      updateHeroCarousel();
    });
  }

  // Auto-advance hero carousel
  setInterval(() => {
    heroIndex = (heroIndex + 1) % heroItems.length;
    updateHeroCarousel();
  }, 5000);

  // Clients carousel
  const clientCarousel = document.querySelector('.carousel-container');
  const clientItems = document.querySelectorAll('.carousel-item');
  const clientPrev = document.querySelector('.carousel-btn.prev');
  const clientNext = document.querySelector('.carousel-btn.next');
  let clientIndex = 0;
  let itemsPerView = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;

  function updateClientCarousel() {
    if (clientCarousel) {
      const itemWidth = 100 / itemsPerView;
      clientCarousel.style.transform = `translateX(-${clientIndex * itemWidth}%)`;
      clientItems.forEach((item, index) => {
        item.classList.toggle('visible', index >= clientIndex && index < clientIndex + itemsPerView);
      });
    }
  }

  function updateItemsPerView() {
    itemsPerView = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
    updateClientCarousel();
  }

  if (clientNext) {
    clientNext.addEventListener('click', () => {
      clientIndex = Math.min(clientIndex + 1, clientItems.length - itemsPerView);
      updateClientCarousel();
    });
  }

  if (clientPrev) {
    clientPrev.addEventListener('click', () => {
      clientIndex = Math.max(clientIndex - 1, 0);
      updateClientCarousel();
    });
  }

  // Auto-scroll for clients carousel
  let carouselInterval = setInterval(() => {
    clientIndex = (clientIndex + 1) % (clientItems.length - itemsPerView + 1);
    updateClientCarousel();
  }, 4000);

  // Pause auto-scroll on hover
  const carouselElement = document.querySelector('.carousel');
  if (carouselElement) {
    carouselElement.addEventListener('mouseenter', () => clearInterval(carouselInterval));
    carouselElement.addEventListener('mouseleave', () => {
      carouselInterval = setInterval(() => {
        clientIndex = (clientIndex + 1) % (clientItems.length - itemsPerView + 1);
        updateClientCarousel();
      }, 4000);
    });
  }

  // Update items per view on window resize
  window.addEventListener('resize', updateItemsPerView);

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  // Observe sections, cards, and logo cards
  document
    .querySelectorAll('.section, .service-card, .testimonial, .insight-card, .logo-card')
    .forEach((element) => {
      observer.observe(element);
    });

  // Set current year in footer
  document.getElementById('ano-atual').textContent = new Date().getFullYear();
});