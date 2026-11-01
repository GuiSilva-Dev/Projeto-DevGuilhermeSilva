document.addEventListener('DOMContentLoaded', function () {
  const backToTopButton = document.getElementById('backToTop');

  let isVisible = false;
  let hideTimer = null;

  // Só mexe no DOM quando o estado muda (antes criava 1 setTimeout por evento de scroll)
  function toggleButtons() {
    const shouldShow = window.scrollY > 100;
    if (shouldShow === isVisible) return;
    isVisible = shouldShow;

    if (shouldShow) {
      clearTimeout(hideTimer);
      backToTopButton.style.display = 'flex';
      setTimeout(() => {
        backToTopButton.style.opacity = '1';
      }, 10);
    } else {
      backToTopButton.style.opacity = '0';
      hideTimer = setTimeout(() => {
        backToTopButton.style.display = 'none';
      }, 500);
    }
  }

  document.addEventListener('scroll', toggleButtons, { passive: true });

  backToTopButton.addEventListener('click', function () {
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });

    // Move o foco para o título do topo (senão o teclado continua lá embaixo, no botão)
    const heroTitle = document.querySelector('.inicio h1');
    if (heroTitle) {
      heroTitle.setAttribute('tabindex', '-1');
      heroTitle.focus({ preventScroll: true });
    }
  });
});

