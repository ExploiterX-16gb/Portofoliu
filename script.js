(() => {
  const cfg = window.PORTFOLIO_CONFIG || {};

  // Mobile navigation
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("nav");
  if (toggle && nav) toggle.addEventListener("click", () => nav.classList.toggle("open"));

  // Terminal animation
  const terminal = document.querySelector("#terminalText");
  if (terminal) {
    const lines = [
      "$ whoami",
      "exploiterx",
      "",
      "$ mission",
      "learn(); build(); test(); evolve();",
      "",
      "$ status",
      "[+] cybersecurity journey: ACTIVE",
      "[+] responsible testing: ENABLED",
      "[+] curiosity: UNLIMITED",
      "",
      "$ echo "future"",
      "eu sunt viitorul iar viitorul sunt eu"
    ];
    let i = 0;
    const type = () => {
      if (i >= lines.length) return;
      terminal.textContent += lines[i++] + "\n";
      setTimeout(type, 90);
    };
    type();
  }

  // Book download
  const book = document.querySelector("#bookDownload");
  if (book && cfg.BOOK_URL) book.href = cfg.BOOK_URL;

  // GitHub link
  const gh = document.querySelector("#githubLink");
  if (gh && cfg.GITHUB_USER) gh.href = `https://github.com/${cfg.GITHUB_USER}`;

  // Public repositories
  const repoGrid = document.querySelector("#repoGrid");
  if (repoGrid && cfg.GITHUB_USER) {
    fetch(`https://api.github.com/users/${encodeURIComponent(cfg.GITHUB_USER)}/repos?sort=updated&per_page=12`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(repos => {
        if (!repos.length) throw new Error("No repos");
        repoGrid.innerHTML = repos.map(repo => `
          <article class="card repo-card reveal">
            <h3>${escapeHtml(repo.name)}</h3>
            <p>${escapeHtml(repo.description || "Repository fără descriere.")}</p>
            <div class="repo-meta"><span>★ ${repo.stargazers_count}</span><span>⑂ ${repo.forks_count}</span><span>${escapeHtml(repo.language || "Code")}</span></div>
            <p><a href="${repo.html_url}" target="_blank" rel="noopener">Vezi repository →</a></p>
          </article>`).join("");
        observe();
      })
      .catch(() => {
        repoGrid.innerHTML = `<article class="card"><h3>Repository-urile vor apărea aici</h3><p>Verifică username-ul din config.js și conexiunea la GitHub.</p></article>`;
      });
  }

  function escapeHtml(v) {
    return String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  }

  function observe() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("visible")); return; }
    const io = new IntersectionObserver(entries => entries.forEach(x => x.isIntersecting && x.target.classList.add("visible")), {threshold:.12});
    els.forEach(e => io.observe(e));
  }
  observe();
})();
