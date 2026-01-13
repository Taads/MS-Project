document.addEventListener('DOMContentLoaded', () => {
  // ========================
  // Hero carousel
  // ========================
  const heroCarousel = document.querySelector('.hero-carousel-container');
  const heroWrapper = document.querySelector('.hero-carousel');
  const heroItems = document.querySelectorAll('.hero-carousel-item');
  const heroPrevBtn = document.querySelector('.hero-carousel-btn.prev');
  const heroNextBtn = document.querySelector('.hero-carousel-btn.next');
  let heroCurrentIndex = 0;
  let heroIntervalId = null;

  function updateHeroCarousel() {
    if (heroCarousel && heroItems.length > 0) {
      // Transição mais profissional e fluida
      heroCarousel.style.transition = 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      
      const offset = -heroCurrentIndex * 100;
      heroCarousel.style.transform = `translateX(${offset}%)`;
      
      // Fade suave entre slides
      heroItems.forEach((item, index) => {
        if (index === heroCurrentIndex) {
          item.style.opacity = '1';
          item.style.transition = 'opacity 1s ease-in-out';
          item.classList.add('active');
        } else {
          item.style.opacity = '0';
          item.style.transition = 'opacity 0.5s ease-in-out';
          item.classList.remove('active');
        }
      });
    }
  }

  function setHeroIndex(newIndex) {
    if (heroItems.length > 0) {
      heroCurrentIndex = (newIndex + heroItems.length) % heroItems.length;
      updateHeroCarousel();
    }
  }

  function startAutoPlay() {
    if (heroIntervalId || heroItems.length <= 1) return;
    heroIntervalId = setInterval(() => setHeroIndex(heroCurrentIndex + 1), 5000);
  }

  function stopAutoPlay() {
    if (!heroIntervalId) return;
    clearInterval(heroIntervalId);
    heroIntervalId = null;
  }

  if (heroNextBtn) heroNextBtn.addEventListener('click', () => setHeroIndex(heroCurrentIndex + 1));
  if (heroPrevBtn) heroPrevBtn.addEventListener('click', () => setHeroIndex(heroCurrentIndex - 1));

  if (heroWrapper) {
    heroWrapper.addEventListener('mouseenter', stopAutoPlay);
    heroWrapper.addEventListener('mouseleave', startAutoPlay);
  }

  updateHeroCarousel();
  startAutoPlay();
});
