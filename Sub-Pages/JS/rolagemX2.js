// Revela o conteúdo ao carregar. Antes usava IntersectionObserver, mas o container
// (mais alto que a tela e deslocado para baixo) não "entrava" em telas baixas: página preta.
document.querySelectorAll('.container-portfolio-2').forEach((el) => {
  requestAnimationFrame(() => el.classList.add('show'));
});
