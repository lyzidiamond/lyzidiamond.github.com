document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const toggle = document.getElementById("theme-toggle");
  if (!toggle || !body) return;

  const STORAGE_KEY = "theme";

  function systemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  // Apply saved or default theme
  const saved = localStorage.getItem(STORAGE_KEY);
  body.setAttribute("a", saved || "auto");

  toggle.addEventListener("click", function () {
    const current = body.getAttribute("a");
    const next =
      current === "dark" ? "light" :
      current === "light" ? "dark" :
      systemTheme() === "dark" ? "light" : "dark";

    body.setAttribute("a", next);
    localStorage.setItem(STORAGE_KEY, next);
  });
});
