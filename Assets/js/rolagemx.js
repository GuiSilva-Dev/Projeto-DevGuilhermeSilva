const ObserverOptions = {
};

// Alterna .show conforme o elemento entra/sai da tela
const myObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("show", entry.isIntersecting);
  });
}, ObserverOptions);

document.querySelectorAll(
  ".container-sobre, .container-github, .outerSectionDiv, .container-portfolio, .container-contato, .container-portfolio-2"
).forEach(el =>
  myObserver.observe(el)
);

document.addEventListener('DOMContentLoaded', () => {
  if( history.state) {
    // Volta ao topo sem animação
    window.scrollTo({top:0, left:0, behavior:"instant"});
  }
});
