/**
 * DOM Handlers - Ascendria Site
 * Gerencia inicialização de componentes, scroll handlers e fallbacks
 *
 * SEGURANÇA: Este arquivo foi criado para remover scripts inline do HTML,
 * permitindo um CSP (Content Security Policy) mais restritivo e seguro.
 *
 * @version 1.0.0
 * @date 08/12/2025
 */

(function() {
    'use strict';

    // Configuração global
    const CONFIG = {
        FALLBACK_TIMEOUT: 3000,
        FOOTER_CHECK_DELAY: 1500,
        FOOTER_FINAL_FALLBACK_DELAY: 5000,
        SCROLL_TRIGGER_PERCENTAGE: 0.7
    };

    // Estado global
    let loaded = false;

    /**
     * ====================================
     * COMPONENT LOADING SYSTEM
     * ====================================
     */

    /**
     * Exibe a página após componentes carregados
     */
    function showPage() {
        if (loaded) return;
        loaded = true;
        document.body.classList.add('loaded');
    }

    /**
     * Carrega todos os componentes da página
     */
    async function loadComponents() {
        try {
            await Promise.all([
                ComponentLoader.load('topbar', 'topbar-placeholder'),
                ComponentLoader.load('backgroundlive', 'backgroundlive-placeholder'),
                ComponentLoader.load('nfts', 'nfts-placeholder'),
                ComponentLoader.load('footer', 'footer-placeholder')
            ]);

            // Verificar se footer foi carregado corretamente
            setTimeout(() => {
                verifyFooterLoaded();
            }, CONFIG.FOOTER_CHECK_DELAY);

        } catch (err) {
            console.error('[ERROR] Erro ao carregar componentes:', err);
            // Tentar fallback para footer
            injectFooterFallback();
        } finally {
            clearTimeout(fallbackTimer);
            requestAnimationFrame(() => {
                showPage();
                handleHashNavigation();
            });
        }
    }

    /**
     * Verifica se o footer foi carregado e tenta corrigir se necessário
     */
    function verifyFooterLoaded() {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        const footer = document.querySelector('.site-footer');

        if (footer) {
            // Footer encontrado - garantir visibilidade
            footer.style.display = 'block';
            footer.style.visibility = 'visible';
            footer.style.opacity = '1';
        } else {
            console.warn('[DEBUG FOOTER] Footer não encontrado, tentando fallback...');
            injectFooterFallback();
        }
    }

    /**
     * Injeta footer manualmente como fallback
     * TODO: Investigar causa raiz e remover este fallback no futuro
     */
    function injectFooterFallback() {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (!footerPlaceholder || footerPlaceholder.querySelector('.site-footer')) return;

        console.log('[FALLBACK] Injecting footer manually...');
        footerPlaceholder.innerHTML = `
            <footer class="site-footer" role="contentinfo">
                <div class="footer-container">
                    <p class="footer-copyright">&copy; 2025 Ascendria. Todos os direitos reservados.</p>
                    <nav class="footer-nav" aria-label="Footer Navigation">
                        <a href="/pages/whitepaper/">Whitepaper</a>
                        <a href="/pages/financialmodel/">Financial Model</a>
                        <a href="/pages/lore/">Lore</a>
                    </nav>
                    <div class="footer-socials" aria-label="Social Media Links">
                        <a href="https://discord.gg/wdAS9ey5pm" target="_blank" rel="noopener" aria-label="Discord">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                            </svg>
                        </a>
                        <a href="https://x.com/PlayAscendria" target="_blank" rel="noopener" aria-label="X (Twitter)">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a>
                        <a href="https://www.youtube.com/@PlayAscendria" target="_blank" rel="noopener" aria-label="YouTube">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                        </a>
                        <a href="https://www.tiktok.com/@playascendria" target="_blank" rel="noopener" aria-label="TikTok">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </footer>
        `;
    }

    /**
     * Lida com navegação por hash (#section) na URL
     */
    function handleHashNavigation() {
        try {
            if (window.location.hash) {
                const targetId = window.location.hash.replace('#', '');
                const el = document.getElementById(targetId);
                if (el) {
                    const topbarHeight = document.querySelector('.topbar')?.offsetHeight || 70;
                    const elPosition = el.getBoundingClientRect().top + window.scrollY;
                    const offsetPos = elPosition - topbarHeight - 20;
                    window.scrollTo({ top: offsetPos, behavior: 'smooth' });
                }
            }
        } catch (err) {
            // Non-fatal error
        }
    }

    /**
     * ====================================
     * NFT SECTION SCROLL REVEAL
     * ====================================
     */

    /**
     * Inicializa reveal da seção NFTs ao scroll
     */
    function initNftsScrollReveal() {
        const nftsContent = document.querySelector('#nfts .section-content');
        const nftsTitle = document.querySelector('.nfts-title');
        const nftsSection = document.querySelector('#nfts');
        const contentArea = document.querySelector('#content-area');

        if (!nftsContent || !nftsTitle || !nftsSection) return;

        let contentRevealed = false;
        let ticking = false;
        const scrollContainer = contentArea || window;

        /**
         * Verifica se deve revelar conteúdo NFTs
         */
        function checkNftsScroll() {
            const sectionRect = nftsSection.getBoundingClientRect();
            const triggerPoint = window.innerHeight * CONFIG.SCROLL_TRIGGER_PERCENTAGE;

            // Revelar conteúdo e título juntos
            if (sectionRect.top < triggerPoint) {
                if (!contentRevealed) {
                    nftsContent.classList.add('visible');
                    nftsTitle.classList.add('visible');
                    contentRevealed = true;
                }
            } else {
                if (contentRevealed) {
                    nftsContent.classList.remove('visible');
                    nftsTitle.classList.remove('visible');
                    contentRevealed = false;
                }
            }
            ticking = false;
        }

        /**
         * Request check com throttling via requestAnimationFrame
         */
        function requestCheck() {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(checkNftsScroll);
            }
        }

        // Inicializar
        checkNftsScroll();
        scrollContainer.addEventListener('scroll', requestCheck, { passive: true });
        window.addEventListener('resize', requestCheck, { passive: true });
    }

    /**
     * ====================================
     * FOOTER FINAL FALLBACK
     * ====================================
     */

    /**
     * Fallback final: garante footer visível após 5 segundos
     * TODO: Remover quando bug do footer for corrigido definitivamente
     */
    function setupFooterFinalFallback() {
        setTimeout(() => {
            const footer = document.querySelector('.site-footer');
            if (footer) {
                footer.style.cssText = `
                    display: block !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    position: relative !important;
                    z-index: 100 !important;
                `;
            }
        }, CONFIG.FOOTER_FINAL_FALLBACK_DELAY);
    }

    /**
     * ====================================
     * INITIALIZATION
     * ====================================
     */

    /**
     * Inicializa todos os handlers quando DOM estiver pronto
     */
    function init() {
        // Timeout de fallback
        window.fallbackTimer = setTimeout(() => {
            showPage();
        }, CONFIG.FALLBACK_TIMEOUT);

        // Carregar componentes
        loadComponents();

        // Inicializar scroll reveal para NFTs
        initNftsScrollReveal();

        // Setup fallback final para footer
        setupFooterFinalFallback();
    }

    // Executar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expor funções úteis globalmente (opcional)
    window.AscendriaHandlers = {
        showPage,
        loadComponents,
        verifyFooterLoaded
    };

})();
