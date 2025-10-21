document.addEventListener('DOMContentLoaded', () => {
  // ========================
  // Mobile menu toggle
  // ========================
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarNav = document.querySelector('.navbar-nav');

  if (navbarToggle && navbarNav) {
    navbarToggle.addEventListener('click', () => {
      const isActive = navbarNav.classList.contains('active');
      navbarNav.classList.toggle('active');
      navbarToggle.setAttribute('aria-expanded', !isActive);
    });
  }

  // ========================
  // Hero carousel
  // ========================
  const heroCarousel = document.querySelector('.hero-carousel-container');
  const heroItems = document.querySelectorAll('.hero-carousel-item');
  const heroPrevBtn = document.querySelector('.hero-carousel-btn.prev');
  const heroNextBtn = document.querySelector('.hero-carousel-btn.next');
  let heroCurrentIndex = 0;

  function updateHeroCarousel() {
    if (heroCarousel && heroItems.length > 0) {
      const offset = -heroCurrentIndex * 100;
      heroCarousel.style.transform = `translateX(${offset}%)`;
    }
  }

  function setHeroIndex(newIndex) {
    if (heroItems.length > 0) {
      heroCurrentIndex = (newIndex + heroItems.length) % heroItems.length;
      updateHeroCarousel();
    }
  }

  if (heroNextBtn) heroNextBtn.addEventListener('click', () => setHeroIndex(heroCurrentIndex + 1));
  if (heroPrevBtn) heroPrevBtn.addEventListener('click', () => setHeroIndex(heroCurrentIndex - 1));
  setInterval(() => setHeroIndex(heroCurrentIndex + 1), 5000);

  // ========================
  // Clients carousel (NOSSOS CLIENTES) - Carrossel Infinito
  // ========================
  const clientesCarousel = document.querySelector('.clientes-carousel');
  const clientesTrack = document.querySelector('.clientes-track');
  
  // O carrossel agora é controlado apenas por CSS com animação infinita
  // A funcionalidade de pausar no hover já está implementada no CSS
  if (clientesCarousel) {
    // Adicionar funcionalidade de pausar/retomar no hover (já implementada no CSS)
    // Manter compatibilidade com botões de navegação se necessário
    const clientesPrev = document.querySelector('.clientes-btn.prev');
    const clientesNext = document.querySelector('.clientes-btn.next');
    
    // Opcional: adicionar funcionalidade aos botões se desejado
    if (clientesPrev && clientesNext) {
      clientesPrev.style.display = 'none'; // Ocultar botões já que é automático
      clientesNext.style.display = 'none';
    }
  }

  // ========================
  // About carousel
  // ========================
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
    }
  }

  function setAboutIndex(newIndex) {
    if (aboutItems.length > 0) {
      aboutIndex = (newIndex + aboutItems.length) % aboutItems.length;
      updateAboutCarousel();
    }
  }

  function startAboutCarousel() {
    aboutInterval = setInterval(() => setAboutIndex(aboutIndex + 1), 7000);
  }

  function stopAboutCarousel() {
    clearInterval(aboutInterval);
  }

  if (aboutNextBtn) aboutNextBtn.addEventListener('click', () => { stopAboutCarousel(); setAboutIndex(aboutIndex + 1); startAboutCarousel(); });
  if (aboutPrevBtn) aboutPrevBtn.addEventListener('click', () => { stopAboutCarousel(); setAboutIndex(aboutIndex - 1); startAboutCarousel(); });

  if (aboutItems.length > 0) {
    updateAboutCarousel();
    startAboutCarousel();
  }

  const aboutCarouselElement = document.querySelector('.about-carousel');
  if (aboutCarouselElement) {
    aboutCarouselElement.addEventListener('mouseenter', stopAboutCarousel);
    aboutCarouselElement.addEventListener('mouseleave', startAboutCarousel);
  }

  // ========================
  // Intersection Observer (scroll animations)
  // ========================
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
  );

  document
    .querySelectorAll('.section, .service-card, .testimonial, .insight-card, .logo-card')
    .forEach((element) => observer.observe(element));

  // ========================
  // Footer Year
  // ========================
  const ano = document.getElementById('ano-atual');
  if (ano) ano.textContent = new Date().getFullYear();

  // ========================
  // Modal de Imagens
  // ========================
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalClose = document.querySelector('.modal-close');
  const modalPrev = document.getElementById('modalPrev');
  const modalNext = document.getElementById('modalNext');
  const clickableImages = document.querySelectorAll('.clickable-image');

  let currentImageIndex = 0;
  let imageSources = [];

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

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalPrev) modalPrev.addEventListener('click', showPrevImage);
  if (modalNext) modalNext.addEventListener('click', showNextImage);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
      if (e.key === 'Escape') closeModal();
      else if (e.key === 'ArrowLeft') showPrevImage();
      else if (e.key === 'ArrowRight') showNextImage();
    }
  });
});