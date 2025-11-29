(function(){
  // Simple performant parallax: scroll-based + subtle mousemove
  const hero = document.querySelector('.hero');
  if(!hero) return;

  const layers = hero.querySelectorAll('.parallax-layer');
  if(!layers.length) return;

  // track mouse position
  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e)=>{ mouseX = e.clientX; mouseY = e.clientY; });

  // utility to request rAF updates
  let ticking = false;
  function onFrame(){
    ticking = false;
    const rect = hero.getBoundingClientRect();
    // compute normalized offset of hero center relative to viewport center
    const heroCenterY = rect.top + rect.height/2;
    const viewportCenterY = window.innerHeight/2;
    const offsetY = (viewportCenterY - heroCenterY) / window.innerHeight; // -0.5..0.5 roughly

    const viewportCenterX = window.innerWidth/2;
    const offsetX = (mouseX - viewportCenterX) / window.innerWidth; // -0.5..0.5

    layers.forEach(layer => {
      const speed = parseFloat(layer.dataset.speed) || 0.2;
      const move = parseFloat(layer.dataset.move) || 8;
      // vertical parallax from scroll/viewport
      const y = offsetY * (speed * 100);
      // horizontal/vertical subtle from mouse
      const mx = offsetX * (move);
      const my = (mouseY - (window.innerHeight/2)) / window.innerHeight * move;
      // apply transforms keeping center anchored
      layer.style.transform = `translate3d(calc(-50% + ${mx}px), calc(-50% + ${y}px + ${my}px), 0)`;
    });
  }

  function requestUpdate(){ if(!ticking){ ticking = true; requestAnimationFrame(onFrame); } }

  // update on scroll and resize
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  window.addEventListener('mousemove', requestUpdate);

  // initial run
  requestUpdate();
})();
