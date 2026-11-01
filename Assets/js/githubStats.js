// Estatísticas direto da API do GitHub (serviços como github-readme-stats sofrem rate-limit)
(function () {
  let userName = "GuiSilva-Dev";
  let cacheKey = "gh-stats-cache-v3"; // v3: estrelas = recebidas nos repos próprios
  let cacheTTL = 60 * 60 * 1000; // 1 hora

  let statsBody = document.getElementById("gh-stats-body");
  let langsBody = document.getElementById("gh-langs-body");
  let langsCard = document.getElementById("gh-langs-card");
  let cardsBox = document.querySelector(".github-cards");
  let streakImg = cardsBox ? cardsBox.querySelector("img.github-card") : null;
  if (!statsBody && !langsBody) return;

  // Card de sequência (serviço externo) carregou de verdade? (onerror do HTML o esconde se falhar)
  function streakLoaded() {
    return !!streakImg && streakImg.complete && streakImg.naturalWidth > 0 && streakImg.style.display !== "none";
  }

  // Com a API fora do ar: some com a caixa dos cards se a sequência também não carregou,
  // em vez de deixar um bloco vazio. Se a imagem (lazy) chegar depois, a caixa volta.
  function hideEmptyCards() {
    if (!cardsBox) return;
    if (streakLoaded()) {
      cardsBox.style.display = "";
      return;
    }
    cardsBox.style.display = "none";
    if (streakImg && !streakImg.complete) {
      // Imagem lazy dentro de caixa com display:none nunca carregaria: força o carregamento
      streakImg.loading = "eager";
      streakImg.addEventListener("load", function () {
        if (streakLoaded()) cardsBox.style.display = "";
      }, { once: true });
    }
  }

  function t(key) {
    let lang = (window.currentLang === "en") ? "en" : "pt";
    let dict = (window.translations || {})[lang] || {};
    return dict[key] || key;
  }

  // Retorna { data, fresh } ou null. Antes devolvia um objeto { error } (truthy),
  // que era renderizado como dados ("undefined") e impedia o renderError().
  function readCache() {
    try {
      let raw = localStorage.getItem(cacheKey);
      if (!raw) return null;
      let parsed = JSON.parse(raw);
      if (!parsed || !parsed.data) return null;
      return { data: parsed.data, fresh: Date.now() - parsed.ts <= cacheTTL };
    } catch (e) {
      return null;
    }
  }

  function writeCache(data) {
    try {
      localStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data: data }));
    } catch (e) {
      // Sem storage (modo privado/cota cheia): segue sem cache
    }
  }

  let lastData = null;

  function render(data) {
    lastData = data;
    // Tempo codando não vem da API; calculado aqui para usar o idioma detectado
    let dateStart = new Date(2026, 3, 13); // Início do desenvolvimento
    let dateCurrent = new Date();

    const monthsDiff = (dateCurrent.getFullYear() - dateStart.getFullYear()) * 12 + (dateCurrent.getMonth() - dateStart.getMonth()) + (dateCurrent.getDate() >= dateStart.getDate());
    const yearsDiff = monthsDiff / 12;

    let locale = window.currentLang === "en" ? "en-US" : "pt-BR";
    const formatNumber = (num, digits) => {
      return Number(num || 0).toLocaleString(locale, { minimumFractionDigits: digits, maximumFractionDigits: digits });
    }

    let codingYears = formatNumber(yearsDiff, 1);

    if (statsBody) {
      statsBody.innerHTML =
        '<div class="gh-stat-item"><span class="gh-stat-num">' + formatNumber(data.repos, 0) + '</span><span class="gh-stat-label" data-i18n="github.stat.repos">' + t("github.stat.repos") + '</span></div>' +
        '<div class="gh-stat-item"><span class="gh-stat-num">' + formatNumber(data.stars, 0) + '</span><span class="gh-stat-label" data-i18n="github.stat.stars">' + t("github.stat.stars") + '</span></div>' +
        '<div class="gh-stat-item"><span class="gh-stat-num gh-stat-num--noplus">' + codingYears + '</span><span class="gh-stat-label" data-i18n="github.stat.codingTime">' + t("github.stat.codingTime") + '</span></div>';
    }

    if (langsBody) {
      // Volta a mostrar o card caso um erro anterior o tenha escondido
      if (langsCard) langsCard.style.display = "";
      if (cardsBox) cardsBox.style.display = "";
      let langs = data.langs || [];
      if (!langs.length) {
        langsBody.innerHTML = '<div class="gh-loading">—</div>';
      } else {
        let max = langs[0][1];
        let total = langs.reduce(function (sum, entry) { return sum + entry[1]; }, 0);
        langsBody.innerHTML = langs.map(function (entry) {
          let name = entry[0];
          let bytes = entry[1];
          let barPct = Math.round((bytes / max) * 100);
          let sharePct = total ? Math.round((bytes / total) * 100) : 0;
          return '<div class="gh-lang-row">' +
            '<span class="gh-lang-name">' + name + '</span>' +
            '<div class="gh-lang-bar-track"><div class="gh-lang-bar-fill" style="width:' + barPct + '%"></div></div>' +
            '<span class="gh-lang-count">' + sharePct + '%</span>' +
            '</div>';
        }).join('');
      }
    }
  }

  function renderError() {
    let msg = '<div class="gh-error"><span data-i18n="github.error">' + t("github.error") + '</span> ' +
      '<a href="https://github.com/' + userName + '" target="_blank" rel="noopener" data-i18n="github.errorLink">' + t("github.errorLink") + '</a></div>';
    // Mensagem uma vez só (no bloco de estatísticas); o card de linguagens fica vazio
    if (statsBody) {
      statsBody.innerHTML = msg;
      if (langsBody) langsBody.innerHTML = '';
      // Card de linguagens vazio só ocupava espaço (principalmente no celular)
      if (langsCard) langsCard.style.display = "none";
    } else if (langsBody) {
      langsBody.innerHTML = msg;
    }
    hideEmptyCards();
  }

  // Estrelas recebidas = soma de stargazers_count dos repositórios próprios
  // (antes contava os repositórios que ELE marcou com estrela)
  function sumStars(repos) {
    return repos.reduce(function (sum, repo) { return sum + (repo.stargazers_count || 0); }, 0);
  }

  // Soma os bytes de todas as linguagens de cada repo, não só a principal
  function getLanguageTotals(repos) {
    let requests = repos.map(function (repo) {
      return fetch("https://api.github.com/repos/" + userName + "/" + repo.name + "/languages")
        .then(function (r) { return r.ok ? r.json() : {}; })
        .catch(function () { return {}; });
    });

    return Promise.all(requests).then(function (results) {
      let totals = {};
      results.forEach(function (langBytes) {
        Object.keys(langBytes).forEach(function (name) {
          totals[name] = (totals[name] || 0) + langBytes[name];
        });
      });
      return Object.keys(totals)
        .map(function (name) { return [name, totals[name]]; })
        .sort(function (a, b) { return b[1] - a[1]; })
        .slice(0, 6);
    });
  }

  function fetchFresh() {
    return Promise.all([
      fetch("https://api.github.com/users/" + userName).then(function (r) {
        if (!r.ok) throw new Error("user fetch failed");
        return r.json();
      }),
      fetch("https://api.github.com/users/" + userName + "/repos?per_page=100&type=owner").then(function (r) {
        if (!r.ok) throw new Error("repos fetch failed");
        return r.json();
      })
    ]).then(function (results) {
      let user = results[0];
      let repos = results[1];

      return getLanguageTotals(repos).then(function (langs) {
        let data = {
          repos: user.public_repos || 0,
          stars: sumStars(repos),
          followers: user.followers || 0,
          langs: langs
        };

        writeCache(data);
        return data;
      });
    });
  }

  function start() {
    // Ao trocar o idioma, refaz os números no formato do novo idioma (0,6 x 0.6)
    let toggleBtn = document.getElementById("langToggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", function () {
        if (lastData) render(lastData);
      });
    }

    let cached = readCache();
    if (cached) {
      render(cached.data);
    }

    // Cache dentro do TTL: não refaz as ~N+2 chamadas (API sem token = 60 req/hora por IP).
    // Cache vencido continua na tela como fallback se a API falhar.
    if (!cached || !cached.fresh) {
      fetchFresh().then(render).catch(function () {
        if (!cached) renderError();
      });
    }
  }

  // Espera o i18n.js definir window.currentLang (ele registra o DOMContentLoaded antes)
  // para formatar números e textos no idioma certo
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
