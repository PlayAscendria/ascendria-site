// Loading page standalone - apenas para /pages/loading/
// Este arquivo é usado quando a página de loading é acessada diretamente

const loadingContainer = document.querySelector('.loading-container');

if (loadingContainer) {
  // Na página standalone, sempre mostra o loading
  loadingContainer.classList.add('active');
  
  // Simula o carregamento
  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingContainer.classList.add("completed");
    }, 3000); // 3 segundos de demonstração
  });
}
