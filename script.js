// 1. GESTION DU PRELOADER
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.remove('overflow-hidden');
        }, 1000);
    }, 1500);
});

// 2. CURSEUR PERSONNALISÉ
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const hoverElements = document.querySelectorAll('a, button, input, textarea, .tilt-card');

if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener('mousemove', (e) => {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
        
        cursorOutline.animate({
            left: `${e.clientX}px`,
            top: `${e.clientY}px`
        }, { duration: 400, fill: "forwards" });
    });

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '65px';
            cursorOutline.style.height = '65px';
            cursorOutline.style.borderColor = '#E50914';
            cursorOutline.style.backgroundColor = 'rgba(229, 9, 20, 0.15)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.borderColor = 'rgba(229, 9, 20, 0.5)';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });
}

// 3. EFFET 3D TILT
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8; // Sensibilité
        const rotateY = ((x - centerX) / centerX) * 8;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.transition = 'transform 0.6s ease';
    });
    card.addEventListener('mouseenter', () => card.style.transition = 'none');
});

// 4. SCROLL PROGRESSION, NAVBAR & BOUTON REMONTER
const navbar = document.getElementById('navbar');
const progressBar = document.getElementById('progressBar');
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progressBar.style.width = `${(scrollTop / scrollHeight) * 100}%`;

    if (scrollTop > 80) {
        navbar.classList.add('bg-djdark/95', 'backdrop-blur-2xl', 'border-b', 'border-white/10', 'py-1');
        scrollTopBtn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
        scrollTopBtn.classList.add('opacity-100', 'translate-y-0', 'cursor-pointer');
    } else {
        navbar.classList.remove('bg-djdark/95', 'backdrop-blur-2xl', 'border-b', 'border-white/10', 'py-1');
        scrollTopBtn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
        scrollTopBtn.classList.remove('opacity-100', 'translate-y-0', 'cursor-pointer');
    }
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// 5. MENU BURGER MOBILE (Corrigé et Simplifié)
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    // Ajoute/Enlève la classe active sur le bouton pour l'animation CSS (≡ ↔ X)
    burgerBtn.classList.toggle('active');
    
    // Ouvre/Ferme le menu overlay
    const isOpen = mobileMenu.classList.contains('translate-x-0');
    if (!isOpen) {
        mobileMenu.classList.replace('opacity-0', 'opacity-100');
        mobileMenu.classList.replace('translate-x-full', 'translate-x-0');
        mobileMenu.classList.remove('pointer-events-none');
        document.body.classList.add('overflow-hidden');
    } else {
        mobileMenu.classList.replace('opacity-100', 'opacity-0');
        mobileMenu.classList.replace('translate-x-0', 'translate-x-full');
        mobileMenu.classList.add('pointer-events-none');
        document.body.classList.remove('overflow-hidden');
    }
}
burgerBtn.addEventListener('click', toggleMenu);
mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

// 6. SCROLL REVEAL (Animation d'apparition)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
