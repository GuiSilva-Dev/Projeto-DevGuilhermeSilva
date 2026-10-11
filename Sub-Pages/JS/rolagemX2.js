// Alterna .show conforme o elemento entra/sai da tela
const myObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

const elements = document.querySelectorAll('.container-portfolio-2');

elements.forEach((element) => myObserver.observe(element));