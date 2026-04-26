// 1. GESTION DU PRELOADER
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.8s ease';
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.remove('overflow-hidden');
        }, 800);
    }, 1200);
});

// 2. CURSEUR PERSONNALISÉ (Souris)
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const hoverElements = document.querySelectorAll('.hover-scale, a, button, input, textarea');

// Ne s'active que sur écran d'ordinateur (pas tactile)
if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Position immédiate pour le point rouge
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Position fluide pour le cercle
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Grossit le curseur au survol des liens/boutons
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(229, 9, 20, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });
}

// 3. EFFET 3D TILT (Inclinison au survol des cartes)
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // Position X dans la carte
        const y = e.clientY - rect.top;  // Position Y dans la carte
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calcule l'angle (max 10 degrés)
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    // Remet la carte à plat quand on quitte
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.transition = 'transform 0.5s ease';
    });
    
    // Enlève la transition pendant le mouvement pour que ce soit fluide
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
});

// 4. SCROLL PROGRESSION & NAVBAR
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

// 5. MENU BURGER MOBILE
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const spans = burgerBtn.querySelectorAll('span');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    const isOpen = mobileMenu.classList.contains('translate-x-0');
    if (!isOpen) {
        mobileMenu.classList.replace('opacity-0', 'opacity-100');
        mobileMenu.classList.replace('translate-x-full', 'translate-x-0');
        mobileMenu.classList.remove('pointer-events-none');
        document.body.classList.add('overflow-hidden');
        
        spans[0].classList.add('rotate-45', 'translate-y-[10px]');
        spans[0].classList.remove('-translate-y-2');
        spans[1].classList.add('opacity-0');
        spans[2].classList.add('-rotate-45', '-translate-y-[10px]');
        spans[2].classList.remove('translate-y-2');
    } else {
        mobileMenu.classList.replace('opacity-100', 'opacity-0');
        mobileMenu.classList.replace('translate-x-0', 'translate-x-full');
        mobileMenu.classList.add('pointer-events-none');
        document.body.classList.remove('overflow-hidden');
        
        spans[0].classList.remove('rotate-45', 'translate-y-[10px]');
        spans[0].classList.add('-translate-y-2');
        spans[1].classList.remove('opacity-0');
        spans[2].classList.remove('-rotate-45', '-translate-y-[10px]');
        spans[2].classList.add('translate-y-2');
    }
}
burgerBtn.addEventListener('click', toggleMenu);
mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

// 6. SCROLL REVEAL (Animation d'apparition)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target); // Ne s'anime qu'une seule fois pour plus de propreté
        }
    });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
