// ==============================
// Scroll Reveal Animation
// ==============================
const animatedElements = document.querySelectorAll(
  ".animate-up, .animate-fade"
);

function revealOnScroll() {
  animatedElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add("animate-show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


// ==============================
// Burger Menu Toggle
// ==============================
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// ==============================
// Education Tabs
// ==============================
const tabs = document.querySelectorAll(".edu-tab");
const panels = document.querySelectorAll(".edu-panel");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});


// ==============================
// Dark Mode Toggle
// ==============================
const toggle = document.getElementById("darkModeToggle");
const icon = document.getElementById("themeIcon");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    icon.src = "images/icon/moon.png";
  } else {
    icon.src = "images/icon/sun.png";
  }
});

const texts = [
    "Fresh Graduate",
    "Frontend Developer",
    "Backend Developer"
  ];

  const typingElement = document.getElementById("typing-text");

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingSpeed = 100;
  const deletingSpeed = 60;
  const pauseAfterTyping = 1200;

  function typeEffect() {
    const currentText = texts[textIndex];

    if (!isDeleting) {
      typingElement.textContent = currentText.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, pauseAfterTyping);
      }
    } else {
      typingElement.textContent = currentText.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
    }

    setTimeout(
      typeEffect,
      isDeleting ? deletingSpeed : typingSpeed
    );
  }

  typeEffect();

  const modal = document.getElementById("aboutModal");
const btn = document.getElementById("aboutBtn");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.add("show");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});

document.addEventListener("DOMContentLoaded", () => {
    // Simulate an API request or any async operation
    setTimeout(() => {
        hideLoader();
        showContent();
    }, 3000); // Replace with your actual data loading logic and time

    function hideLoader() {
        const loader = document.getElementById("loader");
        loader.style.display = "none";
    }

    function showContent() {
        const content = document.getElementById("content");
        content.style.display = "block";
    }
});

