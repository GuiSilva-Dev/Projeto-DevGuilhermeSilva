// Estatísticas direto da API do GitHub (serviços como github-readme-stats sofrem rate-limit)
(function () {
  let userName = "GuiSilva-Dev";
  let cacheKey = "gh-stats-cache-v2";
  let cacheTTL = 60 * 60 * 1000; // 1 hora

  let statsBody = document.getElementById("gh-stats-body");
  let langsBody = document.getElementById("gh-langs-body");
  if (!statsBody && !langsBody) return;

  function t(key) {
    let lang = (window.currentLang === "en") ? "en" : "pt";
    let dict = (window.translations || {})[lang] || {};
    return dict[key] || key;
  }

  function readCache() {
    try {
      let raw = localStorage.getItem(cacheKey);
      if (!raw) return { error: "no cache" };
      let parsed = JSON.parse(raw);
      if (Date.now() - parsed.ts > cacheTTL) return { error: "cache expired" };
      return parsed.data;
    } catch (e) {
      return { error: "cache read error" + e.message };
    }
  }

  function writeCache(data) {
    try {
      localStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data: data }));
    } catch (e) {
      return { error: "cache write error" + e.message };
    }
  }

  function render(data) {
    // Tempo codando não vem da API; calculado aqui para usar o idioma detectado
    let dateStart = new Date(2026, 3, 13); // Início do desenvolvimento
    let dateCurrent = new Date();

    const monthsDiff = (dateCurrent.getFullYear() - dateStart.getFullYear()) * 12 + (dateCurrent.getMonth() - dateStart.getMonth()) + (dateCurrent.getDate() >= dateStart.getDate());
    const yearsDiff = monthsDiff / 12;

    const formatNumber = (num) => {
      return num.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    }

    let codingYears = formatNumber(yearsDiff);

    if (statsBody) {
      statsBody.innerHTML =
        '<div class="gh-stat-item"><span class="gh-stat-num">' + data.repos + '</span><span class="gh-stat-label" data-i18n="github.stat.repos">' + t("github.stat.repos") + '</span></div>' +
        '<div class="gh-stat-item"><span class="gh-stat-num">' + data.stars + '</span><span class="gh-stat-label" data-i18n="github.stat.stars">' + t("github.stat.stars") + '</span></div>' +
        '<div class="gh-stat-item"><span class="gh-stat-num">' + codingYears + '</span><span class="gh-stat-label" data-i18n="github.stat.codingTime">' + t("github.stat.codingTime") + '</span></div>';
    }

    if (langsBody) {
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
    let msg = '<div class="gh-error">' + t("github.error") + '</div>';
    if (statsBody) statsBody.innerHTML = msg;
    if (langsBody) langsBody.innerHTML = msg;
  }

  // Total de estrelados pelo cabeçalho Link, sem baixar todas as páginas
  function getStarredCount() {
    return fetch("https://api.github.com/users/" + userName + "/starred?per_page=1").then(function (r) {
      if (!r.ok) throw new Error("starred fetch failed");
      let link = r.headers.get("Link");
      if (!link) {
        return r.json().then(function (arr) { return arr.length; });
      }
      let match = link.match(/[?&]page=(\d+)>; rel="last"/);
      return match ? parseInt(match[1], 10) : 0;
    });
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
      }),
      getStarredCount()
    ]).then(function (results) {
      let user = results[0];
      let repos = results[1];
      let starredCount = results[2];

      return getLanguageTotals(repos).then(function (langs) {
        let data = {
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

  let cached = readCache();
  if (cached) {
    render(cached);
  }

  fetchFresh().then(render).catch(function () {
    if (!cached) renderError();
  });
})();
