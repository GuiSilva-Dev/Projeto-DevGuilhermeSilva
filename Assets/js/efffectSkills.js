//* Lista com os IDs de todos os sliders que você quer animar
const sliderIds = ["bar-skills", "bar", "bar-pt3", "bar-pt4"];

function setupSlider(id) {
  const slider = document.getElementById(id);
  if (!slider) return;

  slider.style.paddingLeft = 0;

  //* 1. MENSURAÇÃO: Pega a largura do conteúdo ORIGINAL antes de duplicar
  const originalWidth = slider.scrollWidth;
  const content = slider.innerHTML;

  //* 2. DUPLICAÇÃO: 2 vezes costuma ser suficiente se o conteúdo for maior que a tela.
  //* Se precisar de mais para telas muito largas, pode manter 4x.
  slider.innerHTML = content + content + content + content; 

  let pos = 0;
  const speed = 1; 
  let animationId = null;

  function moveSlider() {
    pos += speed;
    slider.style.transform = `translateX(-${pos}px)`;

    //* 3. LÓGICA CORRIGIDA: Reseta exatamente quando a rolagem atinge a largura de 1 bloco original.
    //* Usar subtração (pos -= originalWidth) em vez de (pos = 0) evita perda de subpixels e deixa mais fluido.
    if (pos >= originalWidth) {
      pos -= originalWidth; 
    }

    animationId = requestAnimationFrame(moveSlider);
  }

  function pauseSlider() {
    cancelAnimationFrame(animationId);
  }

  function resumeSlider() {
    moveSlider();
  }

  moveSlider();

  if (slider.parentElement) {
    slider.parentElement.addEventListener("mouseenter", pauseSlider);
    slider.parentElement.addEventListener("mouseleave", resumeSlider);
  }
}

sliderIds.forEach(id => setupSlider(id));