// Inicializa os dropdowns da topbar (chamado após a injeção do HTML)
(function(){
  // Função global para fechar todos os dropdowns
  let globalCloseAll = null;

  function initTopbarDropdowns(root){
    const scope = root || document;
    const dropdownToggles = scope.querySelectorAll('.main-nav .has-dropdown > a');
    function closeAll(){
      dropdownToggles.forEach(a => {
        a.setAttribute('aria-expanded','false');
        const li = a.parentElement;
        if(li && li.classList.contains('open')) li.classList.remove('open');
      });
    }
    // Expor closeAll globalmente
    globalCloseAll = closeAll;

    dropdownToggles.forEach(a => {
      // garantir que não sejam adicionados múltiplos handlers
      a.addEventListener('click', function(e){
        e.preventDefault();
        const li = this.parentElement;
        const isOpen = this.getAttribute('aria-expanded') === 'true';
        if(!isOpen) {
          closeAll();
          this.setAttribute('aria-expanded','true');
          if(li) li.classList.add('open');
        } else {
          this.setAttribute('aria-expanded','false');
          if(li) li.classList.remove('open');
        }
      });
    });

    // Fecha menus ao clicar fora
    document.addEventListener('click', function(e){
      if(!e.target.closest('.main-nav')) closeAll();
    });
  }

  /**
   * Smooth scroll handler for anchors that point to index section hashes.
   * If we are already on the home page, prevent default and do smooth scroll.
   * If we are on another page, allow normal navigation (the href already points to /index.html#...)
   */
  function initTopbarAnchors(root){
    const scope = root || document;
    const hashAnchors = scope.querySelectorAll('.topbar a[href*="#"], .main-nav a[href*="#"], .mobile-nav a[href*="#"]');
    console.log('[TopBar] Inicializando', hashAnchors.length, 'anchors com hash');
    hashAnchors.forEach(a => {
      // Prevent double-binding
      if (a.dataset.topbarAnchorInit === '1') return;
      a.dataset.topbarAnchorInit = '1';
      // avoid multiple attachments
      a.addEventListener('click', function(e){
        try {
          const href = a.getAttribute('href');
          console.log('[TopBar] Click em anchor:', href);
          if (!href) return;
          // If anchor is simply '#something' or '/index.html#something'
          const url = new URL(href, window.location.origin);
          const targetPath = url.pathname.replace(/index\.html$/, '');
          const currentPath = window.location.pathname.replace(/index\.html$/, '');
          const isHomePath = (p) => ['', '/', '/index', '/index.html', '/index/'].includes(p);
          const isHomeTarget = isHomePath(targetPath);
          const isHomeCurrent = isHomePath(currentPath);
          console.log('[TopBar] isHomeTarget:', isHomeTarget, 'isHomeCurrent:', isHomeCurrent, 'hash:', url.hash);
          if (isHomeTarget && isHomeCurrent && url.hash) {
            // already on home page, scroll to target
            e.preventDefault();
            e.stopPropagation();
            const targetId = url.hash.replace('#', '');
            const el = document.getElementById(targetId);
            console.log('[TopBar] Navegando para:', targetId, 'elemento encontrado:', !!el);
            if (el) {
              // O scroll está em #content-area, não no window
              const contentArea = document.getElementById('content-area');
              const scrollContainer = contentArea || window;
              const topbarHeight = document.querySelector('.topbar')?.offsetHeight || 70;

              if (contentArea) {
                // Scroll no container customizado
                const containerRect = contentArea.getBoundingClientRect();
                const elRect = el.getBoundingClientRect();
                const scrollTop = contentArea.scrollTop;
                const offsetPos = elRect.top - containerRect.top + scrollTop - topbarHeight - 20;
                console.log('[TopBar] Scrolling content-area para:', offsetPos);
                contentArea.scrollTo({ top: offsetPos, behavior: 'smooth' });
              } else {
                // Fallback: scroll no window
                const elPosition = el.getBoundingClientRect().top + window.scrollY;
                const offsetPos = elPosition - topbarHeight - 20;
                console.log('[TopBar] Scrolling window para:', offsetPos);
                window.scrollTo({ top: offsetPos, behavior: 'smooth' });
              }

              history.pushState(null, '', url.hash);
              // Fechar dropdown após navegação
              if (globalCloseAll) globalCloseAll();
            }
          }
        } catch (err) {
          console.error('[TopBar] Erro no anchor handler:', err);
        }
      });
    });
  }

  /**
   * Inicializa navegação do logo para .hero-inner
   */
  function initLogoNavigation(root){
    const scope = root || document;
    const logoLink = scope.querySelector('.logo-link');
    console.log('[TopBar] Logo link encontrado:', !!logoLink);
    if (!logoLink) return;

    // Evitar múltiplas vinculações
    if (logoLink.dataset.logoNavInit === '1') return;
    logoLink.dataset.logoNavInit = '1';

    logoLink.addEventListener('click', function(e){
      try {
        const href = this.getAttribute('href');
        console.log('[TopBar] Click no logo:', href);
        if (!href) return;

        const url = new URL(href, window.location.origin);
        const targetPath = url.pathname.replace(/index\.html$/, '');
        const currentPath = window.location.pathname.replace(/index\.html$/, '');
        const isHomePath = (p) => ['', '/', '/index', '/index.html', '/index/'].includes(p);
        const isHomeTarget = isHomePath(targetPath);
        const isHomeCurrent = isHomePath(currentPath);
        console.log('[TopBar] Logo - isHomeTarget:', isHomeTarget, 'isHomeCurrent:', isHomeCurrent);

        if (isHomeTarget && isHomeCurrent) {
          // Estamos na home, fazer scroll suave para .hero-inner
          e.preventDefault();
          e.stopPropagation();

          const heroInner = document.querySelector('.hero-inner');
          console.log('[TopBar] Hero inner encontrado:', !!heroInner);
          if (heroInner) {
            // O scroll está em #content-area, não no window
            const contentArea = document.getElementById('content-area');
            const topbarHeight = document.querySelector('.topbar')?.offsetHeight || 70;

            if (contentArea) {
              // Scroll no container customizado - voltar ao topo
              console.log('[TopBar] Scrolling content-area (logo) para topo');
              contentArea.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              // Fallback: scroll no window
              const elPosition = heroInner.getBoundingClientRect().top + window.scrollY;
              const offsetPos = elPosition - topbarHeight;
              console.log('[TopBar] Scrolling window (logo) para:', offsetPos);
              window.scrollTo({ top: offsetPos, behavior: 'smooth' });
            }
            history.pushState(null, '', '/');
          }
        }
      } catch (err) {
        console.error('[TopBar] Erro no logo handler:', err);
      }
    });
  }

  // Expor no escopo global caso seja útil
  window.__initTopbarDropdowns = initTopbarDropdowns;
  window.__initTopbarAnchors = initTopbarAnchors;
  window.__initLogoNavigation = initLogoNavigation;
})();

