// Loading screen for home - gerencia exibição da tela de loading
class HomeLoadingManager {
  constructor() {
    this.loadingScreen = document.getElementById('loading-screen');
    this.canvas = document.getElementById('paintCanvas');
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    this.paintingText = document.getElementById('paintingText');
    this.progressValue = document.getElementById('progressValue');
    
    this.layers = [];
    this.currentProgress = 0;
    this.paintingComplete = false;
    
    this.messages = [
      'Preparing the canvas...',
      'Painting the background...',
      'Adding mountains...',
      'Drawing clouds...',
      'Final details...',
      'Masterpiece completed!'
    ];
    this.currentMessage = 0;
    
    // Verifica se é o primeiro acesso da sessão
    this.checkFirstVisit();
  }

  checkFirstVisit() {
    const hasVisited = sessionStorage.getItem('hasVisitedHome');
    
    if (hasVisited) {
      // Not first visit - skip loading
      this.skipLoading();
    } else {
      // First visit of session - show loading
      sessionStorage.setItem('hasVisitedHome', 'true');
      this.init();
    }
  }

  skipLoading() {
    // Remove or hide loading screen immediately
    if (this.loadingScreen) {
      this.loadingScreen.style.display = 'none';
      // Force remove from DOM
      setTimeout(() => {
        if (this.loadingScreen && this.loadingScreen.parentNode) {
          this.loadingScreen.remove();
        }
      }, 100);
    }
    console.log('⏭️ Loading skipped - not first visit of session');
  }

  init() {
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    this.loadImages();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.drawCanvasTexture();
  }

  drawCanvasTexture() {
    // Fundo branco com leve textura
    this.ctx.fillStyle = '#f5f1e8';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Adiciona textura de tela de pintura
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 15;
      data[i] += noise;     // R
      data[i + 1] += noise; // G
      data[i + 2] += noise; // B
    }
    
