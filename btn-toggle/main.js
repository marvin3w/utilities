function getSystemDefaultTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    document.getElementById('toggle').checked = theme === 'dark';
}

(function () {
    let theme = localStorage.getItem('theme');

    if (!theme) {
        theme = getSystemDefaultTheme();
        localStorage.setItem('theme', theme);
    }

    applyTheme(theme);
})();

document.getElementById('toggle').addEventListener('change', function () {
    let theme = this.checked ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    applyTheme(theme);
});
