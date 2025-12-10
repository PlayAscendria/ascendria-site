

(function initLoadingManager() {
  'use strict';
  

  const alreadyLoaded = sessionStorage.getItem('alreadyLoaded');
  
  if (alreadyLoaded) {


    const removeLoading = () => {
      const ls = document.getElementById('loading-screen');
      if (ls) {
        ls.remove();
      }
    };
    
    if (document.readyState !== 'loading') {
      removeLoading();
    } else {
      document.addEventListener('DOMContentLoaded', removeLoading, { once: true });
    }
    return;
  }
  


  const initPreloader = async () => {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (!loadingScreen) {
      return;
    }
    

    loadingScreen.classList.add('active');
    
    try {

      if (typeof startAssetPreloader === 'function') {
        await startAssetPreloader();
      } else {

        await fallbackLoading(loadingScreen);
      }
    } catch (err) {

      finishLoading(loadingScreen);
    }
  };
  
  
  async function fallbackLoading(loadingScreen) {
    const progressText = document.getElementById('progressValue');
    const narrativeText = document.getElementById('paintingText');
    

    for (let i = 0; i <= 100; i += 10) {
      if (progressText) progressText.textContent = `${i}%`;
      if (narrativeText) {
        if (i < 30) narrativeText.textContent = 'Loading...';
        else if (i < 60) narrativeText.textContent = 'Almost there...';
        else if (i < 90) narrativeText.textContent = 'Final touches...';
        else narrativeText.textContent = '✓ Ready!';
      }
      await new Promise(r => setTimeout(r, 150));
    }
    
    finishLoading(loadingScreen);
  }
  
  
  function finishLoading(loadingScreen) {
    sessionStorage.setItem('alreadyLoaded', '1');
    
    setTimeout(() => {
      loadingScreen.classList.add('completed');
      
      setTimeout(() => {
        if (loadingScreen.parentNode) {
          loadingScreen.remove();
        }
      }, 300);
    }, 500);
  }
  

  if (document.readyState !== 'loading') {
    initPreloader();
  } else {
    document.addEventListener('DOMContentLoaded', initPreloader, { once: true });
  }
  


  setTimeout(() => {
    const ls = document.getElementById('loading-screen');
    if (ls && ls.parentNode) {
      sessionStorage.setItem('alreadyLoaded', '1');
      ls.remove();
    }
  }, 20000);
  
})();

