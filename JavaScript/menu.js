document.addEventListener('DOMContentLoaded', () => {
  // ========================
  // Mobile menu toggle
  // ========================
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarNav = document.querySelector('.navbar-nav');
  const body = document.body;
  const header = document.querySelector('.header');

  // ========================
  // Header scroll effect
  // ========================
  if (header) {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }

  if (navbarToggle && navbarNav) {
    navbarToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navbarNav.classList.contains('active');
      navbarNav.classList.toggle('active');
      navbarToggle.setAttribute('aria-expanded', !isActive);
      
      // Atualiza o ícone do menu
      const icon = navbarToggle.querySelector('.material-icons');
      if (icon) {
        icon.textContent = isActive ? 'menu' : 'close';
      }
      
      // Previne scroll do body quando menu está aberto
      if (!isActive) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });

    // Fecha o menu ao clicar em um link
    const navLinks = navbarNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbarNav.classList.remove('active');
        navbarToggle.setAttribute('aria-expanded', 'false');
        const icon = navbarToggle.querySelector('.material-icons');
        if (icon) {
          icon.textContent = 'menu';
        }
        body.style.overflow = '';
      });
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', (e) => {
      if (!navbarNav.contains(e.target) && !navbarToggle.contains(e.target)) {
        if (navbarNav.classList.contains('active')) {
          navbarNav.classList.remove('active');
          navbarToggle.setAttribute('aria-expanded', 'false');
          const icon = navbarToggle.querySelector('.material-icons');
          if (icon) {
            icon.textContent = 'menu';
          }
          body.style.overflow = '';
        }
      }
    });
  }
});
