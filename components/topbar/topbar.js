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
