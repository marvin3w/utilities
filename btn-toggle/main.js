document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('theme-toggle');
  const toggleIcon = toggleButton.querySelector('.toggle-icon');

  const applyTheme = (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
  
      toggleIcon.textContent = theme === 'dark' ? '🌜' : '🌞';
  };
  
  const detectSystemTheme = () => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
  };

  const initTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
          applyTheme(savedTheme);
      } else {
          const systemTheme = detectSystemTheme();
          applyTheme(systemTheme);
      }
  };

  const toggleTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
  };

  initTheme();

  toggleButton.addEventListener('click', toggleTheme);
});
