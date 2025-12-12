

(function() {
    'use strict';

    
    function initNftsGallery() {

        const thumbnails = document.querySelectorAll('.nft-thumbnail');
        thumbnails.forEach(thumbnail => {
            thumbnail.removeAttribute('tabindex');
            thumbnail.removeAttribute('role');
            thumbnail.removeAttribute('aria-label');
            thumbnail.classList.add('zoom-disabled');
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

    // Simplified skin detection for production: synchronous, single known skin
    function detectAvailableSkins() {
        return ['ronin'];
    }

    // Expose for other scripts that may call this helper
    try { window.detectAvailableSkins = detectAvailableSkins; } catch (e) { /* ignore */ }

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
        rarity: RARITIES.indexOf('mythic') || 0, 
        body: 0, 
        hair: 3,
        eyes: 3,
        nose: 2,
        mouth: 4
    };

    let canvasSize = null;

    async function initAscendersComposer() {
        // Prevenir múltiplas inicializações
        if (window.__ascendersComposerInitialized) {
            return Promise.resolve();
        }
        
        // Aguardar o canvas estar disponível (pode ser carregado dinamicamente)
        canvas = document.getElementById('ascender-canvas');
        
        if (!canvas) {
            return Promise.reject(new Error('Canvas not found'));
        }

        // Definir flag ANTES de qualquer operação assíncrona para prevenir race conditions
        window.__ascendersComposerInitialized = true;
        
        ctx = canvas.getContext('2d');
        
        if (!ctx) {
            window.__ascendersComposerInitialized = false;
            return Promise.reject(new Error('Canvas context failed'));
        }

        try {
            await renderComposition();
            attachEventListeners();
            updateAllDisplays();
            // Flag já está true - sucesso!
            return Promise.resolve();
        } catch (err) {
            window.__ascendersComposerInitialized = false;
            return Promise.reject(err);
        }
        
        // Re-render on window resize so canvas follows container size
        if (typeof window !== 'undefined') {
            const debounced = debounce(() => {
                renderComposition().catch(() => {
                    // Silently handle render errors on resize
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


        let newValue = currentValue + direction;
        if (control === 'rarity' || control === 'body') {

            if (newValue < 0) newValue = max - 1;
            if (newValue >= max) newValue = 0;
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



        const borderFileName = `${rarity}_border.webp`;
        const borderPath = `${BASE_PATH}/${rarity}/${borderFileName}`;
        const bodyPath = `${BASE_PATH}/${body}.webp`;
        const eyePath = `${BASE_PATH}/${rarity}/${rarity}_eyes/${eyes}.webp`;
        const hairFolder = (rarity === 'mythic') ? 'mithyc_hair' : `${rarity}_hair`;
        const hairPath = `${BASE_PATH}/${rarity}/${hairFolder}/${hair}.webp`;
        const nosePath = `${BASE_PATH}/nose/${nose}.webp`;
        const mouthPath = `${BASE_PATH}/mouth/${mouth}.webp`;

        let layers = [];
        let firstImg;

        try {

            firstImg = await loadImage(borderPath);
            layers = [borderPath, bodyPath, eyePath, hairPath, nosePath, mouthPath];
        } catch (err) {

            try {
                firstImg = await loadImage(bodyPath);
            } catch (err2) {


                const candidates = [eyePath, hairPath, nosePath, mouthPath];
                for (let i = 0; i < candidates.length; i++) {
                    try {
                        firstImg = await loadImage(candidates[i]);
                        layers = [candidates[i]];

                        break;
                    } catch (err3) {

                    }
                }
                if (!firstImg) {


                    return;
                }
            }
            if (!layers.length) layers = [bodyPath, eyePath, hairPath, nosePath, mouthPath];
        }

        const rect = canvas.getBoundingClientRect();
        const parentRect = canvas.parentElement ? canvas.parentElement.getBoundingClientRect() : rect;
        const dpr = window.devicePixelRatio || 1;


        let maxWidth = (rect.width && rect.width > 0) ? rect.width : firstImg.width;
        let maxHeight = (rect.height && rect.height > 0) ? rect.height : firstImg.height;
        maxWidth = Math.min(maxWidth, parentRect.width || maxWidth);
        maxHeight = Math.min(maxHeight, parentRect.height || maxHeight);


        const imgAspect = firstImg.width / firstImg.height;
        let cssWidth = firstImg.width;
        let cssHeight = firstImg.height;

        if (cssWidth > maxWidth) {
            cssWidth = maxWidth;
            cssHeight = Math.round(cssWidth / imgAspect);
        }
        if (cssHeight > maxHeight) {
            cssHeight = maxHeight;
            cssWidth = Math.round(cssHeight * imgAspect);
        }


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


    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initAscendersComposer().catch(() => {
                // Falha silenciosa - tentará novamente se necessário
            });
        });
    } else {
        initAscendersComposer().catch(() => {
            // Falha silenciosa - tentará novamente se necessário
        });
    }

    window.AscendersComposer = {
        init: initAscendersComposer
    };
})();
