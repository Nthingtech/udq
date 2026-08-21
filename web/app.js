// ==========================================================
// web/app.js
//
// Substitui integralmente: jQuery, Bootstrap JS, WOW.js,
// easing.js, waypoints.js, counterup.js e Owl Carousel.
//
// Alpine e a unica dependencia. Reveal usa
// IntersectionObserver, API nativa do navegador.
// ==========================================================

import Alpine from 'alpinejs';

// ----------------------------------------------------------
// Diretiva x-reveal — substitui o WOW.js
//
// Adiciona a classe .is-revealed quando o elemento entra na
// viewport. O CSS cuida da animacao; o JS so avisa a hora.
//
// Uso:  <div x-reveal>            (padrao)
//       <div x-reveal.delay.200>  (atraso em ms)
// ----------------------------------------------------------
Alpine.directive('reveal', (el, { modifiers }) => {
    const delayIndex = modifiers.indexOf('delay');
    const delay = delayIndex !== -1 ? parseInt(modifiers[delayIndex + 1], 10) || 0 : 0;

    // Respeita quem desativou animacoes no sistema operacional
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.classList.add('is-revealed');
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            setTimeout(() => entry.target.classList.add('is-revealed'), delay);
            observer.unobserve(entry.target);   // anima uma vez so
        });
    }, { threshold: 0.15 });

    observer.observe(el);
});

// ----------------------------------------------------------
// navbar — sticky + menu hamburger
//
// O template esconde a barra em top: -150px e a traz de
// volta depois de 300px de rolagem. Aqui isso vira a classe
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
// dropdown — menu "Pages"
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