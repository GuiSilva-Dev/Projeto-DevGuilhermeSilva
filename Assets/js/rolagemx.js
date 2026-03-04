//*configuração do intersectionObserver
const ObserverOptions = {
};

//*cria o observador que vigia os elementos na tela
const myObserver = new IntersectionObserver((entries) => {
  //*para cada elemento monitorado
  entries.forEach((entry) => {
    //*adiciona a classe show se estiver visivel, remove se não estiver
    entry.target.classList.toggle("show", entry.isIntersecting);
  });
}, ObserverOptions);
//*paassa as configurações definidas acima

//*seleciona todos os elementos que queremos animar ao entrar na tela
document.querySelectorAll(
  ".container-sobre, .outerSectionDiv, .container-portfolio, .container-contato, .container-portfolio-2"
).forEach(el =>
  //*ativa a observação para cada elemento selecionado
  myObserver.observe(el)
);

//*quando o HTML terminar de ser carregado(antes das imagens e outros recursos)
document.addEventListener('DOMContentLoaded', () => {
  //*se não houver historico de navegação(ou seja, aceeso direto a pagina)
  if( history.state) {
    //*força o scroll para o topo imediatamente(sem animação)
    window.scrollTo({top:0, left:0, behavior:"instant"});
  }
});
