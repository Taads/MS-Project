// document.addEventListener('DOMContentLoaded', () => {
//   // ========================
//   // Hero carousel
//   // ========================
//   const heroCarousel = document.querySelector('.hero-carousel-container');
//   const heroItems = document.querySelectorAll('.hero-carousel-item');
//   const heroPrevBtn = document.querySelector('.hero-carousel-btn.prev');
//   const heroNextBtn = document.querySelector('.hero-carousel-btn.next');
//   let heroCurrentIndex = 0;

//   function updateHeroCarousel() {
//     if (heroCarousel && heroItems.length > 0) {
//       const offset = -heroCurrentIndex * 100;
//       heroCarousel.style.transform = `translateX(${offset}%)`;
//     }
//   }

//   function setHeroIndex(newIndex) {
//     if (heroItems.length > 0) {
//       heroCurrentIndex = (newIndex + heroItems.length) % heroItems.length;
//       updateHeroCarousel();
//     }
//   }

//   if (heroNextBtn) heroNextBtn.addEventListener('click', () => setHeroIndex(heroCurrentIndex + 1));
//   if (heroPrevBtn) heroPrevBtn.addEventListener('click', () => setHeroIndex(heroCurrentIndex - 1));

//   setInterval(() => setHeroIndex(heroCurrentIndex + 1), 5000);
// });
