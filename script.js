// 1. GESTION DE LA NAVBAR AU SCROLL (PC)
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('bg-djdark/90', 'backdrop-blur-xl', 'py-2', 'border-b', 'border-white/10');
        navbar.classList.remove('p-4');
    } else {
        navbar.classList.remove('bg-djdark/90', 'backdrop-blur-xl', 'py-2', 'border-b', 'border-white/10');
        navbar.classList.add('p-4');
    }
});

// 2. ANIMATIONS REVEAL (INTERSECTION OBSERVER)
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// 3. SMOOTH SCROLL POUR LES ANCRES
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
