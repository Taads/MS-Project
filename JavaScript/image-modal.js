// document.addEventListener('DOMContentLoaded', () => {
//   // ========================
//   // Modal de Imagens
//   // ========================
//   const modal = document.getElementById('imageModal');
//   const modalImage = document.getElementById('modalImage');
//   const modalClose = document.querySelector('.modal-close');
//   const modalPrev = document.getElementById('modalPrev');
//   const modalNext = document.getElementById('modalNext');
//   const clickableImages = document.querySelectorAll('.clickable-image');

//   let currentImageIndex = 0;
//   let imageSources = [];

//   clickableImages.forEach((img, index) => {
//     imageSources.push(img.src);
//     img.addEventListener('click', () => {
//       currentImageIndex = index;
//       openModal();
//     });
//   });

//   function openModal() {
//     modal.style.display = 'block';
//     modalImage.src = imageSources[currentImageIndex];
//     document.body.style.overflow = 'hidden';
//   }

//   function closeModal() {
//     modal.style.display = 'none';
//     document.body.style.overflow = 'auto';
//   }

//   function showNextImage() {
//     currentImageIndex = (currentImageIndex + 1) % imageSources.length;
//     modalImage.src = imageSources[currentImageIndex];
//   }

//   function showPrevImage() {
//     currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
//     modalImage.src = imageSources[currentImageIndex];
//   }

//   if (modalClose) modalClose.addEventListener('click', closeModal);
//   if (modalPrev) modalPrev.addEventListener('click', showPrevImage);
//   if (modalNext) modalNext.addEventListener('click', showNextImage);

//   modal.addEventListener('click', (e) => {
//     if (e.target === modal) closeModal();
//   });

//   document.addEventListener('keydown', (e) => {
//     if (modal.style.display === 'block') {
//       if (e.key === 'Escape') closeModal();
//       else if (e.key === 'ArrowLeft') showPrevImage();
//       else if (e.key === 'ArrowRight') showNextImage();
//     }
//   });
// });
