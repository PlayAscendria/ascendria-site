// Espera o HTML ser totalmente carregado para rodar os scripts
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================
    // LÓGICA 1: EFEITO PARALLAX NA HERO SECTION
    // ==========================================================
    const bg = document.getElementById('skyes-mountain');
    if (bg) {
        document.addEventListener('mousemove', function(e) {
            const moveX = (e.clientX - window.innerWidth / 2) * -0.002;
            const moveY = (e.clientY - window.innerHeight / 2) * -0.002;
            bg.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
        });
    }

    // ==========================================================
    // LÓGICA 2: MENU MOBILE COMPLETO
    // ==========================================================
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (hamburgerBtn && mobileMenu) {
        
        // Função para fechar o menu
        const closeMenu = () => {
            mobileMenu.classList.remove('is-active');
        };

        // Lógica para abrir/fechar com o clique no botão
        hamburgerBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            mobileMenu.classList.toggle('is-active');
        });

        // Lógica para o efeito acordeão dos submenus
        const expandableLinks = document.querySelectorAll('.has-submenu > a');
        expandableLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                const parentLi = link.parentElement;
                parentLi.classList.toggle('expanded');
            });
        });

        // Lógica para fechar ao clicar em um link do menu
        const menuLinks = document.querySelectorAll('.mobile-menu a');
        menuLinks.forEach(link => {
            if (!link.parentElement.classList.contains('has-submenu')) {
                link.addEventListener('click', closeMenu);
            }
        });

        // Lógica para fechar ao clicar fora do menu
        document.addEventListener('click', (event) => {
            if (mobileMenu.classList.contains('is-active') && !mobileMenu.contains(event.target)) {
                closeMenu();
            }
        });
        
        // Lógica para fechar o menu se a tela ficar grande demais
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1212) {
                closeMenu();
            }
        });
    }

    // ==========================================================
    // LÓGICA 3: ROTAÇÃO DE TELA E TELA CHEIA
    // ==========================================================
    const rotateBtn = document.querySelector('.rotate-btn');
    const rotateModal = document.querySelector('#rotate-modal');
    const btnSim = document.querySelector('#modal-btn-sim');
    const btnNao = document.querySelector('#modal-btn-nao');

    if (rotateBtn && rotateModal && btnSim && btnNao) {
        
        // Abre o modal de confirmação
        rotateBtn.addEventListener('click', () => {
            rotateModal.classList.add('is-visible');
        });

        // Fecha o modal
        btnNao.addEventListener('click', () => {
            rotateModal.classList.remove('is-visible');
        });

        // Tenta entrar em tela cheia e girar
        btnSim.addEventListener('click', () => {
            rotateModal.classList.remove('is-visible');
            enterFullscreenAndLandscape();
        });
    }

    function enterFullscreenAndLandscape() {
        const element = document.documentElement;

        if (element.requestFullscreen) {
            element.requestFullscreen()
                .then(() => {
                    screen.orientation.lock('landscape').catch(err => console.log(err));
                })
                .catch((err) => {
                    console.error('Erro ao tentar entrar em tela cheia:', err);
                    alert('Não foi possível ativar a tela cheia. Verifique as permissões do navegador.');
                });
        } else {
            alert('Seu navegador não suporta o modo de tela cheia.');
        }
    }
});