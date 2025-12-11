

(function() {
    'use strict';

    
    function initNftsGallery() {
        // Create zoom modal if it doesn't exist
        let modal = document.getElementById('nft-zoom-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'nft-zoom-modal';
            modal.className = 'nft-zoom-modal';
            modal.setAttribute('aria-hidden', 'true');
            modal.innerHTML = `
                <div class="nft-zoom-backdrop"></div>
                <div class="nft-zoom-content">
                    <img class="nft-zoom-image" src="" alt="Zoomed NFT" />
                </div>
                <button class="nft-zoom-close" aria-label="Close zoom" type="button">×</button>
            `;
            document.body.appendChild(modal);
        }

        const thumbnails = document.querySelectorAll('.nft-thumbnail');
        const zoomImage = modal.querySelector('.nft-zoom-image');
        const closeBtn = modal.querySelector('.nft-zoom-close');
        const backdrop = modal.querySelector('.nft-zoom-backdrop');

        // Open modal on thumbnail click
        thumbnails.forEach(thumbnail => {
            const img = thumbnail.querySelector('img');
            if (img) {
                thumbnail.addEventListener('click', (e) => {
                    e.preventDefault();
                    zoomImage.src = img.src;
                    zoomImage.alt = img.alt || 'Zoomed NFT';
                    modal.setAttribute('aria-hidden', 'false');
                    document.body.style.overflow = 'hidden'; // Prevent background scroll
                });
            }
        });

        // Close modal functions
        function closeModal() {
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Restore scroll
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        if (backdrop) {
            backdrop.addEventListener('click', closeModal);
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
                closeModal();
            }
        });
    }


    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNftsGallery);
    } else {
        initNftsGallery();
    }


    window.NftsGallery = {
        init: initNftsGallery
    };
})();


