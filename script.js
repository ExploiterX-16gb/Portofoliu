/* =========================================================
   EXPLOITERX-16GB — CYBERSECURITY PORTFOLIO
   Main JavaScript
========================================================= */

"use strict";


/* =========================================================
   DOM ELEMENTS
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

const currentYear = document.getElementById("currentYear");
const backToTop = document.getElementById("backToTop");

const typingCommand = document.getElementById("typingCommand");
const particlesContainer = document.getElementById("particles");


/* =========================================================
   CURRENT YEAR
========================================================= */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("active");
        navMenu.classList.toggle("active");

        const isOpen = navMenu.classList.contains("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            menuToggle.classList.remove("active");
            navMenu.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   TYPING EFFECT
========================================================= */

const commands = [
    "whoami",
    "cat profile.txt",
    "./security_lab.sh",
    "nmap --help",
    "git status",
    "python3 security.py"
];

let commandIndex = 0;
let characterIndex = 0;
let deleting = false;


function typeCommand() {

    if (!typingCommand) {
        return;
    }

    const currentCommand = commands[commandIndex];

    if (!deleting) {

        typingCommand.textContent =
            currentCommand.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentCommand.length) {

            deleting = true;

            setTimeout(typeCommand, 1800);

            return;
        }

    } else {

        typingCommand.textContent =
            currentCommand.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            commandIndex =
                (commandIndex + 1) % commands.length;

        }

    }

    setTimeout(
        typeCommand,
        deleting ? 45 : 90
    );
}


typeCommand();


/* =========================================================
   PARTICLE SYSTEM
========================================================= */

function createParticles() {

    if (!particlesContainer) {
        return;
    }

    const particleCount =
        window.innerWidth < 768 ? 25 : 50;

    particlesContainer.innerHTML = "";

    for (let i = 0; i < particleCount; i++) {

        const particle =
            document.createElement("span");

        particle.classList.add("particle");

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.top =
            `${Math.random() * 100}%`;

        particle.style.animationDelay =
            `${Math.random() * 8}s`;

        particle.style.animationDuration =
            `${5 + Math.random() * 8}s`;

        particle.style.opacity =
            `${0.2 + Math.random() * 0.6}`;

        particlesContainer.appendChild(particle);
    }
}


createParticles();


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("section[id]");


function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 180;

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") ===
                    `#${sectionId}`
                ) {
                    link.classList.add("active");
                }

            });

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);


/* =========================================================
   BACK TO TOP
========================================================= */

function updateBackToTop() {

    if (!backToTop) {
        return;
    }

    if (window.scrollY > 600) {

        backToTop.classList.add("visible");

    } else {

        backToTop.classList.remove("visible");

    }

}


window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
);


if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".skill-card, " +
    ".project-card, " +
    ".vulnerability-card, " +
    ".info-card, " +
    ".contact-card, " +
    ".status-card, " +
    ".lab-terminal, " +
    ".github-card"
);


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );


revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =========================================================
   STAGGERED CARD ANIMATIONS
========================================================= */

const cardGroups = [
    ".skill-card",
    ".project-card",
    ".vulnerability-card",
    ".contact-card"
];


cardGroups.forEach(selector => {

    const cards =
        document.querySelectorAll(selector);

    cards.forEach((card, index) => {

        card.style.setProperty(
            "--animation-delay",
            `${index * 70}ms`
        );

    });

});


/* =========================================================
   TERMINAL GLITCH EFFECT
========================================================= */

const glitchElements =
    document.querySelectorAll(
        ".hero-title, .section-heading h2"
    );


function randomGlitch() {

    if (glitchElements.length === 0) {
        return;
    }

    const element =
        glitchElements[
            Math.floor(
                Math.random() *
                glitchElements.length
            )
        ];

    element.classList.add("glitch-active");

    setTimeout(() => {

        element.classList.remove(
            "glitch-active"
        );

    }, 180);

}


setInterval(
    randomGlitch,
    4500
);


/* =========================================================
   TERMINAL STATUS CLOCK
========================================================= */

function updateTerminalTime() {

    const timeElements =
        document.querySelectorAll(
            "[data-terminal-time]"
        );

    if (!timeElements.length) {
        return;
    }

    const now = new Date();

    const hours =
        String(now.getHours()).padStart(2, "0");

    const minutes =
        String(now.getMinutes()).padStart(2, "0");

    const seconds =
        String(now.getSeconds()).padStart(2, "0");

    const time =
        `${hours}:${minutes}:${seconds}`;

    timeElements.forEach(element => {
        element.textContent = time;
    });

}


setInterval(
    updateTerminalTime,
    1000
);

updateTerminalTime();


/* =========================================================
   SECURITY CARD HOVER EFFECT
========================================================= */

const securityCards =
    document.querySelectorAll(
        ".vulnerability-card"
    );


securityCards.forEach(card => {

    card.addEventListener(
        "mouseenter",
        () => {

            card.classList.add(
                "security-hover"
            );

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.classList.remove(
                "security-hover"
            );

        }
    );

});


/* =========================================================
   MOUSE PARALLAX EFFECT
========================================================= */

const heroTerminal =
    document.querySelector(".hero-terminal");


if (
    heroTerminal &&
    window.matchMedia("(pointer: fine)").matches
) {

    heroTerminal.addEventListener(
        "mousemove",
        event => {

            const rect =
                heroTerminal.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateX =
                ((y / rect.height) - 0.5) * -5;

            const rotateY =
                ((x / rect.width) - 0.5) * 5;

            heroTerminal.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-3px)`;

        }
    );


    heroTerminal.addEventListener(
        "mouseleave",
        () => {

            heroTerminal.style.transform =
                "";

        }
    );

}


/* =========================================================
   KEYBOARD SHORTCUT
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
         * Press "/" to focus the portfolio search
         * if a search element is added later.
         */

        if (
            event.key === "/" &&
            !["INPUT", "TEXTAREA"].includes(
                document.activeElement.tagName
            )
        ) {

            const search =
                document.querySelector(
                    "#portfolioSearch"
                );

            if (search) {

                event.preventDefault();

                search.focus();

            }

        }

    }
);


/* =========================================================
   EASTER EGG
========================================================= */

let konamiCode = [];

const konamiSequence = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight"
];


document.addEventListener(
    "keydown",
    event => {

        konamiCode.push(event.key);

        if (konamiCode.length >
            konamiSequence.length) {

            konamiCode.shift();

        }

        const matches =
            konamiCode.every(
                (key, index) =>
                    key === konamiSequence[index]
            );

        if (
            matches &&
            konamiCode.length ===
            konamiSequence.length
        ) {

            document.body.classList.toggle(
                "matrix-mode"
            );

            konamiCode = [];

        }

    }
);


/* =========================================================
   ONLINE STATUS
========================================================= */

function setOnlineStatus() {

    const statusElements =
        document.querySelectorAll(
            ".status-online"
        );

    statusElements.forEach(element => {

        element.textContent =
            navigator.onLine
                ? "ONLINE"
                : "OFFLINE";

    });

}


window.addEventListener(
    "online",
    setOnlineStatus
);

window.addEventListener(
    "offline",
    setOnlineStatus
);

setOnlineStatus();


/* =========================================================
   INITIALIZE
========================================================= */

document.body.classList.add(
    "js-enabled"
);

console.log(
    "%c[ EXPLOITERX-16GB ]",
    "font-size: 18px; font-weight: bold;"
);

console.log(
    "%cCybersecurity Portfolio initialized.",
    "font-size: 13px;"
);

console.log(
    "%cAuthorized security testing only.",
    "font-size: 12px;"
);
