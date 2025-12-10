(function(){




  
  function init(root){
    if(!root) return;
    

    const placeholder = document.getElementById('backgroundlive-placeholder');
    const mode = placeholder?.dataset.mode || detectModeFromURL();
    

    root.dataset.mode = mode;
    

    const charactersContainer = root.querySelector('.bg-characters');
    if (charactersContainer) {
      charactersContainer.style.display = mode === 'simple' ? 'none' : '';
    }
    
    const layers = root.querySelectorAll('.bg-layer');
    if(!layers.length) return;

    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e)=>{ mouseX = e.clientX; mouseY = e.clientY; });

    let ticking = false;

    function createSunRays(){
      const sun = root.querySelector('.bg-layer.sun');
      if(!sun) return;

      const existing = root.querySelector('.sun-rays');
      if(existing) existing.remove();

      const container = document.createElement('div');
      container.className = 'sun-rays';
      root.appendChild(container);

      const mobileFactor = getMobileFactor();

      const baseCount = 28;
      const rayCount = Math.max(10, Math.round(baseCount * (mobileFactor)));
      const minLen = 300 * mobileFactor;
      const maxLen = 600 * mobileFactor;


      const containerSize = Math.round(maxLen * 1.25);
      container.style.width = containerSize + 'px';
      container.style.height = containerSize + 'px';



      const sector = 360 / rayCount;
      const jitterMax = sector * 0.45; 
      for(let i=0;i<rayCount;i++){

        const ray = document.createElement('div');
        ray.className = 'sun-ray';


        const baseAngle = i * sector;
        const angle = baseAngle + (Math.random()*jitterMax*2 - jitterMax);
        const len = Math.round(minLen + Math.random()*(maxLen-minLen));
        const thickness = Math.round(2 + Math.random()*12);
        const opacity = (0.12 + Math.random()*0.5).toFixed(2);


        ray.style.left = '50%';
        ray.style.top = '50%';

        ray.style.transform = `translate(-50%,-50%) rotate(${angle}deg)`;


        const tri = document.createElement('div');
        tri.className = 'ray-triangle';

        tri.style.width = Math.max(12, thickness * 6) + 'px';
        tri.style.height = len + 'px';
        tri.style.opacity = opacity;


        const baseLeft = 20 + Math.random()*25; 
        const baseRight = 60 + Math.random()*35; 
        const tipX = 30 + Math.random()*40; 
        tri.style.setProperty('--base-left-x', baseLeft.toFixed(1) + '%');
        tri.style.setProperty('--base-right-x', baseRight.toFixed(1) + '%');
        tri.style.setProperty('--tip-x', tipX.toFixed(1) + '%');


        const dur = (1.6 + Math.random()*3.0).toFixed(2);
        const delay = (Math.random()*2).toFixed(2);
        tri.style.setProperty('--ray-duration', dur + 's');
        tri.style.setProperty('--ray-delay', delay + 's');
        tri.style.setProperty('--ray-thickness', thickness + 'px');
        const tipSize = Math.round(thickness*1.6 + Math.random()*8);
        tri.style.setProperty('--ray-tip-size', tipSize + 'px');


        tri.style.filter = `blur(${0.6 + Math.random()*1.6}px) saturate(${1 + Math.random()*0.15})`;

        ray.appendChild(tri);
        container.appendChild(ray);
      }
    }
    function getMobileFactor(){

      if (window.innerWidth <= 430) return 0;
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

    createSunRays();
    let resizeTimer = null;
    window.addEventListener('resize', ()=>{ if(resizeTimer) clearTimeout(resizeTimer); resizeTimer = setTimeout(()=>{ createSunRays(); requestUpdate(); }, 120); });
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    window.addEventListener('mousemove', requestUpdate);


    requestUpdate();
  }


  const root = document.querySelector('.backgroundlive-root');
  if(root){ init(root); }
  else {

    const obs = new MutationObserver((mutations, observer) => {
      const r = document.querySelector('.backgroundlive-root');
      if(r){ init(r); observer.disconnect(); }
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }
  
  
  function detectModeFromURL() {
    const path = window.location.pathname;

    if (path.includes('/pages/lore') || 
        path.includes('/pages/whitepaper') || 
        path.includes('/pages/financialmodel')) {
      return 'simple';
    }

    return 'full';
  }
  

  window.BackgroundLive = {
    setMode: function(mode) {
      const root = document.querySelector('.backgroundlive-root');
      if (!root) return;
      
      root.dataset.mode = mode;
      const charactersContainer = root.querySelector('.bg-characters');
      if (charactersContainer) {
        charactersContainer.style.display = mode === 'simple' ? 'none' : '';
      }
    }
  };

})();

