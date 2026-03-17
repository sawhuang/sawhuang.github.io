const toggleButton = document.getElementById("theme-toggle");

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    if (toggleButton) toggleButton.textContent = "Light Mode";
  } else {
    document.body.classList.remove("dark");
    if (toggleButton) toggleButton.textContent = "Dark Mode";
  }
}

const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

if (toggleButton) {
  toggleButton.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  });
}



/* =========================
   ROTATING SUBTITLE
========================= */
const rotatingWords = [
  "machine learning",
  "forecasting",
  "analytics engineering",
  "dashboarding",
  "hockey tickets",
  "AI",
  "stocks",
  "predictive modeling",
  "Valorant",
  "KPIs",
  "selling t-shirts and hot dogs",
  "business intelligence",
  "LA Clippers",
  "data pipelines",
  "decision support",
  "data products"
];

const rotatingTextEl = document.getElementById("rotating-text");

if (rotatingTextEl) {
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect() {
    const currentWord = rotatingWords[wordIndex];

    if (!deleting) {
      charIndex++;
      rotatingTextEl.textContent = currentWord.slice(0, charIndex);

      if (charIndex === currentWord.length) {
        deleting = true;
        setTimeout(typeEffect, 1200);
        return;
      }
    } else {
      charIndex--;
      rotatingTextEl.textContent = currentWord.slice(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % rotatingWords.length;
      }
    }

    setTimeout(typeEffect, deleting ? 45 : 85);
  }

  typeEffect();
}

/* =========================
   SCROLL REVEAL
========================= */
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* =========================
   ANIMATED COUNTERS
========================= */
const statNumbers = document.querySelectorAll(".stat-number");

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = parseInt(el.getAttribute("data-target"), 10);
      let current = 0;
      const duration = 1200;
      const stepTime = Math.max(20, Math.floor(duration / target));

      const timer = setInterval(() => {
        current++;
        el.textContent = current;
        if (current >= target) {
          clearInterval(timer);
          el.textContent = target + "+";
        }
      }, stepTime);

      observer.unobserve(el);
    });
  },
  { threshold: 0.6 }
);

statNumbers.forEach((el) => counterObserver.observe(el));

/* =========================
   TILT EFFECT
========================= */
const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

    const projectCard = card.querySelector(".project-card");
    if (projectCard) {
      projectCard.style.setProperty("--mouse-x", `${x}px`);
      projectCard.style.setProperty("--mouse-y", `${y}px`);
    }
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  });
});