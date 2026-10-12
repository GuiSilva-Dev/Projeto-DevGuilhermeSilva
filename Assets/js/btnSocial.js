function toggleMenu() {
  document.querySelector('.social-container').classList.toggle('active');
}

// Fecha os botões sociais ao clicar fora do botão principal
document.addEventListener('click', function (event) {
  const socialContainer = document.querySelector('.social-container');
  const socialBtn = document.querySelector('.btn-social');
  if (!socialBtn.contains(event.target)) {
    socialContainer.classList.remove('active');
  }
});
