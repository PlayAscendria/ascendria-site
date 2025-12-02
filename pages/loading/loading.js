// Loading page standalone - apenas para /pages/loading/
// Este arquivo é usado quando a página de loading é acessada diretamente

const loadingContainer = document.querySelector('.loading-container');
const progressValue = document.getElementById('progressValue');

if (loadingContainer) {
  // Na página standalone, sempre mostra o loading
  loadingContainer.classList.add('active');
  
  // Simula o carregamento com progresso gradual
  window.addEventListener("load", () => {
    let progress = 0;
    const duration = 3000; // 3 segundos
    const interval = 50; // Atualiza a cada 50ms
    const increment = 100 / (duration / interval);
    
    const progressInterval = setInterval(() => {
      progress += increment;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
        
        // Completa após atingir 100%
        setTimeout(() => {
          loadingContainer.classList.add("completed");
        }, 300);
      }
      
      if (progressValue) {
        progressValue.textContent = `${Math.floor(progress)}%`;
      }
    }, interval);
  });
}
