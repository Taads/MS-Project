document.addEventListener('DOMContentLoaded', () => {
  // ========================
  // Intersection Observer (scroll animations)
  // ========================
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
  );

  document
    .querySelectorAll('.section, .service-card, .testimonial, .insight-card, .logo-card')
    .forEach((element) => observer.observe(element));
});
