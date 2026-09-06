/* =========================================================
   EXPLOITERX PORTFOLIO
   JAVASCRIPT + GITHUB API
   ========================================================= */


/* =========================
   GITHUB CONFIG
========================= */

// SCHIMBĂ ASTA CU USERNAME-UL TĂU GITHUB
const GITHUB_USERNAME = "exploiterx-16gb";


/* =========================
   LOADER
========================= */

const loader = document.getElementById("loader");
const loaderProgress = document.getElementById("loader-progress");
const loaderPercent = document.getElementById("loader-percent");

let progress = 0;

const loadingInterval = setInterval(() => {

    progress += Math.floor(Math.random() * 8) + 3;

    if (progress >= 100) {

        progress = 100;

        clearInterval(loadingInterval);

        loaderProgress.style.width = "100%";
        loaderPercent.textContent = "100%";

        setTimeout(() => {
            loader.classList.add("hidden");
        }, 400);
    }

    loaderProgress.style.width = `${progress}%`;
    loaderPercent.textContent = `${progress}%`;

}, 100);


/* =========================
   MOBILE MENU
========================= */

const menuToggle =
    document.getElementById("menu-toggle");

const navMenu =
    document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    menuToggle.textContent =
        navMenu.classList.contains("active")
            ? "✕"
            : "☰";

});


document.querySelectorAll("#nav-menu a")
.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        menuToggle.textContent = "☰";

    });

});


/* =========================
   TYPING EFFECT
========================= */

const typingText =
    document.getElementById("typing-text");

const phrases = [
    "Python Developer",
    "Cybersecurity Learner",
    "Web Developer",
    "Linux Enthusiast",
    "Security Researcher"
];

let phraseIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {

    const phrase =
        phrases[phraseIndex];

    if (!deleting) {

        typingText.textContent =
            phrase.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;

        if (characterIndex === phrase.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingText.textContent =
            phrase.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            phraseIndex++;

            if (phraseIndex >= phrases.length) {
                phraseIndex = 0;
            }

        }

    }

    setTimeout(
        typeEffect,
        deleting ? 45 : 80
    );
}

typeEffect();


/* =========================
   GITHUB API
========================= */

async function loadGitHub() {

    const projectsContainer =
        document.getElementById("github-projects");

    const repoCount =
        document.getElementById("repo-count");

    const followersCount =
        document.getElementById("followers-count");

    const followingCount =
        document.getElementById("following-count");

    const profileLink =
        document.getElementById("github-profile-link");

    const contactLink =
        document.getElementById("github-contact");


    if (
        !GITHUB_USERNAME ||
        GITHUB_USERNAME === "USERNAME-UL-TAU"
    ) {

        projectsContainer.innerHTML = `
            <div class="github-loading">
                <span>$</span>
                Configurează username-ul GitHub în script.js
            </div>
        `;

        return;
    }


    try {

        /*
         * Get GitHub profile
         */

        const userResponse =
            await fetch(
                `https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}`
            );


        if (!userResponse.ok) {
            throw new Error("GitHub user not found");
        }


        const user =
            await userResponse.json();


        /*
         * Get repositories
         */

        const repoResponse =
            await fetch(
                `https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}/repos?sort=updated&per_page=100`
            );


        if (!repoResponse.ok) {
            throw new Error("Could not load repositories");
        }


        const repositories =
            await repoResponse.json();


        /*
         * Statistics
         */

        repoCount.textContent =
            user.public_repos ?? repositories.length;

        followersCount.textContent =
            user.followers ?? 0;

        followingCount.textContent =
            user.following ?? 0;


        /*
         * Profile links
         */

        profileLink.href =
            user.html_url;

        contactLink.href =
            user.html_url;


        /*
         * Clear loading message
         */

        projectsContainer.innerHTML = "";


        /*
         * No repositories
         */

        if (!repositories.length) {

            projectsContainer.innerHTML = `
                <div class="github-loading">
                    <span>$</span>
                    Nu există repository-uri publice momentan.
                </div>
            `;

            return;
        }


        /*
         * Display repositories
         */

        repositories.forEach((repo) => {

            const card =
                document.createElement("article");

            card.className = "project-card";


            const language =
                repo.language || "Code";


            const description =
                repo.description ||
                "Proiect GitHub fără descriere.";


            const updated =
                new Date(repo.updated_at)
                    .toLocaleDateString("ro-RO");


            card.innerHTML = `

                <div class="project-top">

                    <span class="project-status">
                        ● PUBLIC
                    </span>

                    <span class="project-language">
                        ${escapeHTML(language)}
                    </span>

                </div>


                <div class="project-icon">
                    ${getLanguageIcon(language)}
                </div>


                <h3>
                    ${escapeHTML(repo.name)}
                </h3>


                <p>
                    ${escapeHTML(description)}
                </p>


                <div class="project-tags">

                    <span>
                        ${escapeHTML(language)}
                    </span>

                    <span>
                        ⭐ ${repo.stargazers_count}
                    </span>

                    <span>
                        🍴 ${repo.forks_count}
                    </span>

                </div>


                <div class="project-links">

                    <a
                        href="${repo.html_url}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub →
                    </a>

                    ${
                        repo.homepage
                            ? `
                                <a
                                    href="${repo.homepage}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Demo →
                                </a>
                              `
                            : ""
                    }

                </div>


                <small
                    style="
                        display:block;
                        margin-top:18px;
                        color:#687582;
                        font-family:monospace;
                        font-size:.65rem;
                    "
                >
                    Updated: ${updated}
                </small>

            `;


            projectsContainer.appendChild(card);

        });


        /*
         * Animate cards
         */

        document
            .querySelectorAll(".project-card")
            .forEach((card, index) => {

                card.style.opacity = "0";

                setTimeout(() => {

                    card.style.animation =
                        "fadeUp .6s ease forwards";

                }, index * 80);

            });


    } catch (error) {

        console.error(
            "GitHub API error:",
            error
        );


        projectsContainer.innerHTML = `

            <div class="github-loading">

                <span>$ ERROR:</span>

                Nu am putut încărca proiectele GitHub.

                <br><br>

                Verifică username-ul GitHub.

            </div>

        `;

    }

}


