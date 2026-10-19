document.addEventListener('DOMContentLoaded', function () {
  // Começa no topo ao recarregar
  if (window.location.hash !== '') {
    window.location.hash = '';
  }

  const backToTopButton = document.getElementById('backToTop');
  let shown = false;
  let hideTimer = null;

  // Só mexe no DOM quando o estado muda (o evento de scroll dispara dezenas de vezes por segundo)
  function toggleButtons() {
    const shouldShow = window.scrollY > 100;
    if (shouldShow === shown) return;
    shown = shouldShow;
    clearTimeout(hideTimer);

    if (shouldShow) {
      backToTopButton.style.display = 'flex';
      hideTimer = setTimeout(() => {
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
