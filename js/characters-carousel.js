// Arquivo: js/characters-carousel.js (Versão Final Corrigida)

const charactersSwiper = new Swiper('.charactersSwiper', {
    // Efeito de transição suave (fade), como você escolheu
    effect: 'fade',
    
    // Navegação em loop infinito
    loop: true,
    
    // Habilita controle pelo teclado para melhor acessibilidade
    keyboard: {
        enabled: true,
    },

    // Paginação (bolinhas) - USANDO SELETOR ESPECÍFICO
    pagination: {
      el: '#characters-section .swiper-pagination',
      clickable: true,
    },
    
    // Setas de navegação - USANDO SELETOR ESPECÍFICO
    navigation: {
      nextEl: '#characters-section .swiper-button-next',
      prevEl: '#characters-section .swiper-button-prev',
    },
});