/**
 * Mobile Hamburger Menu - Toggle e Interações
 */
(function(){
  function initHamburgerMenu(){
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

    if(!hamburgerBtn || !mobileMenu) return;

    // Toggle menu principal
    hamburgerBtn.addEventListener('click', function() {
      const isActive = hamburgerBtn.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      hamburgerBtn.setAttribute('aria-expanded', isActive);
      mobileMenu.setAttribute('aria-hidden', !isActive);
    });

    // Fechar menu quando clicar em um link
    const mobileMenuLinks = document.querySelectorAll('.mobile-nav-list a');
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburgerBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', false);
        mobileMenu.setAttribute('aria-hidden', true);
      });
    });

    // Toggle dos submenus (dropdowns)
    mobileDropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        
        // Fechar outros dropdowns
        mobileDropdownToggles.forEach(otherToggle => {
          if (otherToggle !== toggle) {
            otherToggle.setAttribute('aria-expanded', false);
          }
        });

        // Toggle do dropdown atual
        toggle.setAttribute('aria-expanded', !isExpanded);
      });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
      const isClickInsideMenu = mobileMenu.contains(event.target);
      const isClickOnHamburger = hamburgerBtn.contains(event.target);

      if (!isClickInsideMenu && !isClickOnHamburger && mobileMenu.classList.contains('active')) {
        hamburgerBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', false);
        mobileMenu.setAttribute('aria-hidden', true);
      }
    });
  }

  // Executar quando o DOM estiver pronto
  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHamburgerMenu);
  } else {
    initHamburgerMenu();
  }

  // Expor para testes
  window.__initHamburgerMenu = initHamburgerMenu;
})();

// Inicializar anchors, logo e dropdowns do topbar quando o documento estiver pronto
function initializeTopbar() {
  // Aguardar até que o topbar esteja no DOM
  const checkTopbar = setInterval(() => {
    const topbar = document.getElementById('topbar');
    if (topbar) {
      clearInterval(checkTopbar);
      console.log('[TopBar] Inicializando navegação...');
      window.__initTopbarDropdowns(document);
      window.__initTopbarAnchors(document);
      window.__initLogoNavigation(document);
      console.log('[TopBar] Navegação inicializada com sucesso');
    }
  }, 100);

  // Timeout de segurança: após 5 segundos, para de tentar
  setTimeout(() => clearInterval(checkTopbar), 5000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTopbar);
} else {
  initializeTopbar();
}

