(function(){
  // BackgroundLive parallax component: scroll + mousemove
  // Suporta dois modos:
  //   - "full": paisagem + personagens (Home, About)
  //   - "simple": apenas paisagem (páginas de documentos)
  
  function init(root){
    if(!root) return;
    
    // Detecta modo baseado no placeholder ou URL
    const placeholder = document.getElementById('backgroundlive-placeholder');
    const mode = placeholder?.dataset.mode || detectModeFromURL();
    
    // Aplica classe de modo no root
    root.dataset.mode = mode;
    
    // Esconde personagens se modo simple
    const charactersContainer = root.querySelector('.bg-characters');
    if (charactersContainer) {
      charactersContainer.style.display = mode === 'simple' ? 'none' : '';
    }
    
    console.log(`🎨 BackgroundLive iniciado (modo: ${mode})`);
    
    const layers = root.querySelectorAll('.bg-layer');
    if(!layers.length) return;

    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e)=>{ mouseX = e.clientX; mouseY = e.clientY; });

    let ticking = false;
    // create randomized sun rays
    function createSunRays(){
      const sun = root.querySelector('.bg-layer.sun');
      if(!sun) return;
      // remove existing container if any
      const existing = root.querySelector('.sun-rays');
      if(existing) existing.remove();

      const container = document.createElement('div');
      container.className = 'sun-rays';
      root.appendChild(container);

      const mobileFactor = getMobileFactor();
      // increase base count and scale down on small screens
      const baseCount = 28;
      const rayCount = Math.max(10, Math.round(baseCount * (mobileFactor)));
      const minLen = 300 * mobileFactor;
      const maxLen = 600 * mobileFactor;

      // size the container based on maxLen so child rays can be centered
      const containerSize = Math.round(maxLen * 1.25);
      container.style.width = containerSize + 'px';
      container.style.height = containerSize + 'px';

      // distribute angles evenly to ensure coverage in all directions,
      // then add a small random jitter so rays don't look too uniform
      const sector = 360 / rayCount;
      const jitterMax = sector * 0.45; // +/- jitter
      for(let i=0;i<rayCount;i++){
        // wrapper that will be rotated
        const ray = document.createElement('div');
        ray.className = 'sun-ray';

        // angle distribution with jitter
        const baseAngle = i * sector;
        const angle = baseAngle + (Math.random()*jitterMax*2 - jitterMax);
        const len = Math.round(minLen + Math.random()*(maxLen-minLen));
        const thickness = Math.round(2 + Math.random()*12);
        const opacity = (0.12 + Math.random()*0.5).toFixed(2);

        // set wrapper position
        ray.style.left = '50%';
        ray.style.top = '50%';
        // rotate wrapper so the inner triangle points in desired direction
        ray.style.transform = `translate(-50%,-50%) rotate(${angle}deg)`;

        // create the triangle element (scalene using clip-path)
        const tri = document.createElement('div');
        tri.className = 'ray-triangle';
        // triangle visual size
        tri.style.width = Math.max(12, thickness * 6) + 'px';
        tri.style.height = len + 'px';
        tri.style.opacity = opacity;

        // randomize scalene base/tip positions (percent values)
        const baseLeft = 20 + Math.random()*25; // 20-45%
        const baseRight = 60 + Math.random()*35; // 60-95%
        const tipX = 30 + Math.random()*40; // 30-70%
        tri.style.setProperty('--base-left-x', baseLeft.toFixed(1) + '%');
        tri.style.setProperty('--base-right-x', baseRight.toFixed(1) + '%');
        tri.style.setProperty('--tip-x', tipX.toFixed(1) + '%');

        // expose per-triangle timing and thickness/tip-size
        const dur = (1.6 + Math.random()*3.0).toFixed(2);
        const delay = (Math.random()*2).toFixed(2);
        tri.style.setProperty('--ray-duration', dur + 's');
        tri.style.setProperty('--ray-delay', delay + 's');
        tri.style.setProperty('--ray-thickness', thickness + 'px');
        const tipSize = Math.round(thickness*1.6 + Math.random()*8);
        tri.style.setProperty('--ray-tip-size', tipSize + 'px');

        // slight per-triangle blur variation
        tri.style.filter = `blur(${0.6 + Math.random()*1.6}px) saturate(${1 + Math.random()*0.15})`;

        ray.appendChild(tri);
        container.appendChild(ray);
      }
    }
    function getMobileFactor(){
      return window.innerWidth < 768 ? 0.6 : 1;
    }

    function update(){
      ticking = false;
      const rect = root.getBoundingClientRect();
      const heroCenterY = rect.top + rect.height/2;
      const viewportCenterY = window.innerHeight/2;
      const offsetY = (viewportCenterY - heroCenterY) / window.innerHeight;
      const viewportCenterX = window.innerWidth/2;
      const offsetX = (mouseX - viewportCenterX) / window.innerWidth;
      const factor = getMobileFactor();
      layers.forEach(layer => {
        // keep fundo-sol static (no parallax)
        if (layer.classList.contains('fundo-sol')) return;
        const speed = parseFloat(layer.dataset.speed) || 0.2;
        const move = parseFloat(layer.dataset.move) || 8;
        const effectiveSpeed = speed * factor;
        const effectiveMove = move * factor;
        const y = offsetY * (effectiveSpeed * 100);
        const mx = offsetX * effectiveMove;
        const my = (mouseY - (window.innerHeight/2)) / window.innerHeight * effectiveMove;
        layer.style.transform = `translate3d(calc(-50% + ${mx}px), calc(-50% + ${y}px + ${my}px), 0)`;
      });
    }

    function requestUpdate(){ if(!ticking){ ticking = true; requestAnimationFrame(update); } }
    // create sun rays initially and on resize (debounced)
    createSunRays();
    let resizeTimer = null;
    window.addEventListener('resize', ()=>{ if(resizeTimer) clearTimeout(resizeTimer); resizeTimer = setTimeout(()=>{ createSunRays(); requestUpdate(); }, 120); });
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    window.addEventListener('mousemove', requestUpdate);

    // initial
    requestUpdate();
  }

  // Try to initialize: if component already in DOM, init immediately
  const root = document.querySelector('.backgroundlive-root');
  if(root){ init(root); }
  else {
    // If not present yet, observe DOM and init when inserted
    const obs = new MutationObserver((mutations, observer) => {
      const r = document.querySelector('.backgroundlive-root');
      if(r){ init(r); observer.disconnect(); }
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }
  
  /**
   * Detecta modo baseado na URL
   */
  function detectModeFromURL() {
    const path = window.location.pathname;
    // Páginas de documentos = modo simple
    if (path.includes('/pages/lore') || 
        path.includes('/pages/whitepaper') || 
        path.includes('/pages/tokenomics')) {
      return 'simple';
    }
    // Home, About, etc = modo full
    return 'full';
  }
  
  // Expõe função para trocar modo dinamicamente (usado pelo SPA Router)
  window.BackgroundLive = {
    setMode: function(mode) {
      const root = document.querySelector('.backgroundlive-root');
      if (!root) return;
      
      root.dataset.mode = mode;
      const charactersContainer = root.querySelector('.bg-characters');
      if (charactersContainer) {
        charactersContainer.style.display = mode === 'simple' ? 'none' : '';
      }
      console.log(`🎨 BackgroundLive modo alterado: ${mode}`);
    }
  };

})();
