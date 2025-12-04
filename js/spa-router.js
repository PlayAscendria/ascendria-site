/**
 * ASCENDRIA - SPA Router v5
 * 
 * Funcionalidades:
 * 1. SPA entre páginas de documentos (Lore, Whitepaper, Tokenomics)
 *    - BackgroundLive permanece ativo e contínuo
 * 2. Transição suave da Home/About para páginas de documentos
 *    - Fade overlay elegante
 * 3. Navegação normal para outras páginas
 */

(function() {
  'use strict';

  const CONFIG = {
    transitionDuration: 200,
    fadeOutDuration: 150  // Bem mais rápido
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
   * Verifica se é página principal (Home, About)
   */
  function isMainPage(path) {
    const normalized = normalizePath(path);
    return normalized === '/' || 
           normalized === '' ||
           normalized === '/index' ||
           normalized === '/about';
  }

  /**
   * Fade out da página atual (dissolução rápida)
   * Mantém a TopBar visível durante a transição
   */
  async function fadeOutPage() {
    // Seleciona apenas o conteúdo, nunca a topbar
    // Home: #content-area | Docs: main
    const contentArea = document.getElementById('content-area');
    const main = document.querySelector('main');
    
    const target = contentArea || main;
    
    if (target) {
      target.style.transition = `opacity ${CONFIG.fadeOutDuration}ms ease-out`;
      target.style.opacity = '0';
    }
    
    await sleep(CONFIG.fadeOutDuration);
  }

  /**
   * Inicializa o router
   */
  function init() {
    document.addEventListener('click', handleClick);
    window.addEventListener('popstate', handlePopState);
  }

  /**
   * Determina o tipo de navegação
   */
  function getNavigationType(fromPath, toPath) {
    const fromDoc = isDocPage(fromPath);
    const toDoc = isDocPage(toPath);
    const fromMain = isMainPage(fromPath);
    const toMain = isMainPage(toPath);

    if (fromDoc && toDoc) return 'doc-to-doc';      // SPA puro
    if (fromMain && toDoc) return 'main-to-doc';    // Transição suave
    if (fromDoc && toMain) return 'doc-to-main';    // Transição suave
    return 'normal';                                 // Reload normal
  }

  /**
   * Verifica se deve interceptar o link
   */
  function shouldIntercept(href) {
    if (!href || href.startsWith('mailto:') || 
        href.startsWith('tel:') || href.startsWith('javascript:')) {
      return false;
    }
    
    // Links externos
    if (href.startsWith('http')) {
      try {
        const url = new URL(href);
        if (url.host !== window.location.host) return false;
      } catch {
        return false;
      }
    }
    
    return true;
  }

  /**
   * Verifica se é link de hash (âncora) para a mesma página
   */
  function isHashLink(href) {
    if (!href) return false;
    
    // Link começa com # = âncora na página atual
    if (href.startsWith('#')) return true;
    
    // Link com hash para a página atual (ex: /index.html#nfts quando estamos em /)
    try {
      const url = new URL(href, window.location.origin);
      const targetPath = normalizePath(url.pathname);
      const hasHash = url.hash && url.hash.length > 1;
      
      // Se tem hash e o path é a mesma página ou é a home
      if (hasHash) {
        const isCurrentPage = targetPath === currentPath;
        const isBothHome = (targetPath === '/' || targetPath === '/index' || targetPath === '') && 
                          (currentPath === '/' || currentPath === '/index' || currentPath === '');
        return isCurrentPage || isBothHome;
      }
    } catch {
      return false;
    }
    
    return false;
  }

  /**
   * Faz scroll suave para uma seção
   */
  function smoothScrollTo(hash) {
    if (!hash || hash === '#') return;
    
    const targetId = hash.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      // Offset para o topbar
      const topbarHeight = document.querySelector('.topbar')?.offsetHeight || 70;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - topbarHeight - 20;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Atualiza URL sem reload
      history.pushState(null, '', hash);
      return true;
    }
    
    return false;
  }

  /**
   * Intercepta cliques
   */
  function handleClick(e) {
    const link = e.target.closest('a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    
    if (link.target === '_blank' || e.ctrlKey || e.shiftKey || e.metaKey) return;
    if (!shouldIntercept(href)) return;
    
    // Verifica se é link de hash (âncora)
    if (isHashLink(href)) {
      e.preventDefault();
      e.stopPropagation();
      
      // Extrai o hash
      let hash;
      if (href.startsWith('#')) {
        hash = href;
      } else {
        try {
          const url = new URL(href, window.location.origin);
          hash = url.hash;
        } catch {
          return;
        }
      }
      
      smoothScrollTo(hash);
      return;
    }
    
    // Resolve path para outras navegações
    let targetPath;
    try {
      const url = new URL(href, window.location.origin);
      targetPath = url.pathname;
    } catch {
      return;
    }
    
    const navType = getNavigationType(currentPath, targetPath);
    
    // Navegação normal para páginas não relacionadas
    if (navType === 'normal') return;
    
    e.preventDefault();
    e.stopPropagation();
    
    navigate(href, navType);
  }

  /**
   * Navega para nova página
   */
  async function navigate(href, navType, pushState = true) {
    if (isNavigating) return;
    
    const url = new URL(href, window.location.origin);
    const targetPath = normalizePath(url.pathname);
    
    if (targetPath === currentPath) return;
    
    isNavigating = true;
    
    try {
      if (navType === 'doc-to-doc') {
        // SPA puro entre documentos
        await navigateDocToDoc(url, targetPath, pushState);
      } else if (navType === 'main-to-doc' || navType === 'doc-to-main') {
        // Fade out suave da página atual
        await navigateWithFade(url, targetPath, pushState);
      }
      
    } catch (err) {
      console.error('❌ Erro SPA:', err);
      window.location.href = href;
    } finally {
      isNavigating = false;
    }
  }

  /**
   * Navegação SPA entre documentos (BackgroundLive contínuo)
   */
  async function navigateDocToDoc(url, targetPath, pushState) {
    console.log('[SPA] navigateDocToDoc started:', targetPath);
    
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
      console.log('[SPA] Main content replaced');
    }
    
    document.title = doc.title;
    
    // Carrega e executa scripts da página
    await loadPageScripts(doc, targetPath);
    
    // Fade in
    await sleep(50);
    if (main) {
      main.style.opacity = '1';
    }
    
    console.log('[SPA] navigateDocToDoc completed:', targetPath);
    
    // Histórico
    if (pushState) {
      history.pushState({ path: targetPath, type: 'doc-to-doc' }, '', url.pathname);
    }
    
    currentPath = targetPath;
  }

  /**
   * Navegação com fade out suave (Home ↔ Docs)
   */
  async function navigateWithFade(url, targetPath, pushState) {
    // Fade out rápido
    await fadeOutPage();
    
    // Navega imediatamente
    window.location.href = url.pathname;
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
   * Carrega e executa scripts específicos da página
   */
  async function loadPageScripts(doc, targetPath) {
    const scripts = doc.querySelectorAll('script[src*="/pages/"]');
    
    console.log('[SPA] Loading scripts for:', targetPath, 'Found:', scripts.length);
    
    for (const script of scripts) {
      const src = script.getAttribute('src');
      if (!src) continue;
      
      console.log('[SPA] Processing script:', src);
      
      // Remover script antigo se existir (para permitir recarregamento)
      // Busca por scripts que contenham o mesmo path (ignora query string de cache)
      const baseSrc = src.split('?')[0];
      const existingScripts = document.querySelectorAll(`script[src*="${baseSrc}"]`);
      console.log('[SPA] Removing existing scripts:', existingScripts.length);
      existingScripts.forEach(s => s.remove());
      
      // Resetar flag de inicialização do container correspondente
      if (src.includes('tokenomics')) {
        const container = document.querySelector('.tokenomics-container');
        console.log('[SPA] Tokenomics container found:', !!container);
        if (container) {
          container.dataset.initialized = 'false';
          container.innerHTML = '';
        }
        window._tokenomicsRetries = 0;
      }
      if (src.includes('whitepaper')) {
        const container = document.querySelector('.whitepaper-container');
        console.log('[SPA] Whitepaper container found:', !!container);
        if (container) {
          container.dataset.initialized = 'false';
          container.innerHTML = '';
        }
      }
      
      // Carregar novo script
      try {
        await new Promise((resolve, reject) => {
          const newScript = document.createElement('script');
          newScript.src = baseSrc + '?t=' + Date.now(); // Cache bust
          newScript.onload = () => {
            console.log('[SPA] Script loaded successfully:', baseSrc);
            resolve();
          };
          newScript.onerror = (err) => {
            console.error('[SPA] Script load error:', baseSrc, err);
            reject(err);
          };
          document.body.appendChild(newScript);
        });
      } catch (err) {
        console.error('[SPA] Failed to load script:', src, err);
      }
    }
  }

  /**
   * Histórico (voltar/avançar)
   */
  function handlePopState(e) {
    const path = e.state?.path || window.location.pathname;
    const type = e.state?.type || 'normal';
    
    if (type === 'doc-to-doc' && isDocPage(path) && isDocPage(currentPath)) {
      navigate(path, 'doc-to-doc', false);
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
