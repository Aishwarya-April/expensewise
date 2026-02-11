// Dark Mode Implementation
(function() {
    'use strict';

    // Initialize dark mode on page load
    function initDarkMode() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        
        if (!darkModeToggle) {
            console.warn('Dark mode toggle button not found');
            return;
        }

        // Check if dark mode was previously enabled
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            enableDarkMode();
        }

        // Add click listener
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    function toggleDarkMode() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        if (isDarkMode) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    }

    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
        updateToggleButton(true);
    }

    function disableDarkMode() {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
        updateToggleButton(false);
    }

    function updateToggleButton(isDarkMode) {
        const btn = document.getElementById('darkModeToggle');
        if (!btn) return;

        if (isDarkMode) {
            btn.innerHTML = '<i class="fas fa-sun me-1"></i>Light';
            btn.style.background = '#f0ad4e';
            btn.style.color = '#000';
        } else {
            btn.innerHTML = '<i class="fas fa-moon me-1"></i>Dark';
            btn.style.background = '#2c3e50';
            btn.style.color = '#fff';
        }
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDarkMode);
    } else {
        initDarkMode();
    }
})();
