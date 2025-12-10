
(function(){

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

    globalCloseAll = closeAll;

    dropdownToggles.forEach(a => {

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


    document.addEventListener('click', function(e){
      if(!e.target.closest('.main-nav')) closeAll();
    });
  }

  
  function initTopbarAnchors(root){
    const scope = root || document;
    const hashAnchors = scope.querySelectorAll('.topbar a[href*="#"], .main-nav a[href*="#"], .mobile-nav a[href*="#"]');

    hashAnchors.forEach(a => {

      if (a.dataset.topbarAnchorInit === '1') return;
      a.dataset.topbarAnchorInit = '1';

      a.addEventListener('click', function(e){
        try {
          const href = a.getAttribute('href');

          if (!href) return;

          const url = new URL(href, window.location.origin);
          const targetPath = url.pathname.replace(/index\.html$/, '');
          const currentPath = window.location.pathname.replace(/index\.html$/, '');
          const isHomePath = (p) => ['', '/', '/index', '/index.html', '/index/'].includes(p);
          const isHomeTarget = isHomePath(targetPath);
          const isHomeCurrent = isHomePath(currentPath);

          if (isHomeTarget && isHomeCurrent && url.hash) {

            e.preventDefault();
            e.stopPropagation();
            const targetId = url.hash.replace('#', '');
            const el = document.getElementById(targetId);

            if (el) {

              const contentArea = document.getElementById('content-area');
              const scrollContainer = contentArea || window;
              const topbarHeight = document.querySelector('.topbar')?.offsetHeight || 70;

              if (contentArea) {

                const containerRect = contentArea.getBoundingClientRect();
                const elRect = el.getBoundingClientRect();
                const scrollTop = contentArea.scrollTop;
                const offsetPos = elRect.top - containerRect.top + scrollTop - topbarHeight - 20;

                contentArea.scrollTo({ top: offsetPos, behavior: 'smooth' });
              } else {

                const elPosition = el.getBoundingClientRect().top + window.scrollY;
                const offsetPos = elPosition - topbarHeight - 20;

                window.scrollTo({ top: offsetPos, behavior: 'smooth' });
              }

              history.pushState(null, '', url.hash);

              if (globalCloseAll) globalCloseAll();
            }
          }
        } catch (err) {

        }
      });
    });
  }

  
  function initLogoNavigation(root){
    const scope = root || document;
    const logoLink = scope.querySelector('.logo-link');

    if (!logoLink) return;


    if (logoLink.dataset.logoNavInit === '1') return;
    logoLink.dataset.logoNavInit = '1';

    logoLink.addEventListener('click', function(e){
      try {
        const href = this.getAttribute('href');

        if (!href) return;

        const url = new URL(href, window.location.origin);
        const targetPath = url.pathname.replace(/index\.html$/, '');
        const currentPath = window.location.pathname.replace(/index\.html$/, '');
        const isHomePath = (p) => ['', '/', '/index', '/index.html', '/index/'].includes(p);
        const isHomeTarget = isHomePath(targetPath);
        const isHomeCurrent = isHomePath(currentPath);


        if (isHomeTarget && isHomeCurrent) {

          e.preventDefault();
          e.stopPropagation();

          const heroInner = document.querySelector('.hero-inner');

          if (heroInner) {

            const contentArea = document.getElementById('content-area');
            const topbarHeight = document.querySelector('.topbar')?.offsetHeight || 70;

            if (contentArea) {


              contentArea.scrollTo({ top: 0, behavior: 'smooth' });
            } else {

              const elPosition = heroInner.getBoundingClientRect().top + window.scrollY;
              const offsetPos = elPosition - topbarHeight;

              window.scrollTo({ top: offsetPos, behavior: 'smooth' });
            }
            history.pushState(null, '', '/');
          }
        }
      } catch (err) {

      }
    });
  }


  window.__initTopbarDropdowns = initTopbarDropdowns;
  window.__initTopbarAnchors = initTopbarAnchors;
  window.__initLogoNavigation = initLogoNavigation;
})();


(function(){
  function initHamburgerMenu(){
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

    if(!hamburgerBtn || !mobileMenu) return;


    hamburgerBtn.addEventListener('click', function() {
      const isActive = hamburgerBtn.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      hamburgerBtn.setAttribute('aria-expanded', isActive);
      mobileMenu.setAttribute('aria-hidden', !isActive);
    });


    const mobileMenuLinks = document.querySelectorAll('.mobile-nav-list a');
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburgerBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', false);
        mobileMenu.setAttribute('aria-hidden', true);
      });
    });


    mobileDropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        

        mobileDropdownToggles.forEach(otherToggle => {
          if (otherToggle !== toggle) {
            otherToggle.setAttribute('aria-expanded', false);
          }
        });


        toggle.setAttribute('aria-expanded', !isExpanded);
      });
    });


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


  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHamburgerMenu);
  } else {
    initHamburgerMenu();
  }


  window.__initHamburgerMenu = initHamburgerMenu;
})();


function initializeTopbar() {

  const checkTopbar = setInterval(() => {
    const topbar = document.getElementById('topbar');
    if (topbar) {
      clearInterval(checkTopbar);

      window.__initTopbarDropdowns(document);
      window.__initTopbarAnchors(document);
      window.__initLogoNavigation(document);

    }
  }, 100);


  setTimeout(() => clearInterval(checkTopbar), 5000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTopbar);
} else {
  initializeTopbar();
}

