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
  let hovered = false;
  let visible = false;

  function moveSlider() {
    pos += speed;
    slider.style.transform = `translate3d(-${pos}px, 0, 0)`;

    // Subtrair em vez de zerar preserva os subpixels
    if (pos >= originalWidth) {
      pos -= originalWidth;
    }

    animationId = requestAnimationFrame(moveSlider);
  }

  // Só anima quando está visível e sem hover; nunca empilha dois loops
  function update() {
    cancelAnimationFrame(animationId);
    animationId = null;
    if (visible && !hovered) moveSlider();
  }

  const wrapper = slider.parentElement;
  if (wrapper) {
    wrapper.addEventListener("mouseenter", () => { hovered = true; update(); });
    wrapper.addEventListener("mouseleave", () => { hovered = false; update(); });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
        update();
      }).observe(wrapper);
      return;
    }
  }

  visible = true;
  update();
}

sliderIds.forEach(id => setupSlider(id));
