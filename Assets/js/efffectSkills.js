const sliderIds = ["bar-skills", "bar", "bar-pt3", "bar-pt4"];

function setupSlider(id) {
  const slider = document.getElementById(id);
  if (!slider) return;

  const originalCount = slider.children.length;
  const content = slider.innerHTML;

  slider.innerHTML = content.repeat(4);

  // Mede no DOM a distância até a 1ª cópia (inclui gap/subpixels) para o reset não "pular"
  const firstItem = slider.children[0];
  const secondCopyItem = slider.children[originalCount];
  const originalWidth = secondCopyItem.getBoundingClientRect().left - firstItem.getBoundingClientRect().left;

  let pos = 0;
  const speed = 1;
  let animationId = null;

  function moveSlider() {
    pos += speed;
    slider.style.transform = `translateX(-${pos}px)`;


    // Subtrair em vez de zerar preserva os subpixels
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