/**
 * ASCENDRIA - Loading Home Manager (AAA Preloader)
 * 
 * Gerencia a tela de loading da home page usando o AssetPreloader.
 * - Primeira visita: carrega TODOS os assets com progresso real
 * - Visitas subsequentes: pula instantaneamente (sessionStorage)
 * 
 * FLUXO:
 * 1. Script executa ANTES do DOM completar
 * 2. Verifica sessionStorage.alreadyLoaded
 * 3. Se já carregou: remove loading ANTES do primeiro frame
 * 4. Se primeira vez: ativa loading, inicia preloader, mostra progresso real
 */

(function initLoadingManager() {
  'use strict';
  
  // Verifica IMEDIATAMENTE se já carregou na sessão
  const alreadyLoaded = sessionStorage.getItem('alreadyLoaded');
  
  if (alreadyLoaded) {
    // ========== SEGUNDA VISITA ==========
    // Remove loading ANTES do primeiro paint - SEM FLASH
    const removeLoading = () => {
      const ls = document.getElementById('loading-screen');
      if (ls) {
        ls.remove();
      }
    };
    
    if (document.readyState !== 'loading') {
      removeLoading();
    } else {
      document.addEventListener('DOMContentLoaded', removeLoading, { once: true });
    }
    return;
  }
  
  // ========== PRIMEIRA VISITA ==========
  // Aguarda DOM e inicia preloader
  const initPreloader = async () => {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (!loadingScreen) {
      return;
    }
    
    // Ativa o loading (CSS: opacity 0 -> 1)
    loadingScreen.classList.add('active');
    
    try {
      // Verifica se o preloader está disponível
      if (typeof startAssetPreloader === 'function') {
        await startAssetPreloader();
      } else {
        // Fallback: preloader não carregou, usa método simples
        await fallbackLoading(loadingScreen);
      }
    } catch (err) {
      // Em caso de erro, finaliza o loading
      finishLoading(loadingScreen);
    }
  };
  
  /**
   * Fallback caso o asset-preloader.js não carregue
   */
  async function fallbackLoading(loadingScreen) {
    const progressText = document.getElementById('progressValue');
    const narrativeText = document.getElementById('paintingText');
    
    // Simula progresso
    for (let i = 0; i <= 100; i += 10) {
      if (progressText) progressText.textContent = `${i}%`;
      if (narrativeText) {
        if (i < 30) narrativeText.textContent = 'Loading...';
        else if (i < 60) narrativeText.textContent = 'Almost there...';
        else if (i < 90) narrativeText.textContent = 'Final touches...';
        else narrativeText.textContent = '✓ Ready!';
      }
      await new Promise(r => setTimeout(r, 150));
    }
    
    finishLoading(loadingScreen);
  }
  
  /**
   * Finaliza o loading
   */
  function finishLoading(loadingScreen) {
    sessionStorage.setItem('alreadyLoaded', '1');
    
    setTimeout(() => {
      loadingScreen.classList.add('completed');
      
      setTimeout(() => {
        if (loadingScreen.parentNode) {
          loadingScreen.remove();
        }
      }, 300);
    }, 500);
  }
  
  // Inicia quando DOM estiver pronto
  if (document.readyState !== 'loading') {
    initPreloader();
  } else {
    document.addEventListener('DOMContentLoaded', initPreloader, { once: true });
  }
  
  // ========== FALLBACK DE SEGURANÇA ==========
  // Garante que loading nunca bloqueie o site (máximo 20s)
  setTimeout(() => {
    const ls = document.getElementById('loading-screen');
    if (ls && ls.parentNode) {
      sessionStorage.setItem('alreadyLoaded', '1');
      ls.remove();
    }
  }, 20000);
  
})();

