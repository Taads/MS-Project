// document.addEventListener('DOMContentLoaded', () => {
//   // ========================
//   // About carousel
//   // ========================
//   const aboutCarousel = document.querySelector('.about-carousel .carousel-container');
//   const aboutItems = document.querySelectorAll('.about-carousel .carousel-item');
//   const aboutPrevBtn = document.querySelector('.about-carousel .carousel-btn.prev');
//   const aboutNextBtn = document.querySelector('.about-carousel .carousel-btn.next');
//   let aboutIndex = 0;
//   let aboutInterval;

//   function updateAboutCarousel() {
//     if (aboutCarousel && aboutItems.length > 0) {
//       const offset = -aboutIndex * 100;
//       aboutCarousel.style.transform = `translateX(${offset}%)`;
//       aboutItems.forEach((item, index) => {
//         item.classList.toggle('visible', index === aboutIndex);
//       });
//     }
//   }

//   function setAboutIndex(newIndex) {
//     if (aboutItems.length > 0) {
//       aboutIndex = (newIndex + aboutItems.length) % aboutItems.length;
//       updateAboutCarousel();
//     }
//   }

//   function startAboutCarousel() {
//     aboutInterval = setInterval(() => setAboutIndex(aboutIndex + 1), 7000);
//   }

//   function stopAboutCarousel() {
//     clearInterval(aboutInterval);
//   }

//   if (aboutNextBtn) aboutNextBtn.addEventListener('click', () => { stopAboutCarousel(); setAboutIndex(aboutIndex + 1); startAboutCarousel(); });
//   if (aboutPrevBtn) aboutPrevBtn.addEventListener('click', () => { stopAboutCarousel(); setAboutIndex(aboutIndex - 1); startAboutCarousel(); });

//   if (aboutItems.length > 0) {
//     updateAboutCarousel();
//     startAboutCarousel();
//   }

//   const aboutCarouselElement = document.querySelector('.about-carousel');
//   if (aboutCarouselElement) {
//     aboutCarouselElement.addEventListener('mouseenter', stopAboutCarousel);
//     aboutCarouselElement.addEventListener('mouseleave', startAboutCarousel);
//   }
// });
