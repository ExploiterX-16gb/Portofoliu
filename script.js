// =====================================================
// NOXERX — PORTFOLIO SCRIPT
// =====================================================

"use strict";


// =====================================================
// DOM ELEMENTS
// =====================================================

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const typingText = document.getElementById("typingText");
const yearElement = document.getElementById("year");


// =====================================================
// CURRENT YEAR
// =====================================================

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// =====================================================
// MOBILE MENU
// =====================================================

if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

        if (mobileMenu.classList.contains("active")) {

            menuButton.textContent = "✕";

        } else {

            menuButton.textContent = "☰";

        }

    });


    // Close menu when clicking a link

    const mobileLinks =
        mobileMenu.querySelectorAll("a");

    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

            menuButton.textContent = "☰";

        });

    });

}


// =====================================================
// TERMINAL TYPING EFFECT
// =====================================================

const terminalCommands = [
    "whoami",
    "cat mission.txt",
    "ls projects/",
    "nmap --help",
    "learn --every-day"
];

let commandIndex = 0;
let characterIndex = 0;
let deleting = false;


function typeTerminalCommand() {

    if (!typingText) return;


    const currentCommand =
        terminalCommands[commandIndex];


    if (!deleting) {

        typingText.textContent =
            currentCommand.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        if (characterIndex === currentCommand.length) {

            deleting = true;

            setTimeout(
                typeTerminalCommand,
                1800
            );

            return;
        }


        setTimeout(
            typeTerminalCommand,
            70
        );

    } else {

        typingText.textContent =
            currentCommand.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        if (characterIndex === 0) {

            deleting = false;

            commandIndex =
                (commandIndex + 1) %
                terminalCommands.length;

            setTimeout(
                typeTerminalCommand,
                400
            );

            return;
        }


        setTimeout(
            typeTerminalCommand,
            35
        );
    }

}


typeTerminalCommand();


// =====================================================
// SCROLL REVEAL
// =====================================================

const revealElements =
    document.querySelectorAll(
        ".skill-card, " +
        ".project-card, " +
        ".about-text, " +
        ".about-card, " +
        ".book-container, " +
        ".goal-card, " +
        ".github-inner, " +
        ".final-section"
    );


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }


                entry.target.classList.add(
                    "revealed"
                );


                observer.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

    revealObserver.observe(element);

});


// =====================================================
// REVEAL STYLE
// =====================================================

const revealStyle = document.createElement("style");

revealStyle.textContent = `

    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

`;

document.head.appendChild(revealStyle);


// =====================================================
// STAGGER PROJECT / SKILL ANIMATIONS
// =====================================================

const cards = document.querySelectorAll(
    ".skill-card, .project-card, .goal-card"
);


cards.forEach((card, index) => {

    card.style.transitionDelay =
        `${(index % 4) * 80}ms`;

});


// =====================================================
// NAVBAR SCROLL EFFECT
// =====================================================

const navbar =
    document.querySelector(".navbar");


window.addEventListener(
    "scroll",
    () => {

        if (!navbar) return;


        if (window.scrollY > 40) {

            navbar.style.background =
                "rgba(3, 6, 5, 0.94)";

            navbar.style.boxShadow =
                "0 10px 40px rgba(0, 0, 0, 0.25)";

        } else {

            navbar.style.background =
                "rgba(3, 6, 5, 0.78)";

            navbar.style.boxShadow =
                "none";

        }

    },
    {
        passive: true
    }
);


// =====================================================
// ACTIVE NAVIGATION LINK
// =====================================================

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navigationLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


const activeObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }


                const sectionId =
                    entry.target.getAttribute("id");


                navigationLinks.forEach((link) => {

                    link.classList.remove(
                        "active"
                    );


                    if (
                        link.getAttribute("href") ===
                        `#${sectionId}`
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                });

            });

        },
        {
            rootMargin:
                "-35% 0px -55% 0px"
        }
    );


sections.forEach((section) => {

    activeObserver.observe(section);

});


// =====================================================
// SMOOTH INTERNAL LINKS
// =====================================================

document.querySelectorAll(
    'a[href^="#"]'
).forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const targetId =
                link.getAttribute("href");


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

});


// =====================================================
// CARD MOUSE GLOW
// =====================================================

const interactiveCards =
    document.querySelectorAll(
        ".skill-card, " +
        ".project-card, " +
        ".goal-card, " +
        ".about-card"
    );


interactiveCards.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            card.style.background =
                `
                radial-gradient(
                    350px circle at ${x}px ${y}px,
                    rgba(57, 255, 136, 0.07),
                    transparent 55%
                ),
                #08100c
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.background = "";

        }
    );

});


// =====================================================
// TERMINAL RANDOM STATUS
// =====================================================

const statusMessages = [
    "SYSTEM ONLINE",
    "LEARNING MODE",
    "BUILDING PROJECTS",
    "RESEARCH ACTIVE",
    "NoxerX ONLINE"
];


const onlineElement =
    document.querySelector(".online");


let statusIndex = 0;


function rotateStatus() {

    if (!onlineElement) return;


    onlineElement.textContent =
        "● " +
        statusMessages[statusIndex];


    statusIndex =
        (statusIndex + 1) %
        statusMessages.length;

}


setInterval(
    rotateStatus,
    3500
);


// =====================================================
// EASTER EGG — KONAMI STYLE
// =====================================================

const secretSequence = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight"
];


let secretIndex = 0;


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key ===
            secretSequence[secretIndex]
        ) {

            secretIndex++;


            if (
                secretIndex ===
                secretSequence.length
            ) {

                activateNoxerMode();

                secretIndex = 0;

            }

        } else {

            secretIndex = 0;

        }

    }
);


// =====================================================
// NOXER MODE
// =====================================================

function activateNoxerMode() {

    document.body.classList.add(
        "noxer-mode"
    );


    const message =
        document.createElement("div");


    message.textContent =
        "NOXERX // DEEP MODE ACTIVATED";


    message.style.position = "fixed";

    message.style.left = "50%";

    message.style.top = "50%";

    message.style.transform =
        "translate(-50%, -50%)";

    message.style.zIndex = "9999";

    message.style.padding =
        "20px 25px";

    message.style.border =
        "1px solid #39ff88";

    message.style.background =
        "#030605";

    message.style.color =
        "#39ff88";

    message.style.fontFamily =
        "JetBrains Mono, monospace";

    message.style.fontSize =
        "12px";

    message.style.boxShadow =
        "0 0 50px rgba(57,255,136,.25)";


    document.body.appendChild(
        message
    );


    setTimeout(() => {

        message.remove();

    }, 2200);

}


// =====================================================
// PERFORMANCE / VISIBILITY
// =====================================================

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden &&
            typingText
        ) {

            typingText.style.opacity =
                "0";

        } else if (typingText) {

            typingText.style.opacity =
                "1";

        }

    }
);


// =====================================================
// CONSOLE MESSAGE
// =====================================================

console.log(
    "%c NOXERX ",
    "color:#030605;background:#39ff88;font-weight:bold;padding:6px 10px;"
);

console.log(
    "%cExploiterX // Cybersecurity • Development • Research",
    "color:#39ff88;font-family:monospace;font-size:12px;"
);

console.log(
    "%cNu pretind că le știu pe toate. Învăț. Construiesc. Testez. Evoluez.",
    "color:#8da096;font-family:monospace;"
);


// =====================================================
// END
// =====================================================
