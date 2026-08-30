//* Lista com os IDs de todos os sliders que você quer animar
const sliderIds = ["bar-skills", "bar", "bar-pt3", "bar-pt4"];

function setupSlider(id) {
  const slider = document.getElementById(id);
  if (!slider) return;

  const originalCount = slider.children.length;
  const content = slider.innerHTML;

  //* Se precisar de mais para telas muito largas, pode manter 4x.
  slider.innerHTML = content.repeat(4);

  //* 1. MENSURAÇÃO: Mede a distância real no DOM entre o 1º item original e sua 1ª cópia. Isso ignora erros de cálculo com padding/gap/subpixels e elimina o "pulo" no reset.
  const firstItem = slider.children[0];
  const secondCopyItem = slider.children[originalCount];
  const originalWidth = secondCopyItem.getBoundingClientRect().left - firstItem.getBoundingClientRect().left;

  let pos = 0;
  const speed = 1;
  let animationId = null;

  function moveSlider() {
    pos += speed;
    slider.style.transform = `translateX(-${pos}px)`;


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