/* =========================
   HTML ESCAPE
========================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        String(value);

    return div.innerHTML;
}


/* =========================
   LANGUAGE ICON
========================= */

function getLanguageIcon(language) {

    const icons = {

        JavaScript: "🟨",
        TypeScript: "🔷",
        Python: "🐍",
        HTML: "🌐",
        CSS: "🎨",
        Java: "☕",
        C: "⚙️",
        "C++": "⚙️",
        "C#": "🎮",
        PHP: "🐘",
        Rust: "🦀",
        Go: "🐹",
        Shell: "💻"

    };

    return icons[language] || "📁";
}


/* =========================
   START GITHUB
========================= */

loadGitHub();


/* =========================
   BACK TO TOP
========================= */

const backToTop =
    document.getElementById("back-to-top");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll("#nav-menu a");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top =
            section.offsetTop - 160;

        if (window.scrollY >= top) {
            current = section.id;
        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================
   TERMINAL EFFECT
========================= */

const terminalOutputs =
    document.querySelectorAll(".terminal-output");

terminalOutputs.forEach((element, index) => {

    const text =
        element.textContent;

    element.textContent = "";

    let char = 0;

    setTimeout(() => {

        const interval =
            setInterval(() => {

                element.textContent =
                    text.substring(0, char + 1);

                char++;

                if (char >= text.length) {
                    clearInterval(interval);
                }

            }, 25);

    }, 1000 + index * 700);

});


/* =========================
   PROJECT CARD TILT
========================= */

document
    .addEventListener("mousemove", (event) => {

        if (window.innerWidth < 800) return;

        const cards =
            document.querySelectorAll(".project-card");

        cards.forEach(card => {

            const rect =
                card.getBoundingClientRect();

            if (
                event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom
            ) {
                return;
            }

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateX =
                ((y - rect.height / 2) /
                    (rect.height / 2)) * -2;

            const rotateY =
                ((x - rect.width / 2) /
                    (rect.width / 2)) * 2;

            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-7px)`;

        });

    });


document.addEventListener("mouseleave", () => {

    document
        .querySelectorAll(".project-card")
        .forEach(card => {

            card.style.transform =
                "translateY(0)";

        });

});


/* =========================
   CURRENT YEAR
========================= */

document.getElementById(
    "current-year"
).textContent =
    new Date().getFullYear();


/* =========================
   CONSOLE
========================= */

console.log(
    "%c EXPLOITERX PORTFOLIO ",
    "color:#00ff9c;font-size:20px;font-weight:bold;"
);

console.log(
    "%c GitHub API initialized.",
    "color:#84909d;font-size:13px;"
);
