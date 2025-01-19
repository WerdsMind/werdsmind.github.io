const translations = {
    en: {
        about: "About Me",
        services: "Services",
        projects: "Recent Projects",
        contact: "Contact Me",
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send Message",
        title: "I'm Santiago Delgado, Software Engineer",
    },
    es: {
        about: "Sobre Mí",
        services: "Servicios",
        projects: "Proyectos Recientes",
        contact: "Contáctame",
        name: "Nombre",
        email: "Correo",
        message: "Mensaje",
        send: "Enviar Mensaje",
        title: "Soy Santiago Delgado, Ingeniero de Software"
    }
};


// Detect User Language
function detectUserLanguage() {
    const userLang = navigator.language || navigator.languages[0];
    return userLang.startsWith('es') ? 'es' : 'en';
}

// Detect User Theme
function detectUserTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Save User Preferences to localStorage
function savePreference(key, value) {
    localStorage.setItem(key, value);
}

// Load User Preferences from localStorage
function loadPreference(key) {
    return localStorage.getItem(key);
}

// Update Language Text
function updateLanguage() {
    // Update section titles
    document.querySelectorAll('.section-title').forEach(title => {
        const sectionId = title.closest('section').id;
        if (translations[currentLang][sectionId]) {
            title.textContent = translations[currentLang][sectionId];
        }
    });

    // Update form labels
    document.querySelectorAll('.form-group label').forEach(label => {
        const forAttr = label.getAttribute('for');
        if (translations[currentLang][forAttr]) {
            label.textContent = translations[currentLang][forAttr];
        }
    });

    // Update submit button
    document.querySelector('.submit-btn').textContent = translations[currentLang]['send'];

    // Update title
    document.querySelector('.title').textContent = translations[currentLang]['title'];
}

// Apply Theme
function applyTheme(theme) {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-toggle i');
    if (theme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');

    } else {
        body.removeAttribute('data-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
}

// Initialize Preferences on Page Load
document.addEventListener('DOMContentLoaded', () => {
    // Load or Detect Preferences
    const savedLang = loadPreference('language') || detectUserLanguage();
    const savedTheme = loadPreference('theme') || detectUserTheme();

    // Apply Language
    currentLang = savedLang;
    document.documentElement.lang = savedLang;
    updateLanguage();

    // Apply Theme
    applyTheme(savedTheme);

    // Update Toggle Text
    document.querySelector('.lang-toggle i').textContent = savedLang.toUpperCase();
});

// Language Toggle Button
document.querySelector('.lang-toggle').addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'es' : 'en';
    savePreference('language', currentLang);
    document.documentElement.lang = currentLang;
    updateLanguage();
    document.querySelector('.lang-toggle i').textContent = currentLang.toUpperCase();
});

// Theme Toggle Button
document.querySelector('.theme-toggle').addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    savePreference('theme', currentTheme);
    applyTheme(currentTheme);
});
