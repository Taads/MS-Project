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
      const offset = -heroCurrentIndex * 100;
      heroCarousel.style.transform = `translateX(${offset}%)`;
      
      // Atualiza a classe 'active' nos itens do carrossel
      heroItems.forEach((item, index) => {
        item.classList.remove('active'); // Remove a classe de todos os itens
        if (index === heroCurrentIndex) {
          item.classList.add('active'); // Adiciona a classe ao item atual
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
