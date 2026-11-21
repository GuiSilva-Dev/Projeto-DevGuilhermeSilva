document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menuToggle');
  const menuAberto = document.querySelector('.menu-aberto');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const body = document.body;

  // Header vira "vidro" translúcido depois que a página desce um pouco (estilo em .header--rolado)
  const headerEl = document.querySelector('.header');
  if (headerEl) {
    let rolado = null;
    const atualizarHeader = function () {
      const agora = window.scrollY > 24;
      if (agora !== rolado) {
        rolado = agora;
        headerEl.classList.toggle('header--rolado', agora);
      }
    };
    atualizarHeader();
    document.addEventListener('scroll', atualizarHeader, { passive: true });
  }

  if (!menuToggle || !menuAberto) return;

  // Tudo que fica fora do header: com o menu aberto vira inert (sem foco/clique/leitor de tela)
  const header = menuToggle.closest('header');
  const outside = Array.from(body.children).filter(function (el) {
    return el !== header && el.tagName !== 'SCRIPT';
  });

  function setOpen(open, returnFocus) {
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuAberto.classList.toggle('active', open);
    body.classList.toggle('no-scroll', open);
    outside.forEach(function (el) {
      el.inert = open;
    });

    if (open) {
      // Leva o foco para o primeiro link do menu
      if (navLinks[0]) navLinks[0].focus({ preventScroll: true });
    } else if (returnFocus) {
      menuToggle.focus();
    }
  }

  menuToggle.addEventListener('click', function () {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen, isOpen);
  });

  // Fecha o menu ao clicar em um link de navegação (o foco segue para a âncora, não volta ao botão)
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      setOpen(false, false);
    });
  });

  // Esc fecha o menu e devolve o foco ao botão
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menuAberto.classList.contains('active')) {
      setOpen(false, true);
    }
  });
});
