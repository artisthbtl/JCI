async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (response.ok) {
            const content = await response.text();
            document.getElementById(elementId).innerHTML = content;
        } else {
            console.error(`Error loading ${filePath}: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error loading component: ${error}`);
    }
}

function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (!mobileMenuBtn || !navLinks) return;

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.textContent = '☰';
        });
    });

    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuBtn.textContent = '☰';
        }
    });
}

function initializeNavbarScroll() {
    const navbar = document.querySelector('.nav-bar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function initializeParallax() {
    const background = document.querySelector('.background');
    if (!background) return;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const scale = 1 + scrollPosition * 0.0001;
        
        background.style.transform = `scale(${scale})`;
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadComponent("navbar-placeholder", "navbar.html");
    
    initializeMobileMenu();
    initializeNavbarScroll();
    initializeParallax();
});