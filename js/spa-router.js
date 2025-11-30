/**
 * ASCENDRIA - SPA Router v4
 * 
 * SPA apenas entre páginas de documentos (Lore, Whitepaper, Tokenomics)
 * O BackgroundLive permanece ativo e contínuo nessas páginas.
 * Outras páginas fazem navegação normal.
 */

(function() {
  'use strict';

  const CONFIG = {
    transitionDuration: 200
  };

  let isNavigating = false;
  let currentPath = normalizePath(window.location.pathname);

  /**
   * Normaliza path para comparação
   */
  function normalizePath(path) {
    path = path.replace(/index\.html$/, '');
    if (path !== '/' && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    return path;
  }

  /**
   * Verifica se é página de documentos
   */
  function isDocPage(path) {
    const normalized = normalizePath(path);
    return normalized.startsWith('/pages/lore') ||
           normalized.startsWith('/pages/whitepaper') ||
           normalized.startsWith('/pages/tokenomics');
  }

  /**
   * Inicializa o router
   */
  function init() {
    // Só ativa se estiver em página de documentos
    if (!isDocPage(window.location.pathname)) {
      console.log('📄 SPA Router: Modo normal (não é página de documento)');
      return;
    }
    
    document.addEventListener('click', handleClick);
    window.addEventListener('popstate', handlePopState);
    
    console.log('🚀 SPA Router v4 ativo (documentos)');
  }

  /**
   * Verifica se deve usar SPA
   */
  function shouldUseSPA(href) {
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || 
        href.startsWith('tel:') || href.startsWith('javascript:')) {
      return false;
    }
    
    // Links externos
    if (href.startsWith('http')) {
      try {
        const url = new URL(href);
        if (url.host !== window.location.host) return false;
        href = url.pathname;
      } catch {
        return false;
      }
    }
    
    // Resolve path
    let targetPath;
    try {
      const url = new URL(href, window.location.origin);
      targetPath = url.pathname;
    } catch {
      return false;
    }
    
    // SPA apenas entre páginas de documentos
    return isDocPage(currentPath) && isDocPage(targetPath);
  }

  /**
   * Intercepta cliques
   */
  function handleClick(e) {
    const link = e.target.closest('a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    
    if (link.target === '_blank' || e.ctrlKey || e.shiftKey || e.metaKey) return;
    if (!shouldUseSPA(href)) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🔗 SPA:', href);
    navigate(href);
  }

  /**
   * Navega para nova página de documento
   */
  async function navigate(href, pushState = true) {
    if (isNavigating) return;
    
    const url = new URL(href, window.location.origin);
    const targetPath = normalizePath(url.pathname);
    
    if (targetPath === currentPath) return;
    
    isNavigating = true;
    
    try {
      const main = document.querySelector('main');
      
      // Fade out
      if (main) {
        main.style.transition = `opacity ${CONFIG.transitionDuration}ms ease-out`;
        main.style.opacity = '0';
      }
      
      await sleep(CONFIG.transitionDuration);
      
      // Fetch nova página
      const response = await fetch(url.pathname);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      const newMain = doc.querySelector('main');
      if (!newMain) throw new Error('Main não encontrado');
      
      // Carrega CSS
      await loadPageCSS(doc);
      
      // Substitui conteúdo
      if (main) {
        main.innerHTML = newMain.innerHTML;
      }
      
      document.title = doc.title;
      
      // Fade in
      await sleep(50);
      if (main) {
        main.style.opacity = '1';
      }
      
      // Histórico
      if (pushState) {
        history.pushState({ path: targetPath }, '', url.pathname);
      }
      
      currentPath = targetPath;
      console.log(`✅ Navegou: ${targetPath}`);
      
    } catch (err) {
      console.error('❌ Erro SPA:', err);
      window.location.href = href;
    } finally {
      isNavigating = false;
    }
  }

  /**
   * Carrega CSS da página
   */
  async function loadPageCSS(doc) {
    const links = doc.querySelectorAll('link[rel="stylesheet"]');
    
    for (const link of links) {
      const href = link.getAttribute('href');
      if (!href || !href.includes('/pages/')) continue;
      if (document.querySelector(`link[href="${href}"]`)) continue;
      
      const newLink = document.createElement('link');
      newLink.rel = 'stylesheet';
      newLink.href = href;
      document.head.appendChild(newLink);
      
      await new Promise(resolve => {
        newLink.onload = resolve;
        newLink.onerror = resolve;
      });
    }
  }

  /**
   * Histórico (voltar/avançar)
   */
  function handlePopState(e) {
    const path = e.state?.path || window.location.pathname;
    if (isDocPage(path)) {
      navigate(path, false);
    } else {
      window.location.reload();
    }
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
