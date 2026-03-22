/* Eggologic — Dark/Light Theme */
// Rushed this one up with Claude - there may be errors, comms might be ultra-corny at the CSS file - that kinda stuff. 
// I personally love the OG page. 
// I know it's an Industry standard nowadays to have both modes, but pls use the light one. Design system is intended in that way
(function () {
  var html = document.documentElement;
  var key = 'eggologic-theme';

  // Apply system preference (before paint)
  var saved = localStorage.getItem(key);
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.remove('light');
    html.classList.add('dark');
  }

  // Toggle function
  window.toggleTheme = function () {
    var isDark = html.classList.contains('dark');
    html.classList.remove(isDark ? 'dark' : 'light');
    html.classList.add(isDark ? 'light' : 'dark');
    localStorage.setItem(key, isDark ? 'light' : 'dark');
    updateToggleIcons();
  };

  // Swap icon in all toggle buttons on the page
  function updateToggleIcons() {
    var isDark = html.classList.contains('dark');
    document.querySelectorAll('.theme-toggle-icon').forEach(function (el) {
      el.textContent = isDark ? 'light_mode' : 'dark_mode';
    });
  }

  // Run once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateToggleIcons);
  } else {
    updateToggleIcons();
  }
})();
