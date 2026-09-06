document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const currentYear = document.getElementById("currentYear");
  const backToTop = document.getElementById("backToTop");
  const typingCommand = document.getElementById("typingCommand");
  const particles = document.getElementById("particles");
  const networkStatus = document.getElementById("networkStatus");

  if (currentYear) currentYear.textContent = new Date().getFullYear();

  // Mobile navigation
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const open = navMenu.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Smooth scrolling with a little offset for the fixed navbar
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      const offset = 82;
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  // Typing terminal
  const commands = [
    "whoami",
    "cat profile.txt",
    "./security_lab.sh",
    "nmap --help",
    "git status",
    "python3 security.py"
  ];

  let commandIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    if (!typingCommand) return;

    const current = commands[commandIndex];

    if (!deleting) {
      charIndex++;
      typingCommand.textContent = current.slice(0, charIndex);
      if (charIndex >= current.length) {
        deleting = true;
        setTimeout(typeLoop, 1300);
        return;
      }
      setTimeout(typeLoop, 75);
    } else {
      charIndex--;
      typingCommand.textContent = current.slice(0, charIndex);
      if (charIndex <= 0) {
        deleting = false;
        commandIndex = (commandIndex + 1) % commands.length;
        setTimeout(typeLoop, 250);
        return;
      }
      setTimeout(typeLoop, 38);
    }
  }
  setTimeout(typeLoop, 900);

  // Ambient particles
  if (particles) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 38; i++) {
      const particle = document.createElement("span");
      particle.className = "particle";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${70 + Math.random() * 40}%`;
      particle.style.animationDuration = `${7 + Math.random() * 10}s`;
      particle.style.animationDelay = `${Math.random() * -12}s`;
      particle.style.opacity = `${0.12 + Math.random() * 0.35}`;
      fragment.appendChild(particle);
    }

    particles.appendChild(fragment);
  }

  // Scroll reveal
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  // Active navigation item
  const sections = [...document.querySelectorAll("main section[id]")];

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

  sections.forEach(section => sectionObserver.observe(section));

  // Back to top
  window.addEventListener("scroll", () => {
    backToTop?.classList.toggle("show", window.scrollY > 700);
  }, { passive: true });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Terminal clock
  const timeNodes = [...document.querySelectorAll("[data-terminal-time]")];
  function updateTime() {
    const now = new Date();
    const value = now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    timeNodes.forEach(node => node.textContent = value);
  }
  updateTime();
  setInterval(updateTime, 1000);

  // Online/offline indicator
  function updateNetwork() {
    if (!networkStatus) return;
    networkStatus.textContent = navigator.onLine ? "ONLINE" : "OFFLINE";
    networkStatus.style.color = navigator.onLine ? "var(--green)" : "var(--yellow)";
  }
  window.addEventListener("online", updateNetwork);
  window.addEventListener("offline", updateNetwork);
  updateNetwork();

  // Subtle hero parallax
  const terminal = document.querySelector(".hero-terminal");
  if (terminal && window.matchMedia("(pointer:fine)").matches) {
    terminal.addEventListener("mousemove", event => {
      const rect = terminal.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      terminal.style.transform = `perspective(900px) rotateY(${x * 3}deg) rotateX(${y * -3}deg)`;
    });
    terminal.addEventListener("mouseleave", () => {
      terminal.style.transform = "";
    });
  }

  // Keyboard shortcut: "/" focuses a future search field when one exists.
  document.addEventListener("keydown", event => {
    if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
      const search = document.getElementById("portfolioSearch");
      if (search) {
        event.preventDefault();
        search.focus();
      }
    }
  });

  // Tiny status pulse in the console for developers.
  console.log("%cEXPL0ITERX-16GB%c portfolio initialized.", "color:#59ffae;font-weight:700", "color:inherit");
  console.log("%cAuthorized testing only. Build. Break. Fix.", "color:#5ee7ff");
});
