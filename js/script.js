/**
 * Ascendria - Main Script
 * Funcionalidades globais do site
 * 
 * NOTA: A maioria das funcionalidades foi movida para componentes:
 * - Menu mobile: components/topbar/topbar.js
 * - Parallax background: components/backgroundlive/backgroundlive.js
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================
    // LÓGICA: ROTAÇÃO DE TELA E TELA CHEIA (para páginas que usam)
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
                    if (screen.orientation && screen.orientation.lock) {
                        screen.orientation.lock('landscape').catch(err => {
                            console.log('Orientação não suportada:', err);
                        });
                    }
                })
                .catch((err) => {
                    console.error('Erro ao tentar entrar em tela cheia:', err);
                });
        }
    }
});
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