// =========================
// RESTORE SAVED THEME
// =========================

const savedTheme =
  localStorage.getItem("theme");

if (savedTheme) {

  document.body.dataset.theme =
    savedTheme;

}

// =========================
// LOAD HTML SECTIONS
// =========================

const sectionIds = [
  "hero",
  "about",
  "skills",
  "projects",
  "contact",
  "footer"
];


async function loadSections() {

  const main =
    document.getElementById("main-content");

  const loader =
    document.querySelector(".loader-wrapper");

  if (!main) return;

  try {

    for (const section of sectionIds) {

      const response =
        await fetch(`sections/${section}.html`);

      if (!response.ok) {
        console.error(
          `Unable to load section: ${section}`
        );
        continue;
      }

      const html =
        await response.text();

      main.insertAdjacentHTML(
        "beforeend",
        html
      );
    }

    initializeWebsite();

  } catch (error) {

    console.error(error);

  } finally {

    loader?.classList.add("hidden");
  }
}


loadSections();

function initializeWebsite() {
  const loader = document.querySelector(".loader-wrapper");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const typingText = document.querySelector(".typing-text");
  const scrollTopBtn = document.querySelector(".scroll-top");
  const themeToggle = document.querySelector(".theme-toggle");
  const pageSections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-link");
  const reveals = document.querySelectorAll(".reveal");


  // =========================
  // MOBILE NAVIGATION
  // =========================

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // =========================
  // NAVBAR SCROLL EFFECT
  // =========================

  const header =
    document.querySelector(".header");

  window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  });

  // =========================
  // TYPING EFFECT
  // =========================
  if (typingText) {
    const roles = [
      "Frontend Developer",
      "UI Designer",
      "Web Creator",
      "Beginner Programmer"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (!deleting) {
        typingText.textContent = currentRole.substring(0, charIndex++);

        if (charIndex > currentRole.length) {
          deleting = true;
          setTimeout(typeEffect, 1500);
          return;
        }
      } else {
        typingText.textContent = currentRole.substring(0, charIndex--);

        if (charIndex < 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      setTimeout(typeEffect, deleting ? 50 : 100);
    }

    typeEffect();
  }

  // =========================
  // SCROLL REVEAL
  // =========================
  function revealSections() {
    reveals.forEach((section) => {
      const windowHeight = window.innerHeight;
      const revealTop = section.getBoundingClientRect().top;

      if (revealTop < windowHeight - 100) {
        section.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealSections);
  revealSections();

  // =========================
  // SCROLL TOP BUTTON
  // =========================
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add("show");
      } else {
        scrollTopBtn.classList.remove("show");
      }
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // =========================
  // ACTIVE NAVIGATION
  // =========================
  window.addEventListener("scroll", () => {
    let current = "";

    pageSections.forEach((section) => {
      const sectionTop = section.offsetTop - 200;

      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  // =========================
  // INITIAL THEME ICON
  // =========================

  if (themeToggle) {

    if (
      document.body.dataset.theme === "light"
    ) {

      themeToggle.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

    } else {

      themeToggle.innerHTML =
        '<i class="fa-solid fa-moon"></i>';
    }

    // =========================
    // THEME TOGGLE
    // =========================

    themeToggle.addEventListener("click", () => {

      const currentTheme =
        document.body.dataset.theme;

      if (currentTheme === "light") {

        document.body.dataset.theme = "dark";

        themeToggle.innerHTML =
          '<i class="fa-solid fa-moon"></i>';

      } else {

        document.body.dataset.theme = "light";

        themeToggle.innerHTML =
          '<i class="fa-solid fa-sun"></i>';
      }

      localStorage.setItem(
        "theme",
        document.body.dataset.theme
      );

    });
  }

}
