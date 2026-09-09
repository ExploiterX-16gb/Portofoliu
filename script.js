const typingEl = document.getElementById("typing");
const phrases = ["scan --authorized --target lab", "analyze --web-security", "build --defensive-tooling", "learn --repeat"];
let phraseIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const phrase = phrases[phraseIndex];
  typingEl.textContent = deleting ? phrase.slice(0, charIndex--) : phrase.slice(0, charIndex++);
  let speed = deleting ? 38 : 72;
  if (!deleting && charIndex > phrase.length) { deleting = true; speed = 1100; }
  else if (deleting && charIndex < 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    charIndex = 0;
    speed = 300;
  }
  setTimeout(typeLoop, speed);
}
typeLoop();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold: 0.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

const toast = document.getElementById("toast");
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

document.querySelectorAll("[data-demo]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    showToast(`${link.dataset.demo} — demo link ready to connect.`);
  });
});

document.getElementById("copyHandle").addEventListener("click", async () => {
  const handle = "ExploiterX-16gb";
  try {
    await navigator.clipboard.writeText(handle);
    document.getElementById("copyMessage").textContent = "✓ GitHub handle copied: " + handle;
    showToast("GitHub handle copied.");
  } catch {
    document.getElementById("copyMessage").textContent = "GitHub: " + handle;
  }
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior:"smooth", block:"start"});
    }
  });
});

// GitHub repository index — public repositories only.
const repoGrid = document.getElementById("repoGrid");
const repoCount = document.getElementById("repoCount");

async function loadRepositories() {
  if (!repoGrid) return;
  try {
    const response = await fetch("https://api.github.com/users/ExploiterX-16gb/repos?per_page=100&sort=updated");
    if (!response.ok) throw new Error("GitHub API unavailable");
    const repos = await response.json();
    repoCount.textContent = `${repos.length} PUBLIC REPOSITORIES · LIVE FROM GITHUB`;
    repoGrid.innerHTML = "";

    repos.forEach(repo => {
      const card = document.createElement("article");
      card.className = "repo-card reveal visible";
      const language = repo.language || "Mixed";
      const forkLabel = repo.fork ? "FORK" : "PROJECT";
      card.innerHTML = `
        <div class="repo-name">
          <h3>${escapeHtml(repo.name)}</h3>
          <span class="repo-type">${forkLabel}</span>
        </div>
        <p>${escapeHtml(repo.description || "Repository fără descriere — vezi proiectul pe GitHub.")}</p>
        <div class="repo-meta">
          <span class="repo-lang">${escapeHtml(language)}</span>
          <span>★ ${repo.stargazers_count}</span>
          <a class="repo-link" href="${repo.html_url}" target="_blank" rel="noopener">Open ↗</a>
        </div>`;
      repoGrid.appendChild(card);
    });
  } catch (error) {
    repoCount.textContent = "GITHUB INDEX OFFLINE";
    repoGrid.innerHTML = `<div class="repo-loading">Nu am putut încărca repository-urile automat. <a href="https://github.com/ExploiterX-16gb?tab=repositories" target="_blank" rel="noopener" style="color:var(--accent)">Deschide GitHub ↗</a></div>`;
  }
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[char]));
}
loadRepositories();
