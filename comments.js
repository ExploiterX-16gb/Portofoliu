(() => {
  const cfg = window.PORTFOLIO_CONFIG || {};
  const containers = document.querySelectorAll(".giscus");
  if (!containers.length) return;

  const configured =
    cfg.GITHUB_REPO &&
    cfg.GISCUS_REPO_ID &&
    cfg.GISCUS_CATEGORY &&
    cfg.GISCUS_CATEGORY_ID &&
    !String(cfg.GISCUS_REPO_ID).includes("PUNE_") &&
    !String(cfg.GISCUS_CATEGORY_ID).includes("PUNE_");

  if (!configured) {
    containers.forEach(el => {
      el.innerHTML = `
        <div class="card">
          <h3>Comentariile sunt aproape gata.</h3>
          <p>Completează valorile Giscus din <code>config.js</code>, apoi activează GitHub Discussions pentru repository.</p>
          <a class="btn ghost" href="https://giscus.app/ro" target="_blank" rel="noopener">Configurează Giscus</a>
        </div>`;
    });
    return;
  }

  const s = document.createElement("script");
  s.src = "https://giscus.app/client.js";
  s.setAttribute("data-repo", cfg.GITHUB_REPO);
  s.setAttribute("data-repo-id", cfg.GISCUS_REPO_ID);
  s.setAttribute("data-category", cfg.GISCUS_CATEGORY);
  s.setAttribute("data-category-id", cfg.GISCUS_CATEGORY_ID);
  s.setAttribute("data-mapping", "pathname");
  s.setAttribute("data-strict", "0");
  s.setAttribute("data-reactions-enabled", "1");
  s.setAttribute("data-emit-metadata", "0");
  s.setAttribute("data-input-position", "bottom");
  s.setAttribute("data-theme", "dark");
  s.setAttribute("data-lang", "ro");
  s.setAttribute("crossorigin", "anonymous");
  s.async = true;
  containers[0].appendChild(s);
})();
