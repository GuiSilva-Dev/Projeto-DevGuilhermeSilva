// Botão flutuante de redes sociais: abre/fecha a lista de links
(function () {
  const socialContainer = document.querySelector('.social-container');
  const socialBtn = document.getElementById('socialToggle');
  if (!socialContainer || !socialBtn) return;

  function setOpen(open) {
    socialContainer.classList.toggle('active', open);
    socialBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  socialBtn.addEventListener('click', function () {
    setOpen(!socialContainer.classList.contains('active'));
  });

  // Fecha ao clicar fora do container (botão + links)
  document.addEventListener('click', function (event) {
    if (!socialContainer.contains(event.target)) setOpen(false);
  });

  // Esc fecha e devolve o foco ao botão
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && socialContainer.classList.contains('active')) {
      setOpen(false);
      socialBtn.focus();
    }
  });
})();
