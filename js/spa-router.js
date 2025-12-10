

(function() {
  'use strict';

  const CONFIG = {
    transitionDuration: 200,
    fadeOutDuration: 150  
  };

  let isNavigating = false;
  let currentPath = normalizePath(window.location.pathname);

  
  function normalizePath(path) {
    path = path.replace(/index\.html$/, '');
    if (path !== '/' && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    return path;
  }

  
  function isDocPage(path) {
    const normalized = normalizePath(path);
    return normalized.startsWith('/pages/lore') ||
           normalized.startsWith('/pages/whitepaper') ||
           normalized.startsWith('/pages/financialmodel');
  }

  
  function isMainPage(path) {
    const normalized = normalizePath(path);
    return normalized === '/' || 
           normalized === '' ||
           normalized === '/index' ||
           normalized === '/about';
  }

  
  async function fadeOutPage() {


    const contentArea = document.getElementById('content-area');
    const main = document.querySelector('main');
    
    const target = contentArea || main;
    
    if (target) {
      target.style.transition = `opacity ${CONFIG.fadeOutDuration}ms ease-out`;
      target.style.opacity = '0';
    }
    
    await sleep(CONFIG.fadeOutDuration);
  }

  
  function init() {
    document.addEventListener('click', handleClick);
    window.addEventListener('popstate', handlePopState);
  }

  
  function getNavigationType(fromPath, toPath) {
    const fromDoc = isDocPage(fromPath);
    const toDoc = isDocPage(toPath);
    const fromMain = isMainPage(fromPath);
    const toMain = isMainPage(toPath);

    if (fromDoc && toDoc) return 'doc-to-doc';      
    if (fromMain && toDoc) return 'main-to-doc';    
    if (fromDoc && toMain) return 'doc-to-main';    
    return 'normal';                                 
  }

  
  function shouldIntercept(href) {
    if (!href || href.startsWith('mailto:') || 
        href.startsWith('tel:') || href.startsWith('javascript:')) {
      return false;
    }
    

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

  
  function isHashLink(href) {
    if (!href) return false;
    

    if (href.startsWith('#')) return true;
    

    try {
      const url = new URL(href, window.location.origin);
      const targetPath = normalizePath(url.pathname);
      const hasHash = url.hash && url.hash.length > 1;
      

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

  
  function smoothScrollTo(hash) {
    if (!hash || hash === '#') return;
    
    const targetId = hash.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {

      const topbarHeight = document.querySelector('.topbar')?.offsetHeight || 70;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - topbarHeight - 20;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      

      history.pushState(null, '', hash);
      return true;
    }
    
    return false;
  }

  
  function handleClick(e) {
    const link = e.target.closest('a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    
    if (link.target === '_blank' || e.ctrlKey || e.shiftKey || e.metaKey) return;
    if (!shouldIntercept(href)) return;
    

    if (isHashLink(href)) {
      e.preventDefault();
      e.stopPropagation();
      

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
    

    let targetPath;
    try {
      const url = new URL(href, window.location.origin);
      targetPath = url.pathname;
    } catch {
      return;
    }
    
    const navType = getNavigationType(currentPath, targetPath);
    

    if (navType === 'normal') return;
    
    e.preventDefault();
    e.stopPropagation();
    
    navigate(href, navType);
  }

  
  async function navigate(href, navType, pushState = true) {
    if (isNavigating) return;
    
    const url = new URL(href, window.location.origin);
    const targetPath = normalizePath(url.pathname);
    
    if (targetPath === currentPath) return;
    
    isNavigating = true;
    
    try {
      if (navType === 'doc-to-doc') {

        await navigateDocToDoc(url, targetPath, pushState);
      } else if (navType === 'main-to-doc' || navType === 'doc-to-main') {

        await navigateWithFade(url, targetPath, pushState);
      }
      
    } catch (err) {

      window.location.href = href;
    } finally {
      isNavigating = false;
    }
  }

  
  async function navigateDocToDoc(url, targetPath, pushState) {
    const main = document.querySelector('main');
    

    if (main) {
      main.style.transition = `opacity ${CONFIG.transitionDuration}ms ease-out`;
      main.style.opacity = '0';
    }
    
    await sleep(CONFIG.transitionDuration);
    

    const response = await fetch(url.pathname);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const newMain = doc.querySelector('main');
    if (!newMain) throw new Error('Main não encontrado');
    

    await loadPageCSS(doc);
    

    if (main) {
      main.innerHTML = newMain.innerHTML;
    }
    
    document.title = doc.title;
    

    await loadPageScripts(doc, targetPath);
    

    await sleep(50);
    if (main) {
      main.style.opacity = '1';
    }
    

    if (pushState) {
      history.pushState({ path: targetPath, type: 'doc-to-doc' }, '', url.pathname);
    }
    
    currentPath = targetPath;
  }

  
  async function navigateWithFade(url, targetPath, pushState) {

    await fadeOutPage();
    

    window.location.href = url.href;
  }

  
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

  
  async function loadPageScripts(doc, targetPath) {
    const scripts = doc.querySelectorAll('script[src*="/pages/"]');
    
    for (const script of scripts) {
      const src = script.getAttribute('src');
      if (!src) continue;
      


      const baseSrc = src.split('?')[0];
      const existingScripts = document.querySelectorAll(`script[src*="${baseSrc}"]`);
      existingScripts.forEach(s => s.remove());
      

      if (src.includes('financialmodel')) {
        const container = document.querySelector('.financialmodel-container');
        if (container) {
          container.dataset.initialized = 'false';
          container.innerHTML = '';
        }
        window._financialmodelRetries = 0;
      }
      if (src.includes('whitepaper')) {
        const container = document.querySelector('.whitepaper-container');
        if (container) {
          container.dataset.initialized = 'false';
          container.innerHTML = '';
        }
      }
      

      try {
        await new Promise((resolve, reject) => {
          const newScript = document.createElement('script');
          newScript.src = baseSrc + '?t=' + Date.now(); 
          newScript.onload = resolve;
          newScript.onerror = reject;
          document.body.appendChild(newScript);
        });
      } catch (err) {

      }
    }
  }

  
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


  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

