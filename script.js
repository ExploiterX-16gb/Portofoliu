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
