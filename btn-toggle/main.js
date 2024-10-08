// Função para detectar o tema padrão do sistema operacional
function getSystemDefaultTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Função para aplicar o tema
function applyTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    document.getElementById('toggle').checked = theme === 'dark';
}

// Carregar o tema ao iniciar
(function () {
    let theme = localStorage.getItem('theme');

    if (!theme) {
        theme = getSystemDefaultTheme();
        localStorage.setItem('theme', theme);
    }

    applyTheme(theme);
})();

// Alterar o tema ao clicar no toggle
document.getElementById('toggle').addEventListener('change', function () {
    let theme = this.checked ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    applyTheme(theme);
});
