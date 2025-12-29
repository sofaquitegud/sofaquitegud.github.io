// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll reveal animations using Intersection Observer
// Fade in when entering viewport, fade out when leaving
const observerOptions = {
    root: null,
    rootMargin: '-50px 0px',
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5]
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const ratio = entry.intersectionRatio;
        const target = entry.target;

        if (entry.isIntersecting) {
            // Fade in effect based on how visible the section is
            target.style.opacity = Math.min(1, ratio * 2);
            target.style.transform = `translateY(${(1 - ratio) * 30}px)`;
            target.classList.add('visible');
        } else {
            // Fade out when scrolling away
            target.style.opacity = 0;
            target.style.transform = 'translateY(30px)';
            target.classList.remove('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Active nav link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
        const scrolled = window.scrollY;
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Typing effect for hero greeting (optional enhancement)
const heroGreeting = document.querySelector('.hero-greeting');
if (heroGreeting) {
    heroGreeting.style.opacity = '0';
    setTimeout(() => {
        heroGreeting.style.transition = 'opacity 0.5s ease';
        heroGreeting.style.opacity = '1';
    }, 300);
}
