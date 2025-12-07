/**
 * NFTs Gallery Component with Zoom Functionality
 * Handles image gallery interactions and modal zoom
 */

(function() {
    'use strict';

    // Estado do componente
    let modal = null;
    let modalImage = null;
    let currentImageSrc = '';
    let currentImageAlt = '';
    // Feature flag para zoom (defina como false para desativar qualquer zoom)
    const ZOOM_ENABLED = false;

    /**
     * Inicializa o componente de NFTs
     */
    function initNftsGallery() {
        // Obter referências aos elementos
        modal = document.getElementById('nft-zoom-modal');
        modalImage = modal?.querySelector('.nft-zoom-image');
        const closeButton = modal?.querySelector('.nft-zoom-close');
        const backdrop = modal?.querySelector('.nft-zoom-backdrop');

        if (!modal || !modalImage) {
            console.warn('NFT zoom modal not found');
            // continue; modal absent shouldn't block the gallery rendering.
        }

        // Adicionar event listeners aos thumbnails (se o zoom estiver habilitado)
        const thumbnails = document.querySelectorAll('.nft-thumbnail');
        if (!ZOOM_ENABLED) {
            // Se o zoom estiver desabilitado, remover atributos de interação e sair
            thumbnails.forEach(thumbnail => {
                thumbnail.removeAttribute('tabindex');
                thumbnail.removeAttribute('role');
                thumbnail.removeAttribute('aria-label');
                // Uma classe visual para poder ocultar overlays ou estilos se necessário
                thumbnail.classList.add('zoom-disabled');
            });
            // Garantir que o modal esteja oculto
            if (modal) {
                modal.setAttribute('aria-hidden', 'true');
                modal.style.display = 'none';
            }
        } else {
            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', handleThumbnailClick);

                // Tornar acessível via teclado
                thumbnail.setAttribute('tabindex', '0');
                thumbnail.setAttribute('role', 'button');
                thumbnail.setAttribute('aria-label', 'Click to zoom image');

                thumbnail.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleThumbnailClick.call(thumbnail);
                    }
                });
            });
        }

        // Event listeners do modal
        if (closeButton) {
            closeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                closeModal();
            });
        }

        if (backdrop) {
            backdrop.addEventListener('click', closeModal);
        }

        // Escutar somente se o zoom/modal estiver habilitado e presente
        if (ZOOM_ENABLED && modal) {
            // Fechar com ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
                    closeModal();
                }
            });

            // Prevenção de scroll quando modal está aberto
            document.addEventListener('wheel', (e) => {
                if (modal.getAttribute('aria-hidden') === 'false') {
                    e.preventDefault();
                }
            }, { passive: false });

            document.addEventListener('touchmove', (e) => {
                if (modal.getAttribute('aria-hidden') === 'false') {
                    e.preventDefault();
                }
            }, { passive: false });
        }
    }

    /**
     * Manipula clique em thumbnail
     */
    function handleThumbnailClick() {
        const imageSrc = this.dataset.image;
        const imageAlt = this.querySelector('img')?.alt || 'NFT Image';

        if (!imageSrc) {
            console.warn('No image source found');
            return;
        }

        openModal(imageSrc, imageAlt);
    }

    /**
     * Abre o modal com a imagem
     */
    function openModal(src, alt) {
        if (!modal || !modalImage) return;

        currentImageSrc = src;
        currentImageAlt = alt;

        // Preload da imagem antes de mostrar o modal
        const img = new Image();
        img.onload = () => {
            modalImage.src = src;
            modalImage.alt = alt;
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';

            // Focar no botão de fechar para acessibilidade
            const closeButton = modal.querySelector('.nft-zoom-close');
            if (closeButton) {
                setTimeout(() => closeButton.focus(), 100);
            }
        };
        img.onerror = () => {
            console.error('Failed to load image:', src);
        };
        img.src = src;
    }

    /**
     * Fecha o modal
     */
    function closeModal() {
        if (!modal) return;

        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        // Limpar imagem após a animação
        setTimeout(() => {
            if (modalImage) {
                modalImage.src = '';
                modalImage.alt = '';
            }
        }, 300);
    }

    /**
     * Cleanup quando o componente é destruído
     */
    function cleanup() {
        const thumbnails = document.querySelectorAll('.nft-thumbnail');
        thumbnails.forEach(thumbnail => {
            thumbnail.removeEventListener('click', handleThumbnailClick);
        });
    }

    // Inicializar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNftsGallery);
    } else {
        initNftsGallery();
    }

    // Expor cleanup para uso externo se necessário
    window.NftsGallery = {
        init: initNftsGallery,
        cleanup: cleanup
    };
})();

