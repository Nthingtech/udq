// ==========================================================
// web/app.js
//
// Substitui integralmente: jQuery, Bootstrap JS, WOW.js,
// easing.js, waypoints.js, counterup.js e Owl Carousel.
// ==========================================================

import Alpine from 'alpinejs';

// ----------------------------------------------------------
// Reveal ao rolar — substitui o WOW.js
//
// IntersectionObserver puro, sem passar pelo Alpine: nao
// depende do ciclo de vida dele e roda assim que o DOM
// estiver pronto.
//
// O elemento nasce com opacity 0 pelo CSS ([x-reveal]) e
// ganha .is-revealed ao entrar na viewport.
// ----------------------------------------------------------
function initReveal() {
    const targets = document.querySelectorAll('[x-reveal]');
    if (!targets.length) return;

    // Respeita quem desativou animacoes no sistema operacional
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        targets.forEach((el) => el.classList.add('is-revealed'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);   // anima uma vez so
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    targets.forEach((el) => observer.observe(el));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
} else {
    initReveal();
}

// ----------------------------------------------------------
// navbar — sticky + menu hamburger
//
// O template esconde a barra em top: -150px e a traz de
// volta depois de 300px de rolagem. Isso vira a classe
// .nav-stuck, alternada pelo scroll.
// ----------------------------------------------------------
Alpine.data('navbar', () => ({
    stuck: false,
    open: false,

    onScroll() {
        this.stuck = window.scrollY > 300;
    },
}));

// ----------------------------------------------------------
// dropdown — menu "Institucional"
//
// No desktop o CSS do template ja abre no hover. Aqui so
// alternamos a classe .show, que e o que o Bootstrap fazia,
// para o clique funcionar no mobile.
// ----------------------------------------------------------
Alpine.data('dropdown', () => ({
    open: false,
    toggle() { this.open = !this.open; },
    close()  { this.open = false; },
}));

// ----------------------------------------------------------
// accordion — FAQ
//
// Guarda o indice aberto. Abrir um fecha os outros, que era
// o papel do data-bs-parent.
// ----------------------------------------------------------
Alpine.data('accordion', () => ({
    active: null,
    toggle(i) { this.active = this.active === i ? null : i; },
    isOpen(i) { return this.active === i; },
}));

// ----------------------------------------------------------
// backToTop
//
// scroll-behavior: smooth no CSS faz a animacao; o
// easing.js do template era so para isso.
// ----------------------------------------------------------
Alpine.data('backToTop', () => ({
    visible: false,

    onScroll() {
        this.visible = window.scrollY > 300;
    },

    toTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
}));

window.Alpine = Alpine;
Alpine.start();