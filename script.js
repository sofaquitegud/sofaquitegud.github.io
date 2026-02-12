// Update copyright year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const navbar = document.querySelector('.navbar');
const heroContent = document.querySelector('.hero-content');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const navToggle = document.querySelector('.nav-toggle');
const navLinksContainer = document.getElementById('nav-links');

// Mobile nav toggle
function closeMobileMenu() {
    if (!navLinksContainer || !navToggle) return;
    navLinksContainer.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
}

if (navToggle && navLinksContainer) {
    navToggle.addEventListener('click', () => {
        const isOpen = navLinksContainer.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', (event) => {
        if (!navLinksContainer.contains(event.target) && !navToggle.contains(event.target)) {
            closeMobileMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMobileMenu();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeMobileMenu();
    });
}

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        const target = href ? document.querySelector(href) : null;
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeMobileMenu();
    });
});

// Scroll reveal animations using Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '-50px 0px',
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5]
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const ratio = entry.intersectionRatio;
        const target = entry.target;

        if (entry.isIntersecting) {
            target.style.opacity = Math.min(1, ratio * 2);
            target.style.transform = `translateY(${(1 - ratio) * 30}px)`;
            target.classList.add('visible');
        } else {
            target.style.opacity = '0';
            target.style.transform = 'translateY(30px)';
            target.classList.remove('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach((section) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

function updateOnScroll() {
    const scrollY = window.scrollY;

    if (navbar) {
        if (scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    }

    let current = 'hero';
    sections.forEach((section) => {
        if (scrollY >= section.offsetTop - 220) {
            current = section.getAttribute('id') || current;
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });

    if (heroContent && scrollY < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
        heroContent.style.opacity = String(1 - (scrollY / window.innerHeight));
    }
}

let ticking = false;
window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
        updateOnScroll();
        ticking = false;
    });
}, { passive: true });

updateOnScroll();

// Hero greeting entrance
const heroGreeting = document.querySelector('.hero-greeting');
if (heroGreeting) {
    heroGreeting.style.opacity = '0';
    setTimeout(() => {
        heroGreeting.style.transition = 'opacity 0.5s ease';
        heroGreeting.style.opacity = '1';
    }, 300);
}