(function() {
    'use strict';

    const BASE_PATH = '/assets/images/nfts/ascender';


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
    let SKINS = []; // Will be populated dynamically
    const SKINS_BASE_PATH = `${BASE_PATH}/skins`;

    let canvas, ctx;
    let currentComposition = {
        rarity: RARITIES.indexOf('mythic') || 0, 
        skin: 0, // 0 = none (no custom skin), 1+ = custom skin index
        hair: 3,
        eyes: 3,
        nose: 2,
        mouth: 4
    };

    let canvasSize = null;

    // Function to detect available skin files
    // Only checks known skins from the list - no random guessing
    async function detectAvailableSkins() {
        const detectedSkins = [];
        
        // Known skins list - add new skin names here as you add them to the folder
        // IMPORTANT: Update this list whenever you add new skins to the skins folder
        const knownSkins = ['ronin'];
        
        // Verify each known skin exists
        for (const skinName of knownSkins) {
            try {
                const skinPath = `${SKINS_BASE_PATH}/${skinName}.png`;
                const response = await fetch(skinPath, { method: 'HEAD' });
                if (response.ok) {
                    detectedSkins.push(skinName);
                } else {
                    console.warn(`[Ascenders] Skin "${skinName}" not found at ${skinPath}`);
                }
            } catch (err) {
                // Skin doesn't exist, skip it silently
                console.warn(`[Ascenders] Could not verify skin "${skinName}":`, err.message);
            }
        }
        
        // Sort alphabetically for consistent ordering
        detectedSkins.sort();
        
        console.log(`[Ascenders] Successfully detected ${detectedSkins.length} skin(s):`, detectedSkins);
        
        return detectedSkins;
    }

    async function initAscendersComposer() {
        // Prevenir múltiplas inicializações
        if (window.__ascendersComposerInitialized) {
            return;
        }
        
        // Aguardar o canvas estar disponível (pode ser carregado dinamicamente)
        canvas = document.getElementById('ascender-canvas');
        
        if (!canvas) {
            console.warn('[Ascenders] Canvas não encontrado, tentando novamente...');
            return;
        }

        window.__ascendersComposerInitialized = true;
        
        ctx = canvas.getContext('2d');
        
        if (!ctx) {
            console.error('[Ascenders] Não foi possível obter o contexto 2D do canvas');
            window.__ascendersComposerInitialized = false;
            return;
        }

        console.log('[Ascenders] Inicializando compositor...');

        // Detect available skins dynamically
        try {
            SKINS = await detectAvailableSkins();
            console.log('[Ascenders] Skins detectadas:', SKINS.length, SKINS);
        } catch (err) {
            console.error('[Ascenders] Erro ao detectar skins:', err);
            SKINS = [];
        }

        try {
            await renderComposition();
            attachEventListeners();
            updateAllDisplays();
            console.log('[Ascenders] Compositor inicializado com sucesso');
        } catch (err) {
            console.error('[Ascenders] Erro ao renderizar composição:', err);
            window.__ascendersComposerInitialized = false;
        }
        
        // Re-render on window resize so canvas follows container size
        if (typeof window !== 'undefined') {
            const debounced = debounce(() => {
                renderComposition().catch(err => {
                    console.error('[Ascenders] Erro ao re-renderizar:', err);
                });
            }, 120);
            window.addEventListener('resize', debounced);
        }
    }

    function debounce(fn, wait) {
        let t = null;
        return function(...args) {
            if (t) clearTimeout(t);
            t = setTimeout(() => fn.apply(this, args), wait);
        };
    }

    function attachEventListeners() {
        const arrows = document.querySelectorAll('.selector-arrow');
        const shareBtn = document.getElementById('share-btn');



        arrows.forEach(arrow => {
            arrow.addEventListener('click', handleArrowClick);
        });

        if (shareBtn) {
            shareBtn.addEventListener('click', shareComposition);

        } else {

        }
    }

    function handleArrowClick(e) {
        const control = e.currentTarget.dataset.control;
        const isPrev = e.currentTarget.classList.contains('selector-prev');
        const direction = isPrev ? -1 : 1;

        let max = 1;
        let currentValue = currentComposition[control];


        switch(control) {
            case 'rarity':
                max = RARITIES.length;
                break;
            case 'skin':
                // 0 = none, 1+ = skin index (so max is SKINS.length, allowing 0 to SKINS.length)
                max = SKINS.length;
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


        let newValue = currentValue + direction;
        if (control === 'rarity') {
            // Circular navigation for rarity
            if (newValue < 0) newValue = max - 1;
            if (newValue >= max) newValue = 0;
        } else if (control === 'skin') {
            // Circular navigation for skin (0 = none, 1+ = skin index)
            // Valid range: 0 (none) to max (last skin index)
            if (newValue < 0) newValue = max; // Wrap to last skin
            if (newValue > max) newValue = 0; // Wrap to none
        } else {

            if (newValue < 1) newValue = max;
            if (newValue > max) newValue = 1;
        }

        currentComposition[control] = newValue;


        if (control === 'rarity') {
            currentComposition.hair = 1;
            currentComposition.eyes = 1;
        }

        updateAllDisplays();
        renderComposition();
    }

    function updateAllDisplays() {
        document.getElementById('rarity-value').textContent = capitalize(RARITIES[currentComposition.rarity]);
        
        // Update skin display
        const skinValue = document.getElementById('skin-value');
        if (skinValue) {
            if (currentComposition.skin === 0) {
                skinValue.textContent = 'None';
            } else {
                const skinIndex = currentComposition.skin - 1;
                const skinName = SKINS[skinIndex] || 'Unknown';
                skinValue.textContent = capitalize(skinName);
            }
        }
        
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
        const skinIndex = currentComposition.skin;
        const hair = currentComposition.hair;
        const eyes = currentComposition.eyes;
        const nose = currentComposition.nose;
        const mouth = currentComposition.mouth;

        // Naked base is always the base body
        const bodyPath = `${BASE_PATH}/naked_base.webp`;
        
        // Custom skin (if selected)
        const skinPath = (skinIndex > 0 && SKINS[skinIndex - 1]) 
            ? `${SKINS_BASE_PATH}/${SKINS[skinIndex - 1]}.png` 
            : null;

        const borderFileName = `${rarity}_border.webp`;
        const borderPath = `${BASE_PATH}/${rarity}/${borderFileName}`;
        const eyePath = `${BASE_PATH}/${rarity}/${rarity}_eyes/${eyes}.webp`;
        const hairFolder = (rarity === 'mythic') ? 'mithyc_hair' : `${rarity}_hair`;
        const hairPath = `${BASE_PATH}/${rarity}/${hairFolder}/${hair}.webp`;
        const nosePath = `${BASE_PATH}/nose/${nose}.webp`;
        const mouthPath = `${BASE_PATH}/mouth/${mouth}.webp`;

        let layers = [];
        let firstImg;

        try {
            firstImg = await loadImage(borderPath);
            // Build layers: border, body (naked_base), eyes, hair (if no custom skin), nose, mouth, skin (if custom)
            layers = [borderPath, bodyPath, eyePath, nosePath, mouthPath];
            
            // Only add hair if no custom skin (custom skin may have headwear)
            if (!skinPath) {
                layers.splice(3, 0, hairPath); // Insert hair after eyes
            }
            
            // Add custom skin last (highest z-index)
            if (skinPath) {
                layers.push(skinPath);
            }
        } catch (err) {
            console.warn('[Ascenders] Erro ao carregar border, tentando alternativas:', err.message);

            try {
                firstImg = await loadImage(bodyPath);
            } catch (err2) {
                const candidates = [eyePath, nosePath, mouthPath];
                if (!skinPath && hairPath) candidates.push(hairPath);
                if (skinPath) candidates.push(skinPath);
                
                for (let i = 0; i < candidates.length; i++) {
                    try {
                        firstImg = await loadImage(candidates[i]);
                        layers = [candidates[i]];
                        break;
                    } catch (err3) {
                        // Continue trying
                        console.warn(`[Ascenders] Falha ao carregar ${candidates[i]}:`, err3.message);
                    }
                }
                if (!firstImg) {
                    console.error('[Ascenders] Não foi possível carregar nenhuma imagem base. Verifique os caminhos dos arquivos.');
                    return;
                }
            }
            if (!layers.length) {
                layers = [bodyPath, eyePath, nosePath, mouthPath];
                if (!skinPath && hairPath) {
                    layers.splice(2, 0, hairPath);
                }
                if (skinPath) {
                    layers.push(skinPath);
                }
            }
        }

        const dpr = window.devicePixelRatio || 1;
        
        // Get the parent container (composer-preview) dimensions
        const parentContainer = canvas.parentElement;
        const parentRect = parentContainer ? parentContainer.getBoundingClientRect() : null;
        
        // Calculate available space (subtract padding from parent)
        let availableWidth = firstImg.width;
        let availableHeight = firstImg.height;
        
        if (parentRect && parentContainer) {
            const parentStyle = getComputedStyle(parentContainer);
            const paddingTop = parseFloat(parentStyle.paddingTop) || 0;
            const paddingBottom = parseFloat(parentStyle.paddingBottom) || 0;
            const paddingLeft = parseFloat(parentStyle.paddingLeft) || 0;
            const paddingRight = parseFloat(parentStyle.paddingRight) || 0;
            
            availableWidth = parentRect.width - paddingLeft - paddingRight;
            availableHeight = parentRect.height - paddingTop - paddingBottom;
        }

        // Use available space as maximum dimensions
        let maxWidth = availableWidth > 0 ? availableWidth : firstImg.width;
        let maxHeight = availableHeight > 0 ? availableHeight : firstImg.height;

        // Calculate canvas size maintaining aspect ratio
        const imgAspect = firstImg.width / firstImg.height;
        let cssWidth, cssHeight;

        // Fit to available space while maintaining aspect ratio
        if (maxWidth / maxHeight > imgAspect) {
            // Container is wider than image aspect - fit to height
            cssHeight = maxHeight;
            cssWidth = Math.round(cssHeight * imgAspect);
        } else {
            // Container is taller than image aspect - fit to width
            cssWidth = maxWidth;
            cssHeight = Math.round(cssWidth / imgAspect);
        }

        // Ensure minimum size
        cssWidth = Math.max(50, cssWidth);
        cssHeight = Math.max(50, cssHeight);


        canvas.width = Math.round(cssWidth * dpr);
        canvas.height = Math.round(cssHeight * dpr);
        canvas.style.width = cssWidth + 'px';
        canvas.style.height = cssHeight + 'px';


        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);


        ctx.clearRect(0, 0, cssWidth, cssHeight);


        ctx.drawImage(firstImg, 0, 0, cssWidth, cssHeight);


        for (let i = 1; i < layers.length; i++) {
            try {
                const img = await loadImage(layers[i]);
                ctx.drawImage(img, 0, 0, cssWidth, cssHeight);
            } catch (err) {

            }
        }


        try {
            const rect = canvas.getBoundingClientRect();


            try {
                const data = canvas.toDataURL('image/webp');

            } catch (err) {

            }

        } catch (err) {

        }
    }

    async function shareComposition() {

        const shareCanvas = document.createElement('canvas');
        shareCanvas.width = 1200;
        shareCanvas.height = 800;
        const shareCtx = shareCanvas.getContext('2d');

        try {

            const background = await loadImage('/assets/images/nfts/ascender/back_share.webp');
            shareCtx.drawImage(background, 0, 0, 1200, 800);
        } catch (err) {

            shareCtx.fillStyle = '#f5f1e8';
            shareCtx.fillRect(0, 0, shareCanvas.width, shareCanvas.height);
        }


        const maxHeight = 610;
        const compositionX = 100;
        const availableVerticalSpace = 800; 


        const aspectRatio = canvas.width / canvas.height;
        let drawWidth, drawHeight;


        drawHeight = maxHeight;
        drawWidth = maxHeight * aspectRatio;


        const compositionY = (availableVerticalSpace - drawHeight) / 2;

        shareCtx.drawImage(canvas,
            compositionX,
            compositionY,
            drawWidth,
            drawHeight
        );


        shareCanvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = 'my-ascender.webp';
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
        });
    }

    function loadImage(src) {




        return new Promise((resolve, reject) => {
            const candidates = [src];
            if (src.endsWith('.webp')) {
                candidates.push(src.replace(/\.webp$/, '.png'));
            }

            let tried = 0;

            const tryCandidate = (candidate, useCrossOrigin) => {
                const img = new Image();
                if (useCrossOrigin) img.crossOrigin = 'anonymous';
                img.onload = () => {

                    resolve(img);
                };
                img.onerror = (e) => {

                    proceed();
                };
                img.src = candidate;
            };

            const proceed = () => {
                if (tried === 0) {

                    tried = 1;
                    tryCandidate(candidates[0], false);
                    return;
                }


                const nextIndex = Math.min(1, candidates.length - 1);
                if (nextIndex >= 0 && candidates[nextIndex] !== undefined && candidates[nextIndex] !== candidates[0]) {

                    tried = 2;
                    tryCandidate(candidates[nextIndex], true);
                    return;
                }

                if (tried === 2) {
                    tried = 3;
                    const next = candidates.length > 1 ? candidates[1] : null;
                    if (next) {
                        tryCandidate(next, false);
                        return;
                    }
                }

                reject(new Error(`Failed to load: ${src}`));
            };


            tryCandidate(candidates[0], true);
        });
    }


    // Aguardar DOM e também verificar se o componente foi carregado dinamicamente
    let initAttempts = 0;
    const MAX_INIT_ATTEMPTS = 50; // Tentar por até 5 segundos (50 * 100ms)
    
    function tryInitWithRetry() {
        const canvas = document.getElementById('ascender-canvas');
        if (canvas) {
            // Canvas encontrado, inicializar
            initAscendersComposer();
        } else {
            // Canvas ainda não encontrado, tentar novamente
            initAttempts++;
            if (initAttempts < MAX_INIT_ATTEMPTS) {
                setTimeout(tryInitWithRetry, 100);
            } else {
                console.warn('[Ascenders] Canvas não encontrado após múltiplas tentativas');
            }
        }
    }
    
    function startInit() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(tryInitWithRetry, 100);
            });
        } else {
            // DOM já carregado, começar a tentar
            setTimeout(tryInitWithRetry, 100);
        }
    }

    startInit();

    // Usar MutationObserver para detectar quando o canvas é adicionado ao DOM
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver((mutations) => {
            const canvas = document.getElementById('ascender-canvas');
            if (canvas && !window.__ascendersInitialized) {
                window.__ascendersInitialized = true;
                observer.disconnect();
                setTimeout(initAscendersComposer, 50);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    window.AscendersComposer = {
        init: initAscendersComposer
    };
})();

