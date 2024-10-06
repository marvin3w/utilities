document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('toggleButton');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme) {
      document.body.classList.toggle('dark-mode', currentTheme === 'dark');
  } else {
      const defaultTheme = prefersDarkScheme.matches ? 'dark' : 'light';
      document.body.classList.toggle('dark-mode', defaultTheme === 'dark');
      localStorage.setItem('theme', defaultTheme);
  }

  toggleButton.addEventListener('click', function () {
      const isDarkMode = document.body.classList.toggle('dark-mode');
      const theme = isDarkMode ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
  });
});