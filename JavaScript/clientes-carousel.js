// document.addEventListener('DOMContentLoaded', () => {
//   // ========================
//   // Clients carousel (NOSSOS CLIENTES)
//   // ========================
//   const clientesCarousel = document.querySelector('.clientes-carousel');
//   const clientesTrack = document.querySelector('.clientes-track');
//   const clientesLogos = document.querySelectorAll('.cliente-logo');

//   if (clientesCarousel && clientesTrack && clientesLogos.length > 0) {
//     let isPaused = false;
//     let animationId;
//     let currentPosition = 0;
//     const logoWidth = 180 + 30; // largura do logo + gap
//     const speed = 0.8; // pixels por frame

//     function duplicateLogos() {
//       const fragment = document.createDocumentFragment();
//       clientesLogos.forEach(logo => {
//         const clone = logo.cloneNode(true);
//         fragment.appendChild(clone);
//       });
//       clientesTrack.appendChild(fragment);
//     }

//     function animate() {
//       if (!isPaused) {
//         currentPosition -= speed;

//         if (Math.abs(currentPosition) >= logoWidth) {
//           currentPosition += logoWidth;
//           clientesTrack.appendChild(clientesTrack.firstElementChild);
//         }

//         clientesTrack.style.transform = `translateX(${currentPosition}px)`;
//       }
//       animationId = requestAnimationFrame(animate);
//     }

//     clientesCarousel.addEventListener('mouseenter', () => (isPaused = true));
//     clientesCarousel.addEventListener('mouseleave', () => (isPaused = false));

//     duplicateLogos();
//     animate();

//     const clientesPrev = document.querySelector('.clientes-btn.prev');
//     const clientesNext = document.querySelector('.clientes-btn.next');
//     if (clientesPrev && clientesNext) {
//       clientesPrev.style.display = 'none';
//       clientesNext.style.display = 'none';
//     }

//     clientesCarousel.addEventListener('mouseenter', () => {
//       clientesTrack.style.animationPlayState = 'paused';
//     });
//     clientesCarousel.addEventListener('mouseleave', () => {
//       clientesTrack.style.animationPlayState = 'running';
//     });
//   }
// });
