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
  const heroPrevBtn = document.querySelector('.hero-carousel-btn.prev');
  const heroNextBtn = document.querySelector('.hero-carousel-btn.next');
  let heroCurrentIndex = 0;

  function updateHeroCarousel() {
    if (heroCarousel && heroItems.length > 0) {
      const offset = -heroCurrentIndex * 100;
      heroCarousel.style.transform = `translateX(${offset}%)`;
      console.log(`Hero carousel updated to index ${heroCurrentIndex}, offset: ${offset}%`);
    }
  }

  function setHeroIndex(newIndex) {
    if (heroItems.length > 0) {
      heroCurrentIndex = (newIndex + heroItems.length) % heroItems.length;
      updateHeroCarousel();
    }
  }

  if (heroNextBtn) {
    heroNextBtn.addEventListener('click', () => {
      setHeroIndex(heroCurrentIndex + 1);
    });
  }

  if (heroPrevBtn) {
    heroPrevBtn.addEventListener('click', () => {
      setHeroIndex(heroCurrentIndex - 1);
    });
  }

  // Auto-advance hero carousel
  setInterval(() => {
    setHeroIndex(heroCurrentIndex + 1);
  }, 5000);

  // Clients carousel
  const clientCarousel = document.querySelector('.carousel-container');
  const clientItems = document.querySelectorAll('.carousel-item');
  const clientPrevBtn = document.querySelector('.carousel-btn.prev');
  const clientNextBtn = document.querySelector('.carousel-btn.next');
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

  if (clientNextBtn) {
    clientNextBtn.addEventListener('click', () => {
      clientIndex = Math.min(clientIndex + 1, clientItems.length - itemsPerView);
      updateClientCarousel();
    });
  }

  if (clientPrevBtn) {
    clientPrevBtn.addEventListener('click', () => {
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

  // About carousel
  const aboutCarousel = document.querySelector('.about-carousel .carousel-container');
  const aboutItems = document.querySelectorAll('.about-carousel .carousel-item');
  const aboutPrevBtn = document.querySelector('.about-carousel .carousel-btn.prev');
  const aboutNextBtn = document.querySelector('.about-carousel .carousel-btn.next');
  let aboutIndex = 0;
  let aboutInterval;

  function updateAboutCarousel() {
    if (aboutCarousel && aboutItems.length > 0) {
      const offset = -aboutIndex * 100;
      aboutCarousel.style.transform = `translateX(${offset}%)`;
      aboutItems.forEach((item, index) => {
        item.classList.toggle('visible', index === aboutIndex);
      });
      console.log(`About carousel updated to index ${aboutIndex}, offset: ${offset}%`);
    }
  }

  function setAboutIndex(newIndex) {
    if (aboutItems.length > 0) {
      aboutIndex = (newIndex + aboutItems.length) % aboutItems.length;
      updateAboutCarousel();
    }
  }

  function startAboutCarousel() {
    aboutInterval = setInterval(() => {
      setAboutIndex(aboutIndex + 1);
    }, 7000);
  }

  function stopAboutCarousel() {
    if (aboutInterval) {
      clearInterval(aboutInterval);
    }
  }

  if (aboutNextBtn) {
    aboutNextBtn.addEventListener('click', () => {
      stopAboutCarousel();
      setAboutIndex(aboutIndex + 1);
      startAboutCarousel();
    });
  }

  if (aboutPrevBtn) {
    aboutPrevBtn.addEventListener('click', () => {
      stopAboutCarousel();
      setAboutIndex(aboutIndex - 1);
      startAboutCarousel();
    });
  }

  // Inicializar carrossel
  if (aboutItems.length > 0) {
    updateAboutCarousel();
    startAboutCarousel();
  }

  // Pausar carrossel no hover
  const aboutCarouselElement = document.querySelector('.about-carousel');
  if (aboutCarouselElement) {
    aboutCarouselElement.addEventListener('mouseenter', stopAboutCarousel);
    aboutCarouselElement.addEventListener('mouseleave', startAboutCarousel);
  }

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

  // Modal para visualização de imagens
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalClose = document.querySelector('.modal-close');
  const modalPrev = document.getElementById('modalPrev');
  const modalNext = document.getElementById('modalNext');
  const clickableImages = document.querySelectorAll('.clickable-image');
  
  let currentImageIndex = 0;
  let imageSources = [];

  // Coletar todas as imagens clicáveis
  clickableImages.forEach((img, index) => {
    imageSources.push(img.src);
    img.addEventListener('click', () => {
      currentImageIndex = index;
      openModal();
    });
  });

  function openModal() {
    modal.style.display = 'block';
    modalImage.src = imageSources[currentImageIndex];
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % imageSources.length;
    modalImage.src = imageSources[currentImageIndex];
  }

  function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
    modalImage.src = imageSources[currentImageIndex];
  }

  // Event listeners do modal
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalPrev) {
    modalPrev.addEventListener('click', showPrevImage);
  }

  if (modalNext) {
    modalNext.addEventListener('click', showNextImage);
  }

  // Fechar modal clicando fora da imagem
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Navegação com teclado
  document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        showPrevImage();
      } else if (e.key === 'ArrowRight') {
        showNextImage();
      }
    }
  });
});