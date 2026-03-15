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
