export const themeScript = `
  (function() {
    function getTheme() {
      const saved = localStorage.getItem('theme');
      if (saved && ['light', 'dark', 'system'].includes(saved)) {
        return saved;
      }
      return 'system';
    }
    
    function applyTheme(theme) {
      const resolved = theme === 'system' 
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : theme;
      
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(resolved);
      document.documentElement.setAttribute('data-theme', resolved);
    }
    
    const theme = getTheme();
    applyTheme(theme);
    
    // Listen for system changes if using system theme
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', () => applyTheme('system'));
    }
  })();
`;