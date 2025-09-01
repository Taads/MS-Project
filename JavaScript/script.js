// Controle do carrossel do hero
const heroCarousel = document.querySelector('.hero-carousel-container');
const heroPrevBtn = document.querySelector('.hero-carousel-btn.prev');
const heroNextBtn = document.querySelector('.hero-carousel-btn.next');
let heroCurrentIndex = 0;

function updateHeroCarousel() {
  const offset = -heroCurrentIndex * 100;
  heroCarousel.style.transform = `translateX(${offset}%)`;
}

heroPrevBtn.addEventListener('click', () => {
  heroCurrentIndex = (heroCurrentIndex > 0) ? heroCurrentIndex - 1 : 1;
  updateHeroCarousel();
});

heroNextBtn.addEventListener('click', () => {
  heroCurrentIndex = (heroCurrentIndex < 1) ? heroCurrentIndex + 1 : 0;
  updateHeroCarousel();
});

setInterval(() => {
  heroCurrentIndex = (heroCurrentIndex < 1) ? heroCurrentIndex + 1 : 0;
  updateHeroCarousel();
}, 5000);

// Controle do carrossel de clientes
const clientCarousel = document.querySelector('.carousel-container');
const clientPrevBtn = document.querySelector('.carousel-btn.prev');
const clientNextBtn = document.querySelector('.carousel-btn.next');
let clientCurrentIndex = 0;
const clientItems = document.querySelectorAll('.carousel-item').length;
const clientItemsPerView = window.innerWidth > 780 ? 3 : window.innerWidth > 480 ? 2 : 1;

function updateClientCarousel() {
  const maxIndex = clientItems - clientItemsPerView;
  clientCurrentIndex = Math.max(0, Math.min(clientCurrentIndex, maxIndex));
  const offset = -clientCurrentIndex * (100 / clientItemsPerView);
  clientCarousel.style.transform = `translateX(${offset}%)`;
}

clientPrevBtn.addEventListener('click', () => {
  clientCurrentIndex--;
  updateClientCarousel();
});

clientNextBtn.addEventListener('click', () => {
  clientCurrentIndex++;
  updateClientCarousel();
});

window.addEventListener('resize', () => {
  updateClientCarousel();
});

// Menu hamburguer
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-nav');

navbarToggle.addEventListener('click', () => {
  const isExpanded = navbarToggle.getAttribute('aria-expanded') === 'true';
  navbarToggle.setAttribute('aria-expanded', !isExpanded);
  navbarMenu.classList.toggle('active');
});

// Atualizar ano no rodapé
const anoAtual = document.getElementById('ano-atual');
anoAtual.textContent = new Date().getFullYear();