document.addEventListener('DOMContentLoaded', () => {
    // Load or Detect Preferences
    const savedLang = localStorage.getItem('language') || detectUserLanguage();
    const savedTheme = localStorage.getItem('theme') || detectUserTheme();

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
    localStorage.setItem('language', currentLang);
    document.documentElement.lang = currentLang;
    updateLanguage();
    document.querySelector('.lang-toggle i').textContent = currentLang.toUpperCase();
});

// Theme Toggle Button
document.querySelector('.theme-toggle').addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    applyTheme(currentTheme);
});

// Apply Theme
function applyTheme(theme) {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-toggle i');
    const logo = document.querySelector('.logo-container img');
    if (theme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        logo.src = 'src/assets/Transparente logo blanco.svg';
    } else {
        body.removeAttribute('data-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        logo.src = 'src/assets/Transparente logo negro.svg';
    }
}

// Detect User Theme
function detectUserTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function detectUserLanguage() {
    const userLang = navigator.language || navigator.languages[0];
    return userLang.startsWith('es') ? 'es' : 'en';
}

function updateLanguage() {
    const translatableElements = document.querySelectorAll('[data-translate]');
    translatableElements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLang][key]) {
            let content = translations[currentLang][key];

            // Convert markdown-style formatting to HTML
            content = content
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
                .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic text
                .replace(/\n\n/g, '<br><br>'); // Line breaks

            element.innerHTML = content;
        }
    });
}


const translations = {
    en: {
        title: "I'm Santiago Delgado, Software Engineer",
        about: "About Me",
        about_content:`
            I am a software programming technician and currently a Systems Engineering student at the **Industrial University of Santander** (UIS).

            I have experience in developing technological solutions ranging from process automation and data extraction to the implementation of advanced **artificial intelligence models** in areas such as computer vision, prediction, and classification.

            My technical skills include programming in **Python**, **C++**, and **Java**, as well as **graphical interface** development and the integration of technologies like **Linux**, **Node.js**, and **PostgreSQL** databases. Additionally, I stand out for my ability to work in teams, adapt to new challenges, and strive for continuous improvement in every project.

            I am committed to lifelong learning and the development of **customized solutions** that make a real impact on people and organizations.
            `,

        services: "Services",
        web: "Web Development",
        web_content: "I have experience in developing responsive websites using modern technologies such as HTML, CSS, and JavaScript.",
        mobile: "Mobile Development",
        mobile_content: "I have experience in developing mobile applications for Android and iOS using Flutter and React Native.",
        cloud: "Cloud Computing",
        cloud_content: "I have experience in deploying applications to the cloud using services such as AWS, Azure, and Google Cloud.",

        projects: "Recent Projects",
        contact: "Contact Me",
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send Message",
    },
    es: {
        title: "Soy Santiago Delgado, Ingeniero de Software",
        about: "Sobre Mí",
        about_content: `
            Soy técnico en programación de software y actualmente estudiante de Ingeniería de Sistemas en la **Universidad Industrial de Santander** (UIS).

            Tengo experiencia en el desarrollo de soluciones tecnológicas que van desde la automatización de procesos y extracción de datos hasta la implementación de modelos avanzados de **inteligencia artificial** en áreas como visión por computador, predicción y clasificación.

            Mis habilidades técnicas incluyen la programación en **Python**, **C++** y **Java**, así como el desarrollo de **interfaces gráficas** y la integración de tecnologías como **Linux**, **Node.js** y bases de datos **PostgreSQL**. Además, destaco por mi capacidad para trabajar en equipo, adaptarme a nuevos retos y buscar la mejora continua en cada proyecto.

            Estoy comprometido con el aprendizaje permanente y el desarrollo de **soluciones a medida** que tengan un impacto real en las personas y las organizaciones.
            `,

        services: "Servicios",
        web: "Desarrollo Web",
        web_content: "Tengo experiencia en el desarrollo de sitios web 'responsive' utilizando tecnologías modernas como HTML, CSS y JavaScript.",
        mobile: "Desarrollo Móvil",
        mobile_content: "Tengo experiencia en el desarrollo de aplicaciones móviles para Android e iOS utilizando Flutter y React Native.",
        cloud: "Computación en la Nube",
        cloud_content: "Tengo experiencia en desplegar aplicaciones en la nube utilizando servicios como AWS, Azure y Google Cloud.",

        projects: "Proyectos Recientes",
        contact: "Contáctame",
        name: "Nombre",
        email: "Correo",
        message: "Mensaje",
        send: "Enviar Mensaje",
    }
};

