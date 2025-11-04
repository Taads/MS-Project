// ===================================
// MINI CARROSSÉIS DA SEÇÃO INSIGHTS
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  // Seleciona todos os carrosséis de insights
  const insightCarousels = document.querySelectorAll('[data-carousel]');
  
  insightCarousels.forEach(carousel => {
    const carouselId = carousel.getAttribute('data-carousel');
    const slides = carousel.querySelectorAll('.insight-carousel-item');
    const prevBtn = document.querySelector(`[data-carousel-target="${carouselId}"].prev`);
    const nextBtn = document.querySelector(`[data-carousel-target="${carouselId}"].next`);
    const indicators = document.querySelector(`[data-carousel-indicators="${carouselId}"]`);
    const dots = indicators ? indicators.querySelectorAll('.insight-carousel-dot') : [];
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Função para atualizar o carrossel
    function updateCarousel() {
      const offset = -currentSlide * 100;
      carousel.style.transform = `translateX(${offset}%)`;
      
      // Atualiza os indicadores
      dots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
    
    // Função para ir para o próximo slide
    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    }
    
    // Função para ir para o slide anterior
    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
    }
    
    // Função para ir para um slide específico
    function goToSlide(index) {
      currentSlide = index;
      updateCarousel();
    }
    
    // Event listeners para os botões
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
      });
    }
    
    // Event listeners para os indicadores
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
    });
    
    
    // Suporte para toque em dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - próximo slide
          nextSlide();
        } else {
          // Swipe right - slide anterior
          prevSlide();
        }
      }
    }
  });
  
  // Animação de entrada dos cards de insights
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const insightCards = document.querySelectorAll('.insight-card');
  
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        cardObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  insightCards.forEach(card => {
    cardObserver.observe(card);
  });
});