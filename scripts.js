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

    // Form validation
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (validateForm()) {
            showLoading();
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                showSuccess();
                contactForm.reset();
            } catch (error) {
                showError('An error occurred. Please try again.');
            } finally {
                hideLoading();
            }
        }
    });

    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const link = card.getAttribute('data-link');
            if (link) {
                console.log(link);
                window.open(link, '_blank'); // Abre el enlace en una nueva pestaña
            }
        });
    });
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

// Redirigir al hacer clic en una service-card
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
    });
});


function validateForm() {
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    // Reset previous errors
    clearErrors();

    // Validate name
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    }

    // Validate email
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate message
    if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    }

    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, message) {
    const errorElement = document.getElementById(`${input.id}Error`);
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');

    errorElements.forEach(error => error.style.display = 'none');
    inputs.forEach(input => input.classList.remove('error'));
}

function showLoading() {
    document.querySelector('.loading-indicator').style.display = 'flex';
}

function hideLoading() {
    document.querySelector('.loading-indicator').style.display = 'none';
}

function showSuccess() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Message sent successfully!';

    const form = document.getElementById('contactForm');
    form.insertBefore(successMessage, form.firstChild);

    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

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
    es: {
        title: "Soy Santiago Delgado, Ingeniero de Software",
        about: "Sobre Mí",
        tech_stack: "Habilidades Técnicas",
        about_content: `
            Soy técnico en programación de software y actualmente estudiante de Ingeniería de Sistemas en la **Universidad Industrial de Santander** (UIS).

            Tengo experiencia en el desarrollo de soluciones tecnológicas que van desde la automatización de procesos y extracción de datos hasta la implementación de modelos avanzados de **inteligencia artificial** en áreas como visión por computador, predicción y clasificación.

            Mis habilidades técnicas incluyen la programación en **Python**, **C++** y **Java**, así como el desarrollo de **interfaces gráficas** y la integración de tecnologías como **Linux**, **Node.js** y bases de datos **Postgres**. Además, destaco por mi capacidad para trabajar en equipo, adaptarme a nuevos retos y buscar la mejora continua en cada proyecto.

            Estoy comprometido con el aprendizaje permanente y el desarrollo de **soluciones a medida** que tengan un impacto real en las personas y las organizaciones.
            `,

        services: "Servicios",
        ai: "Inteligencia Artificial",
        ai_content: "Entrenamiento de modelos de inteligencia artificial para la automatización de procesos.",
        web: "Desarrollo Web",
        web_content: "Desarrollo de sitios web 'responsive' utilizando tecnologías modernas como HTML, CSS y JavaScript.",
        desktop: "Desarrollo de Escritorio",
        desktop_content: "Creación de aplicaciones para Windows y linux utilizando tecnologías como Python, Java y C++.",
        cloud: "Computación en la Nube",
        cloud_content: "Despliegue de aplicaciones en la nube utilizando servicios como AWS, Azure y Google Cloud.",
        bots: "Bots de Whatsapp/Messenger",
        bots_content: "Desarrollo de chatbots para Whatsapp y Messenger con meta developers.",
        consultant: "Consultoría 'IT'",
        consultant_content: "Asesoría en la implementación de tecnologías para la optimización de costos en hardware y software.",

        projects: "Proyectos Principales",
        project_bots: "Bots de Whatsapp/Messenger",
        project_bots_content: "Bot de whatsapp y messenger para servicio al cliente.",
        project_sarcd: "Visor Médico DICOM (SARCD)",
        project_sarcd_content: "Herramienta en Python para visualizar y gestionar imágenes DICOM con una interfaz gráfica intuitiva, diseñada para facilitar el análisis médico.",
        project_web: "Tienda en Línea",
        project_web_content: "Desarrollo de tienda en línea desde cero con Angular, Spring Boot y PostgreSQL.",

        contact: "Contáctame",
        name: "Nombre",
        email: "Correo",
        message: "Mensaje",
        send: "Enviar Mensaje",
    },
    en: {
        title: "I'm Santiago Delgado, Software Engineer",
        about: "About Me",
        tech_stack: "Technical Skills",
        about_content:`
            I am a software programming technician and currently a Systems Engineering student at the **Industrial University of Santander** (UIS).

            I have experience in developing technological solutions ranging from process automation and data extraction to the implementation of advanced **artificial intelligence models** in areas such as computer vision, prediction, and classification.

            My technical skills include programming in **Python**, **C++**, and **Java**, as well as **graphical interface** development and the integration of technologies like **Linux**, **Node.js**, and **Postgres** databases. Additionally, I stand out for my ability to work in teams, adapt to new challenges, and strive for continuous improvement in every project.

            I am committed to lifelong learning and the development of **customized solutions** that make a real impact on people and organizations.
            `,

        services: "Services",
        ai: "Artificial Intelligence",
        ai_content: "I have experience in developing AI models for computer vision, prediction, and classification.",
        web: "Web Development",
        web_content: "I develop responsive websites using modern technologies like HTML, CSS, and JavaScript.",
        desktop: "Desktop Development",
        desktop_content: "I create applications for Windows and Linux using technologies like Python, Java, and C++.",
        cloud: "Cloud Computing",
        cloud_content: "I deploy applications in the cloud using services like AWS, Azure, and Google Cloud.",
        bots: "Whatsapp/Messenger Bots",
        bots_content: "I develop chatbots for Whatsapp and Messenger using meta developers.",
        consultant: "IT Consulting",
        consultant_content: "I provide advice on the implementation of technologies to optimize costs in hardware and software.",

        projects: "Main Projects",
        project_bots: "Whatsapp/Messenger Bots",
        project_bots_content: "whatsapp and messenger bot for Customer Service",
        project_sarcd: "Medical DICOM Visor (SARCD)",
        project_sarcd_content: "Python tool for viewing and managing DICOM images with an intuitive graphical interface, designed to facilitate medical analysis.",
        project_web: "Online store",
        project_web_content: "online store development from scratch with Angular, Spring Boot, and PostgreSQL.",

        contact: "Contact Me",
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send Message",
    },
};

