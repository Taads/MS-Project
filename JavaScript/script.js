document.addEventListener('DOMContentLoaded', () => {
  // Menu Hamburger
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.main-nav ul');
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Atualizar ano no rodapé
  document.getElementById('ano-atual').textContent = new Date().getFullYear();

  // Carrossel
  const carousel = document.querySelector('.carousel-container');
  if (carousel) {
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentIndex = 0;
    const totalItems = items.length;
    const visibleItems = window.innerWidth <= 480 ? 1 : window.innerWidth <= 780 ? 2 : 3;

    const updateCarousel = () => {
      const offset = -(currentIndex * (100 / visibleItems));
      carousel.style.transform = `translateX(${offset}%)`;
    };

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    });

    // Auto-rolagem a cada 5 segundos
    let autoSlide = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    }, 5000);

    // Pausar auto-rolagem ao passar o mouse
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
    carousel.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
      }, 5000);
    });

    // Ajustar carrossel ao redimensionar a janela
    window.addEventListener('resize', () => {
      const newVisibleItems = window.innerWidth <= 480 ? 1 : window.innerWidth <= 780 ? 2 : 3;
      if (newVisibleItems !== visibleItems) {
        updateCarousel();
      }
    });
  }
});