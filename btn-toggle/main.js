// Declare constants
const DARK_MODE = 'dark-mode';
const THEME_STORAGE_KEY = 'user-theme';
const TOGGLE_ID = 'toggle';

// Functions of theme
const getSystemDefaultTheme = () => 
  window.matchMedia("(prefers-color-scheme: dark)").matches ? DARK_MODE : '';

const saveTheme = (theme) => localStorage.setItem(THEME_STORAGE_KEY, theme);

const loadTheme = () => localStorage.getItem(THEME_STORAGE_KEY);

const applyTheme = (theme) => {
  document.documentElement.classList.toggle(DARK_MODE, theme === DARK_MODE);
  const toggleElement = document.getElementById(TOGGLE_ID);
  if (toggleElement) {
    toggleElement.checked = theme === DARK_MODE;
  }
  updateMetaThemeColor(theme === DARK_MODE);
};

const updateMetaThemeColor = (isDark) => {
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', isDark ? '#27272b' : '#dde1e7');
  }
};

// Event Listeners
const setupEventListeners = () => {
  // System theme change listener
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const storedTheme = loadTheme();
    if (storedTheme === null) {
      const newTheme = e.matches ? DARK_MODE : '';
      applyTheme(newTheme);
      // Não salvamos o tema do sistema para que possa ser atualizado se mudar
    }
  });

  // Toggle switch listener
  const toggleElement = document.getElementById(TOGGLE_ID);
  if (toggleElement) {
    toggleElement.addEventListener('change', function() {
      const theme = this.checked ? DARK_MODE : '';
      applyTheme(theme);
      saveTheme(theme);
    });
  }
};

// Initialize
const initTheme = () => {
  const storedTheme = loadTheme();
  if (storedTheme !== null) {
    applyTheme(storedTheme);
  } else {
    const systemTheme = getSystemDefaultTheme();
    applyTheme(systemTheme);
  }
  // Habilitar transições após o tema inicial ser aplicado
  requestAnimationFrame(() => {
    document.body.classList.add('transitions-enabled');
  });
};

// Execute
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    initTheme();
  });
} else {
  setupEventListeners();
  initTheme();
}