/**
 * Ascenders NFT Composer
 * Interactive NFT composition with layering system
 */
(function() {
    'use strict';

    const BASE_PATH = '/assets/images/nfts/ascender';

    // Configuração de assets disponíveis por raridade
    const ASSETS_CONFIG = {
        common: { hair: 15, eyes: 12 },
        rare: { hair: 15, eyes: 12 },
        epic: { hair: 15, eyes: 12 },
        legendary: { hair: 9, eyes: 9 },
        mythic: { hair: 7, eyes: 7 }
    };

    const COMMON_ASSETS = {
        nose: 4,
        mouth: 8
    };

    const RARITIES = ['common', 'rare', 'epic', 'legendary', 'mythic'];
    const BODIES = ['naked_base'];

    let canvas, ctx;
    let currentComposition = {
        rarity: RARITIES.indexOf('mythic') || 0, // default to mythic if available
        body: 0, // naked_base index
        hair: 3,
        eyes: 3,
        nose: 2,
        mouth: 4
    };

    let canvasSize = null;

    function initAscendersComposer() {
        canvas = document.getElementById('ascender-canvas');
        if (!canvas) return;

        ctx = canvas.getContext('2d');

        // Renderizar composição padrão para obter tamanho da imagem
        renderComposition().then(() => {
            // Após primeira renderização, anexar event listeners
            attachEventListeners();
            updateAllDisplays();
        });
    }

    function attachEventListeners() {
        const arrows = document.querySelectorAll('.selector-arrow');
        const shareBtn = document.getElementById('share-btn');

        arrows.forEach(arrow => {
            arrow.addEventListener('click', handleArrowClick);
        });

        if (shareBtn) {
            shareBtn.addEventListener('click', shareComposition);
        }
    }

    function handleArrowClick(e) {
        const control = e.currentTarget.dataset.control;
        const isPrev = e.currentTarget.classList.contains('selector-prev');
        const direction = isPrev ? -1 : 1;

        let max = 1;
        let currentValue = currentComposition[control];

        // Determinar máximo baseado no controle
        switch(control) {
            case 'rarity':
                max = RARITIES.length;
                break;
            case 'body':
                max = BODIES.length;
                break;
            case 'hair':
                max = ASSETS_CONFIG[RARITIES[currentComposition.rarity]].hair;
                break;
            case 'eyes':
                max = ASSETS_CONFIG[RARITIES[currentComposition.rarity]].eyes;
                break;
            case 'nose':
                max = COMMON_ASSETS.nose;
                break;
            case 'mouth':
                max = COMMON_ASSETS.mouth;
                break;
        }

        // Atualizar valor com wrap-around
        let newValue = currentValue + direction;
        if (control === 'rarity' || control === 'body') {
            // Index-based (0-based)
            if (newValue < 0) newValue = max - 1;
            if (newValue >= max) newValue = 0;
        } else {
            // Number-based (1-based)
            if (newValue < 1) newValue = max;
            if (newValue > max) newValue = 1;
        }

        currentComposition[control] = newValue;

        // Se mudou rarity, resetar hair e eyes
        if (control === 'rarity') {
            currentComposition.hair = 1;
            currentComposition.eyes = 1;
        }

        updateAllDisplays();
        renderComposition();
    }

    function updateAllDisplays() {
        document.getElementById('rarity-value').textContent = capitalize(RARITIES[currentComposition.rarity]);
        document.getElementById('body-value').textContent = BODIES[currentComposition.body] === 'naked_base' ? 'Naked Base' : 'Dress Base';
        document.getElementById('hair-value').textContent = `Hair ${currentComposition.hair}`;
        document.getElementById('eyes-value').textContent = `Eyes ${currentComposition.eyes}`;
        document.getElementById('nose-value').textContent = `Nose ${currentComposition.nose}`;
        document.getElementById('mouth-value').textContent = `Mouth ${currentComposition.mouth}`;
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    async function renderComposition() {
        if (!ctx) return;

        const rarity = RARITIES[currentComposition.rarity];
        const body = BODIES[currentComposition.body];
        const hair = currentComposition.hair;
        const eyes = currentComposition.eyes;
        const nose = currentComposition.nose;
        const mouth = currentComposition.mouth;

        // Camadas de renderização (ordem Z-index: Border, Body, Eye, Hair, Nose, Mouth)
        // Construir caminhos de asset (considera casos de nomenclatura específica)
        const borderFileName = `${rarity}_border.png`;
        const borderPath = `${BASE_PATH}/${rarity}/${borderFileName}`;
        const bodyPath = `${BASE_PATH}/${body}.png`;
        const eyePath = `${BASE_PATH}/${rarity}/${rarity}_eyes/${eyes}.png`;
        const hairFolder = (rarity === 'mythic') ? 'mithyc_hair' : `${rarity}_hair`;
        const hairPath = `${BASE_PATH}/${rarity}/${hairFolder}/${hair}.png`;
        const nosePath = `${BASE_PATH}/nose/${nose}.png`;
        const mouthPath = `${BASE_PATH}/mouth/${mouth}.png`;

        let layers = [];
        let firstImg;
        try {
            // tenta carregar o border (se falhar, usamos o body como base)
            firstImg = await loadImage(borderPath);
            layers = [borderPath, bodyPath, eyePath, hairPath, nosePath, mouthPath];
        } catch (err) {
            console.warn(`Failed to load border: ${borderPath}, falling back to body.`, err);
            try {
                firstImg = await loadImage(bodyPath);
            } catch (err2) {
                console.warn(`Failed to load body image: ${bodyPath}`, err2);
                // Se tudo falhar, abortamos
                return;
            }
            layers = [bodyPath, eyePath, hairPath, nosePath, mouthPath];
        }
        if (!canvasSize) {
            canvasSize = { width: firstImg.width, height: firstImg.height };
            canvas.width = canvasSize.width;
            canvas.height = canvasSize.height;
        }

        // Limpar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Desenhar primeira camada
        ctx.drawImage(firstImg, 0, 0);

        // Carregar e desenhar camadas restantes
        for (let i = 1; i < layers.length; i++) {
            try {
                const img = await loadImage(layers[i]);
                ctx.drawImage(img, 0, 0);
            } catch (err) {
                console.warn(`Failed to load layer: ${layers[i]}`, err);
            }
        }
    }

    async function shareComposition() {
        // Criar canvas para compartilhamento
        const shareCanvas = document.createElement('canvas');
        shareCanvas.width = 1200;
        shareCanvas.height = 800;
        const shareCtx = shareCanvas.getContext('2d');

        try {
            // Carregar imagem de fundo (com logo, QR code e título já incluídos)
            const background = await loadImage('/assets/images/nfts/ascender/back_share.png');
            shareCtx.drawImage(background, 0, 0, 1200, 800);
        } catch (err) {
            console.warn('Background não carregado, usando fundo padrão');
            shareCtx.fillStyle = '#f5f1e8';
            shareCtx.fillRect(0, 0, shareCanvas.width, shareCanvas.height);
        }

        // Composição do usuário - centralizada verticalmente com altura máxima de 610px
        const maxHeight = 610;
        const compositionX = 100;
        const availableVerticalSpace = 800; // Altura total do canvas

        // Calcular dimensões mantendo aspect ratio
        const aspectRatio = canvas.width / canvas.height;
        let drawWidth, drawHeight;

        // Limitar pela altura máxima
        drawHeight = maxHeight;
        drawWidth = maxHeight * aspectRatio;

        // Centralizar verticalmente
        const compositionY = (availableVerticalSpace - drawHeight) / 2;

        shareCtx.drawImage(canvas,
            compositionX,
            compositionY,
            drawWidth,
            drawHeight
        );

        // Converter para imagem e fazer download
        shareCanvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = 'my-ascender.png';
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
        });
    }

    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load: ${src}`));
            img.src = src;
        });
    }

    // Inicializar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAscendersComposer);
    } else {
        initAscendersComposer();
    }

    window.AscendersComposer = {
        init: initAscendersComposer
    };
})();
