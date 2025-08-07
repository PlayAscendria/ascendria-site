// Arquivo: js/about-carousel.js

const swiper = new Swiper('.aboutSwiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // Efeito de cubo (ou outro de sua preferência)
    effect: 'fade',
    cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
    },

    // Habilita controle pelo teclado
    keyboard: {
        enabled: true,
    },
});