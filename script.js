
/* =========================================================
   NEXUS ARENA - ADVANCED JAVASCRIPT
   script.js
========================================================= */


/* =========================================================
   SELECT ELEMENTS
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const searchBtn = document.getElementById("searchBtn");
const searchPanel = document.getElementById("searchPanel");
const closeSearch = document.getElementById("closeSearch");
const gameSearch = document.getElementById("gameSearch");

const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeModal = document.getElementById("closeModal");
const loginForm = document.getElementById("loginForm");

const gameModal = document.getElementById("gameModal");
const closeGameModal = document.getElementById("closeGameModal");
const selectedGame = document.getElementById("selectedGame");
const launchGameBtn = document.getElementById("launchGameBtn");

const toast = document.getElementById("toast");

const watchBtn = document.getElementById("watchBtn");
const joinBtn = document.getElementById("joinBtn");

const filters = document.querySelectorAll(".filter");
const gameCards = document.querySelectorAll(".game-card");
const playButtons = document.querySelectorAll(".play-game");



/* =========================================================
   MOBILE MENU
========================================================= */

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("open");

    const icon = menuBtn.querySelector("i");

    if (navLinks.classList.contains("open")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});



/* =========================================================
   SEARCH PANEL
========================================================= */

searchBtn.addEventListener("click", () => {

    searchPanel.classList.toggle("active");

    if (searchPanel.classList.contains("active")) {

        setTimeout(() => {
            gameSearch.focus();
        }, 300);

    }

});


closeSearch.addEventListener("click", () => {

    searchPanel.classList.remove("active");

    gameSearch.value = "";

    gameCards.forEach(card => {
        card.classList.remove("hidden");
    });

});



/* =========================================================
   LIVE GAME SEARCH
========================================================= */

gameSearch.addEventListener("input", () => {

    const searchValue = gameSearch.value
        .toLowerCase()
        .trim();

    gameCards.forEach(card => {

        const gameName =
            card.querySelector("h3").textContent.toLowerCase();

        const gameDescription =
            card.querySelector(".game-info p").textContent.toLowerCase();

        if (
            gameName.includes(searchValue) ||
            gameDescription.includes(searchValue)
        ) {

            card.classList.remove("hidden");

        } else {

            card.classList.add("hidden");

        }

    });

});



/* =========================================================
   GAME CATEGORY FILTER
========================================================= */

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        /* Remove active state */

        filters.forEach(button => {
            button.classList.remove("active-filter");
        });

        /* Add active state */

        filter.classList.add("active-filter");

        const category = filter.dataset.category;

        gameCards.forEach(card => {

            const cardCategory = card.dataset.category;

            if (
                category === "all" ||
                category === cardCategory
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});



/* =========================================================
   GAME PLAY MODAL
========================================================= */

playButtons.forEach(button => {

    button.addEventListener("click", () => {

        const gameName = button.dataset.game;

        selectedGame.textContent = gameName.toUpperCase();

        gameModal.classList.add("active");

        document.body.classList.add("modal-open");

    });

});



/* =========================================================
   CLOSE GAME MODAL
========================================================= */

closeGameModal.addEventListener("click", closeGame);

gameModal.addEventListener("click", (event) => {

    if (event.target === gameModal) {
        closeGame();
    }

});


function closeGame() {

    gameModal.classList.remove("active");

    document.body.classList.remove("modal-open");

}



/* =========================================================
   LAUNCH GAME
========================================================= */

launchGameBtn.addEventListener("click", () => {

    launchGameBtn.disabled = true;

    launchGameBtn.innerHTML =
        `<i class="fa-solid fa-spinner fa-spin"></i> Loading...`;

    const loader =
        document.querySelector(".launch-loader span");

    loader.style.transition = "width 2s ease";
    loader.style.width = "100%";


    setTimeout(() => {

        showToast(
            `${selectedGame.textContent} is ready! Connect your actual game here.`
        );

        launchGameBtn.disabled = false;

        launchGameBtn.innerHTML =
            `Launch Game <i class="fa-solid fa-rocket"></i>`;

        loader.style.width = "0%";

        closeGame();

    }, 2200);

});



/* =========================================================
   LOGIN MODAL
========================================================= */

loginBtn.addEventListener("click", () => {

    loginModal.classList.add("active");

    document.body.classList.add("modal-open");

});


closeModal.addEventListener("click", () => {

    closeLogin();

});


loginModal.addEventListener("click", (event) => {

    if (event.target === loginModal) {
        closeLogin();
    }

});


function closeLogin() {

    loginModal.classList.remove("active");

    document.body.classList.remove("modal-open");

}



/* =========================================================
   LOGIN FORM
========================================================= */

loginForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const playerName =
        loginForm.querySelector("input[type='text']").value.trim();

    if (playerName === "") {

        showToast("Please enter your player name.");

        return;

    }

    closeLogin();

    showToast(
        `Welcome to NEXUS ARENA, ${playerName}! 🎮`
    );

    loginForm.reset();

});



/* =========================================================
   JOIN ARENA
========================================================= */

joinBtn.addEventListener("click", () => {

    loginModal.classList.add("active");

    document.body.classList.add("modal-open");

});



/* =========================================================
   WATCH TRAILER
========================================================= */

watchBtn.addEventListener("click", () => {

    showToast(
        "Trailer system activated. Add your trailer video here."
    );

});



/* =========================================================
   FEATURED GAME
========================================================= */

document.querySelector(".play-featured")
    .addEventListener("click", () => {

        selectedGame.textContent =
            "GALACTIC DOMINATION";

        gameModal.classList.add("active");

        document.body.classList.add("modal-open");

    });



/* =========================================================
   TOAST NOTIFICATION
========================================================= */

let toastTimer;


function showToast(message) {

    clearTimeout(toastTimer);

    toast.textContent = message;

    toast.classList.add("show");


    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3500);

}



/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeLogin();
        closeGame();

        searchPanel.classList.remove("active");

    }

});



/* =========================================================
   NAVBAR ACTIVE LINK
========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navItems =
    document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navItems.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});



/* =========================================================
   REVEAL ANIMATION
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".game-card, .leader-row, .featured-stat, .cta-content"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition = "0.6s ease";

    observer.observe(element);

});



/* =========================================================
   RANDOM LIVE PLAYER COUNTER
========================================================= */

let playersOnline = 125000;

setInterval(() => {

    const change =
        Math.floor(Math.random() * 401) - 200;

    playersOnline += change;

    if (playersOnline < 100000) {
        playersOnline = 100000;
    }

    const featuredPlayerElement =
        document.querySelector(
            ".featured-stat h3"
        );

    if (featuredPlayerElement) {

        featuredPlayerElement.textContent =
            Math.floor(playersOnline / 1000) + "K";

    }

}, 3000);



/* =========================================================
   CONSOLE RANDOM STATUS
========================================================= */

const consoleMessages = [
    "PLAYER READY",
    "SYSTEM ONLINE",
    "MATCH FOUND",
    "ARENA READY",
    "LOBBY OPEN"
];

const consoleStatus =
    document.querySelector(".console-screen p");


setInterval(() => {

    const randomMessage =
        consoleMessages[
            Math.floor(
                Math.random() * consoleMessages.length
            )
        ];

    consoleStatus.textContent =
        randomMessage;

}, 2500);



/* =========================================================
   PREVENT DEMO SOCIAL LINKS
========================================================= */

document.querySelectorAll(".social-links a")
    .forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            showToast(
                "Social profile coming soon!"
            );

        });

    });



/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        showToast(
            "NEXUS ARENA systems online. Welcome, player! 🎮"
        );

    }, 1000);

});

