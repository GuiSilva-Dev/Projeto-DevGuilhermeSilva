// Revela cada seção uma única vez, na primeira vez que entra na tela
const myObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll(
  ".container-sobre, .container-github, .outerSectionDiv, .container-portfolio, .container-contato, .container-portfolio-2"
).forEach(el =>
  myObserver.observe(el)
);

document.addEventListener('DOMContentLoaded', () => {
  // Volta ao topo ao recarregar, exceto quando a URL aponta para uma seção (ex.: index.html#projects)
  if (history.state && !window.location.hash) {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }
});
