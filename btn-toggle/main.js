function getSystemDefaultTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    document.getElementById('toggle').checked = theme === 'dark';
}

window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', e => {
    const newTheme = e.matches ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });

(function () {
    let theme = localStorage.getItem('theme');

    if (!theme) {
        theme = getSystemDefaultTheme();
        localStorage.setItem('theme', theme);
    }

    applyTheme(theme);
})();

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.transition = 'background-color 0.5s, color 0.5s';
});

document.getElementById('toggle').addEventListener('change', function () {
    let theme = this.checked ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    applyTheme(theme);
});
