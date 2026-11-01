// Envia o formulário de contato via AJAX (FormSubmit) e mostra o resultado na própria página.
// Sem JS, o form continua funcionando pelo action normal.
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  if (!form || !window.fetch) return;

  const status = document.getElementById('formStatus');
  const submitBtn = form.querySelector('button[type="submit"]');
  // Mesmo destinatário do action, no endpoint AJAX (responde JSON em vez de redirecionar)
  const endpoint = form.action.replace('https://formsubmit.co/', 'https://formsubmit.co/ajax/');

  function t(key) {
    const lang = window.currentLang === 'en' ? 'en' : 'pt';
    const dict = (window.translations || {})[lang] || {};
    return dict[key] || key;
  }

  // Guarda a chave no data-i18n para o texto acompanhar a troca de idioma
  function setStatus(key, state) {
    if (!status) return;
    status.setAttribute('data-i18n', key);
    status.textContent = t(key);
    status.dataset.state = state;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (submitBtn) submitBtn.disabled = true;
    setStatus('contact.sending', 'sending');

    fetch(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form)
    })
      .then(function (response) {
        return response.json().catch(function () { return {}; }).then(function (data) {
          // FormSubmit responde { success: "true" } (string) quando deu certo
          if (!response.ok || String(data.success) !== 'true') throw new Error('envio falhou');
        });
      })
      .then(function () {
        form.reset();
        setStatus('contact.success', 'success');
      })
      .catch(function () {
        setStatus('contact.error', 'error');
      })
      .finally(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
  });
});
