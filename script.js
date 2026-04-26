// 1. GESTION DU PRELOADER
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.remove('overflow-hidden');
        }, 500);
    }, 1500);
});

// 2. NAVBAR SCROLL EFFECT
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-djdark/90', 'backdrop-blur-xl', 'border-b', 'border-white/10', 'py-2');
    } else {
        navbar.classList.remove('bg-djdark/90', 'backdrop-blur-xl', 'border-b', 'border-white/10', 'py-2');
    }
});

// 3. SCROLL REVEAL (Animation d'apparition)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// 4. ACTIVE STATE POUR NAV MOBILE (Synchronisation au scroll)
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]'); // Sécurisé pour ne prendre que les sections avec un ID

window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) { // Offset pour déclencher un peu avant d'arriver
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-djred');
        link.classList.add('text-gray-400');
        
        const href = link.getAttribute('href');
        // On vérifie que current n'est pas vide pour éviter les erreurs
        if (current && href.includes(current)) {
            link.classList.add('text-djred');
            link.classList.remove('text-gray-400');
        } else if (!current && href === "#") { // Cas spécial pour "Accueil" quand on est tout en haut
            link.classList.add('text-djred');
            link.classList.remove('text-gray-400');
        }
    });
});
