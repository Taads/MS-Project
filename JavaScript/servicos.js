/**
 * JavaScript específico para a página de Serviços
 * Arquivo: servicos.js
 */

document.addEventListener('DOMContentLoaded', () => {
  // ========================
  // Inicialização das Animações de Scroll
  // ========================
  initScrollAnimations();

  // ========================
  // Efeitos Interativos nos Cards
  // ========================
  initCardInteractions();

  // ========================
  // Smooth Scroll para Links Internos
  // ========================
  initSmoothScroll();
});

/**
 * Inicializa as animações de scroll para os cards de serviços
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Não remove o observer para permitir re-animação se necessário
      }
    });
  }, observerOptions);

  // Observa todos os cards de serviços
  const servicoCards = document.querySelectorAll('.servico-card[data-animate]');
  servicoCards.forEach((card) => {
    observer.observe(card);
  });
}

/**
 * Adiciona efeitos interativos aos cards
 */
function initCardInteractions() {
  const servicoCards = document.querySelectorAll('.servico-card');

  servicoCards.forEach((card) => {
    // Efeito de parallax suave no hover
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const moveX = (x - centerX) / 20;
      const moveY = (y - centerY) / 20;

      const icon = card.querySelector('.servico-card-icon');
      if (icon) {
        icon.style.transform = `translate(${moveX}px, ${moveY}px) rotate(10deg) scale(1.1)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.servico-card-icon');
      if (icon) {
        icon.style.transform = '';
      }
    });

    // Animação de contagem para features (opcional - pode ser expandido)
    const features = card.querySelectorAll('.servico-card-features li');
    features.forEach((feature, index) => {
      feature.style.animationDelay = `${index * 0.1}s`;
    });
  });
}

/**
 * Inicializa smooth scroll para links internos
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Se o link aponta para uma seção em outra página
      if (href.includes('index.html#')) {
        // Deixa o navegador seguir o link normalmente
        return;
      }

      // Se é um link interno na mesma página
      if (href.startsWith('#')) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          e.preventDefault();
          const headerOffset = 100;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/**
 * Adiciona efeito de contador animado (opcional - para estatísticas futuras)
 */
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

/**
 * Lazy loading para imagens (se adicionadas no futuro)
 */
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach((img) => imageObserver.observe(img));
  }
}

// Inicializa lazy loading se houver imagens
initLazyLoading();

/**
 * Adiciona efeito de typing para o título do hero (opcional)
 */
function initTypingEffect() {
  const titleElement = document.querySelector('.servicos-hero-title');
  if (!titleElement) return;

  const text = titleElement.textContent;
  titleElement.textContent = '';
  titleElement.style.opacity = '1';

  let index = 0;
  const typingInterval = setInterval(() => {
    if (index < text.length) {
      titleElement.textContent += text.charAt(index);
      index++;
    } else {
      clearInterval(typingInterval);
    }
  }, 50);
}

// Descomente a linha abaixo se quiser ativar o efeito de typing
// initTypingEffect();





