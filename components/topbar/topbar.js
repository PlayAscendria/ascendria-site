// Inicializa os dropdowns da topbar (chamado após a injeção do HTML)
(function(){
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

  // Expor no escopo global caso seja útil
  window.__initTopbarDropdowns = initTopbarDropdowns;
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
