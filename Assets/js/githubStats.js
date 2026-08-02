// Busca estatísticas públicas do GitHub direto da API oficial (api.github.com),
// evitando depender de serviços terceiros de geração de imagem (ex: github-readme-stats),
// que sofrem rate-limit por serem compartilhados por milhões de perfis.
(function () {
  var USERNAME = "GuiSilva-Dev";
  var CACHE_KEY = "gh-stats-cache-v2";
  var CACHE_TTL = 60 * 60 * 1000; // 1 hora

  var statsBody = document.getElementById("gh-stats-body");
  var langsBody = document.getElementById("gh-langs-body");
  if (!statsBody && !langsBody) return;

  function t(key) {
    var lang = (window.currentLang === "en") ? "en" : "pt";
    var dict = (window.translations || {})[lang] || {};
    return dict[key] || key;
  }

  function readCache() {
    try {
      var raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (Date.now() - parsed.ts > CACHE_TTL) return null;
      return parsed.data;
    } catch (e) {
      return null;
    }
  }

  function writeCache(data) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: data }));
    } catch (e) {
      /* localStorage indisponível (modo privado etc.) - segue sem cache */
    }
  }

  function render(data) {
    // Tempo codando não vem da API (não é algo que o GitHub mede) - valor
    // fixo, calculado aqui dentro pra pegar o idioma já detectado.
    var codingYears = (window.currentLang === "en") ? "0.4" : "0,4";

    if (statsBody) {
      statsBody.innerHTML =
        '<div class="gh-stat-item"><span class="gh-stat-num">' + data.repos + '</span><span class="gh-stat-label" data-i18n="github.stat.repos">' + t("github.stat.repos") + '</span></div>' +
        '<div class="gh-stat-item"><span class="gh-stat-num">' + data.stars + '</span><span class="gh-stat-label" data-i18n="github.stat.stars">' + t("github.stat.stars") + '</span></div>' +
        '<div class="gh-stat-item"><span class="gh-stat-num">' + codingYears + '</span><span class="gh-stat-label" data-i18n="github.stat.codingTime">' + t("github.stat.codingTime") + '</span></div>';
    }

    if (langsBody) {
      var langs = data.langs || [];
      if (!langs.length) {
        langsBody.innerHTML = '<div class="gh-loading">—</div>';
      } else {
        var max = langs[0][1];
        var total = langs.reduce(function (sum, entry) { return sum + entry[1]; }, 0);
        langsBody.innerHTML = langs.map(function (entry) {
          var name = entry[0];
          var bytes = entry[1];
          var barPct = Math.round((bytes / max) * 100);
          var sharePct = total ? Math.round((bytes / total) * 100) : 0;
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
    var msg = '<div class="gh-error">' + t("github.error") + '</div>';
    if (statsBody) statsBody.innerHTML = msg;
    if (langsBody) langsBody.innerHTML = msg;
  }

  // Conta o total de repositórios estrelados via o cabeçalho Link (paginação),
  // sem precisar baixar as 4 páginas inteiras - é a mesma métrica que o
  // próprio GitHub mostra na aba "Stars" do perfil.
  function getStarredCount() {
    return fetch("https://api.github.com/users/" + USERNAME + "/starred?per_page=1").then(function (r) {
      if (!r.ok) throw new Error("starred fetch failed");
      var link = r.headers.get("Link");
      if (!link) {
        return r.json().then(function (arr) { return arr.length; });
      }
      var match = link.match(/[?&]page=(\d+)>; rel="last"/);
      return match ? parseInt(match[1], 10) : 0;
    });
  }

  // Soma os bytes de CADA linguagem em CADA repositório (endpoint /languages),
  // em vez de só contar a linguagem "principal" de cada repo. É o mesmo método
  // usado pelo github-readme-stats e reflete melhor o que foi mais usado de
  // fato, já que um repo de front-end costuma ter mais bytes de CSS/HTML do
  // que de JS mesmo quando o JS é a parte que mais importa.
  function getLanguageTotals(repos) {
    var requests = repos.map(function (repo) {
      return fetch("https://api.github.com/repos/" + USERNAME + "/" + repo.name + "/languages")
        .then(function (r) { return r.ok ? r.json() : {}; })
        .catch(function () { return {}; });
    });

    return Promise.all(requests).then(function (results) {
      var totals = {};
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
      fetch("https://api.github.com/users/" + USERNAME).then(function (r) {
        if (!r.ok) throw new Error("user fetch failed");
        return r.json();
      }),
      fetch("https://api.github.com/users/" + USERNAME + "/repos?per_page=100&type=owner").then(function (r) {
        if (!r.ok) throw new Error("repos fetch failed");
        return r.json();
      }),
      getStarredCount()
    ]).then(function (results) {
      var user = results[0];
      var repos = results[1];
      var starredCount = results[2];

      return getLanguageTotals(repos).then(function (langs) {
        var data = {
          repos: user.public_repos || 0,
          stars: starredCount,
          followers: user.followers || 0,
          langs: langs
        };

        writeCache(data);
        return data;
      });
    });
  }

  var cached = readCache();
  if (cached) {
    render(cached);
  }

  fetchFresh().then(render).catch(function () {
    if (!cached) renderError();
  });
})();