    this.ctx.putImageData(imageData, 0, 0);
  }

  loadImages() {
    const basePath = '/assets/images/background/backgroundpaisagem/';
    
    // Lista EDITÁVEL - defina aqui a ordem de pintura e o z-index de cada arquivo
    // OTIMIZADO: Usando WebP para melhor performance
    const imageFiles = [
      { file: '0_telabranca_0.webp', order: 0, zIndex: 0, category: 'base' },
      { file: '1_grama1_20.webp', order: 1, zIndex: 20, category: 'grama' },
      { file: '2_grama2_19.webp', order: 2, zIndex: 19, category: 'grama' },
      { file: '3_montanha1_18.webp', order: 3, zIndex: 18, category: 'montanha' },
      { file: '3_montanha2_14.webp', order: 3, zIndex: 17, category: 'montanha' },
      { file: '4_nuvem1_15.webp', order: 4, zIndex: 15, category: 'nuvem' },
      { file: '4_nuvem2_15.webp', order: 4, zIndex: 15, category: 'nuvem' },
      { file: '4_nuvem4_15.webp', order: 4, zIndex: 15, category: 'nuvem' },
      { file: '4_nuvem5_15.webp', order: 4, zIndex: 15, category: 'nuvem' },
      { file: '4_nuvem6_15.webp', order: 4, zIndex: 15, category: 'nuvem' },
      { file: '4_nuvem7_15.webp', order: 4, zIndex: 15, category: 'nuvem' },
      { file: '4_nuvem8_15.webp', order: 4, zIndex: 15, category: 'nuvem' },
      { file: '5_fundosol_1.webp', order: 5, zIndex: 1, category: 'fundo' },
    ];

    let loaded = 0;

    imageFiles.forEach((item) => {
      const img = new Image();
      
      img.onload = () => {
        this.layers.push({
          img: img,
          layer: item.order,
          zIndex: item.zIndex,
          category: item.category,
          painted: false,
          filename: item.file
        });
        loaded++;
        
        console.log(`✓ Carregado: ${item.file} (ordem: ${item.order}, z-index: ${item.zIndex}, categoria: ${item.category})`);
        
        if (loaded === imageFiles.length) {
          console.log('Iniciando pintura...');
          this.startPainting();
        }
      };
      
      img.onerror = () => {
        console.error(`✗ Erro ao carregar: ${item.file}`);
        loaded++;
        if (loaded === imageFiles.length) {
          this.startPainting();
        }
      };
      
      img.src = basePath + item.file;
    });

    // Fallback
    setTimeout(() => {
      if (!this.paintingComplete && loaded < imageFiles.length) {
        console.warn('Fallback acionado: carregando com imagens disponíveis');
        this.startPainting();
      }
    }, 3000);
  }

  startPainting() {
    this.layers.sort((a, b) => a.layer - b.layer);

    let layerIndex = 0;
    const paintNextLayer = () => {
      if (layerIndex >= this.layers.length) {
        this.onPaintingComplete();
        return;
      }

      this.paintLayer(this.layers[layerIndex], () => {
        this.currentProgress = Math.round(((layerIndex + 1) / this.layers.length) * 100);
        this.updateProgress();
        
        if (layerIndex < this.layers.length - 1) {
          this.currentMessage = Math.floor((layerIndex / this.layers.length) * this.messages.length);
          this.updateMessage();
        }

        layerIndex++;
        paintNextLayer();
      });
    };

    paintNextLayer();
  }

  paintLayer(layerData, callback) {
    const img = layerData.img;
    
    // Configuração de duração por categoria
    const categoryDuration = {
      'base': 500,
      'grama': 400,
      'montanha': 300,
      'nuvem': 100,      // Nuvens mais rápidas!
      'fundo': 300
    };
    
    const duration = categoryDuration[layerData.category] || 600; // padrão 600ms
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      this.drawCanvasTexture();

      // Ordena TODAS as camadas pintadas + a camada atual por z-index
      const allLayers = this.layers.filter(layer => layer.painted || layer === layerData);
      allLayers.sort((a, b) => a.zIndex - b.zIndex);

      // Desenha todas as camadas respeitando z-index
      allLayers.forEach((layer) => {
        if (layer === layerData) {
          // Camada atual: com fade progressivo
          this.ctx.globalAlpha = progress;
        } else {
          // Camadas já pintadas: opacas
          this.ctx.globalAlpha = 1;
        }
        
        // Calcula dimensões para manter proporção (cover)
        const imgAspect = layer.img.width / layer.img.height;
        const canvasAspect = this.canvas.width / this.canvas.height;
        
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (canvasAspect > imgAspect) {
          // Canvas é mais largo que a imagem
          drawWidth = this.canvas.width;
          drawHeight = this.canvas.width / imgAspect;
          offsetX = 0;
          offsetY = (this.canvas.height - drawHeight) / 2;
        } else {
          // Canvas é mais alto que a imagem
          drawHeight = this.canvas.height;
          drawWidth = this.canvas.height * imgAspect;
          offsetX = (this.canvas.width - drawWidth) / 2;
          offsetY = 0;
        }
        
        this.ctx.drawImage(layer.img, offsetX, offsetY, drawWidth, drawHeight);
      });

      this.ctx.globalAlpha = 1;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        layerData.painted = true;
        callback();
      }
    };

    animate();
  }

  updateProgress() {
    this.progressValue.textContent = this.currentProgress + '%';
  }

  updateMessage() {
    if (this.currentMessage < this.messages.length) {
      this.paintingText.textContent = this.messages[this.currentMessage];
    }
  }

  onPaintingComplete() {
    this.paintingComplete = true;
    this.currentProgress = 100;
    this.updateProgress();
    this.paintingText.textContent = '✓ Work Completed!';

    setTimeout(() => {
      this.dissolve();
    }, 1000);
  }

  dissolve() {
    this.loadingScreen.classList.add('completed');

    setTimeout(() => {
      this.loadingScreen.style.display = 'none';
      this.loadingScreen.remove();
    }, 300);
  }
}

// Fallback de segurança: garante que loading nunca bloqueie o site
function ensureLoadingRemoval() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen && loadingScreen.style.display !== 'none') {
    setTimeout(() => {
      if (loadingScreen && loadingScreen.style.display !== 'none') {
        console.warn('⚠️ Loading timeout - forcing removal');
        loadingScreen.style.display = 'none';
        loadingScreen.remove();
      }
    }, 10000); // 10 segundos máximo
  }
}

// Inicia quando DOM está pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    try {
      new HomeLoadingManager();
      ensureLoadingRemoval();
    } catch (err) {
      console.error('Loading manager error:', err);
      // Em caso de erro, remove loading imediatamente
      const ls = document.getElementById('loading-screen');
      if (ls) {
        ls.style.display = 'none';
        ls.remove();
      }
    }
  });
} else {
  try {
    new HomeLoadingManager();
    ensureLoadingRemoval();
  } catch (err) {
    console.error('Loading manager error:', err);
    // Em caso de erro, remove loading imediatamente
    const ls = document.getElementById('loading-screen');
    if (ls) {
      ls.style.display = 'none';
      ls.remove();
    }
  }
}
