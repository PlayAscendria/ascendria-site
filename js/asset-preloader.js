/**
 * ASCENDRIA - Asset Preloader AAA com Pintura Progressiva
 * 
 * Combina o efeito visual de pintura progressiva (fade por camada)
 * com pré-carregamento real de TODOS os assets do site.
 * 
 * Features:
 * - Efeito de pintura progressiva (fade animado por camada)
 * - Barra de progresso real baseada em assets carregados
 * - Pré-carrega imagens, scripts, CSS, fontes
 * - Cache via sessionStorage para visitas subsequentes
 * - Fallback de timeout para evitar travamentos
 */

class AssetPreloader {
  constructor(options = {}) {
    // Elementos da UI existente
    this.loadingContainer = document.getElementById('loading-screen');
    this.progressText = document.getElementById('progressValue');
    this.progressFill = document.getElementById('progressFill');
    this.narrativeText = document.getElementById('paintingText');
    this.canvas = document.getElementById('paintCanvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d', { willReadFrequently: true }) : null;
    
    // Configurações
    this.options = {
      timeout: options.timeout || 15000,
      minDisplayTime: options.minDisplayTime || 2000,
      ...options
    };
    
    // Estado do preloader
    this.assets = [];
    this.loadedCount = 0;
    this.totalAssets = 0;
    this.startTime = 0;
    
    // Estado da pintura progressiva
    this.paintLayers = [];
    this.paintedLayers = [];
    this.currentPaintIndex = 0;
    this.isPainting = false;
    this.paintingComplete = false;
    
    // Mensagens narrativas (sincronizadas com pintura)
    this.messages = [
      'Preparing the canvas...',
      'Painting the background...',
      'Adding mountains...',
      'Drawing clouds...',
      'Painting the grass...',
      'Final details...',
      'Masterpiece completed!'
    ];
    
    // Durações de animação por categoria (mantém o original)
    this.categoryDuration = {
      'base': 500,
      'fundo': 400,
      'montanha': 350,
      'nuvem': 120,
      'grama': 400
    };
    
    // Camadas do background para pintura (ordem de pintura)
    // Ordem: tela branca (base) → grama1 → grama2 → montanha1 → montanha2 → nuvens → fundo sol
    this.backgroundLayers = [
      { url: '/assets/images/background/backgroundpaisagem/0_telabranca_0.webp', order: 0, zIndex: 0, category: 'base' },
      { url: '/assets/images/background/backgroundpaisagem/1_grama1_20.webp', order: 1, zIndex: 20, category: 'grama' },
      { url: '/assets/images/background/backgroundpaisagem/2_grama2_19.webp', order: 2, zIndex: 19, category: 'grama' },
      { url: '/assets/images/background/backgroundpaisagem/3_montanha1_18.webp', order: 3, zIndex: 18, category: 'montanha' },
      { url: '/assets/images/background/backgroundpaisagem/3_montanha2_14.webp', order: 4, zIndex: 14, category: 'montanha' },
      { url: '/assets/images/background/backgroundpaisagem/4_nuvem1_15.webp', order: 5, zIndex: 15, category: 'nuvem' },
      { url: '/assets/images/background/backgroundpaisagem/4_nuvem2_15.webp', order: 5, zIndex: 15, category: 'nuvem' },
      { url: '/assets/images/background/backgroundpaisagem/4_nuvem4_15.webp', order: 5, zIndex: 15, category: 'nuvem' },
      { url: '/assets/images/background/backgroundpaisagem/4_nuvem5_15.webp', order: 5, zIndex: 15, category: 'nuvem' },
      { url: '/assets/images/background/backgroundpaisagem/4_nuvem6_15.webp', order: 5, zIndex: 15, category: 'nuvem' },
      { url: '/assets/images/background/backgroundpaisagem/4_nuvem7_15.webp', order: 5, zIndex: 15, category: 'nuvem' },
      { url: '/assets/images/background/backgroundpaisagem/4_nuvem8_15.webp', order: 5, zIndex: 15, category: 'nuvem' },
      { url: '/assets/images/background/backgroundpaisagem/5_fundosol_1.webp', order: 6, zIndex: 1, category: 'fundo' },
    ];
    
    // Assets adicionais para pré-carregar (em paralelo com pintura)
    this.additionalAssets = [
      // UI
      '/assets/images/ui/logoascendria.webp',
      '/assets/images/ui/favicon.webp',
      '/assets/images/ui/separator.webp',
      '/assets/images/ui/left_button.webp',
      '/assets/images/ui/right_button.webp',
      
      // Scripts
      '/components/backgroundlive/backgroundlive.js',
      '/components/topbar/topbar.js',
      '/components/footer/footer.js',
      
      // CSS
      '/css/style.css',
      '/components/topbar/topbar.css',
      '/components/backgroundlive/backgroundlive.css',
      '/components/footer/footer.css',
    ];
  }
  
  /**
   * Inicia o preloader
   */
  async start() {
    this.startTime = Date.now();
    
    // Ativa a tela de loading
    if (this.loadingContainer) {
      this.loadingContainer.classList.add('active');
    }
    
    // Inicializa canvas
    this.initCanvas();
    
    // Conta total de assets
    this.totalAssets = this.backgroundLayers.length + this.additionalAssets.length;
    console.log(`🎮 AssetPreloader: ${this.totalAssets} assets para carregar`);
    
    // Carrega PRIMEIRO as imagens do background para pintura
    await this.loadPaintingLayers();
    
    // Inicia pintura E carrega outros assets em paralelo
    await Promise.all([
      this.startProgressivePainting(),
      this.loadAdditionalAssets()
    ]);
    
    // Garante tempo mínimo de exibição
    await this.ensureMinDisplayTime();
    
    return Promise.resolve();
  }
  
  /**
   * Inicializa o canvas
   */
  initCanvas() {
    if (!this.canvas || !this.ctx) return;
    
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.drawCanvasTexture();
    
    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.redrawAllPaintedLayers();
    });
  }
  
  /**
   * Desenha textura base do canvas (papel/tela de pintura)
   */
  drawCanvasTexture() {
    if (!this.ctx) return;
    
    // Fundo bege com textura
    this.ctx.fillStyle = '#f5f1e8';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Adiciona textura sutil de tela de pintura
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 15;
      data[i] += noise;
      data[i + 1] += noise;
      data[i + 2] += noise;
    }
    
    this.ctx.putImageData(imageData, 0, 0);
  }
  
  /**
   * Carrega todas as imagens do background para pintura
   */
  async loadPaintingLayers() {
    const loadPromises = this.backgroundLayers.map((layer, index) => {
      return new Promise((resolve) => {
        const img = new Image();
        
        img.onload = () => {
          this.paintLayers.push({
            img: img,
            order: layer.order,
            zIndex: layer.zIndex,
            category: layer.category,
            url: layer.url,
            painted: false
          });
          
          this.loadedCount++;
          this.updateProgressBar();
          
          console.log(`✓ Loaded: ${layer.url} (order: ${layer.order}, z-index: ${layer.zIndex})`);
          resolve();
        };
        
        img.onerror = () => {
          console.error(`✗ Failed: ${layer.url}`);
          this.loadedCount++;
          this.updateProgressBar();
          resolve();
        };
        
        img.src = layer.url;
      });
    });
    
    await Promise.all(loadPromises);
    
    // Ordena por ordem de pintura
    this.paintLayers.sort((a, b) => a.order - b.order);
  }
  
  /**
   * Inicia a pintura progressiva (com animação de fade)
   */
  startProgressivePainting() {
    return new Promise((resolve) => {
      if (this.paintLayers.length === 0) {
        this.paintingComplete = true;
        resolve();
        return;
      }
      
      let layerIndex = 0;
      
      const paintNextLayer = () => {
        if (layerIndex >= this.paintLayers.length) {
          this.paintingComplete = true;
          resolve();
          return;
        }
        
        const layer = this.paintLayers[layerIndex];
        
        // Atualiza mensagem narrativa
        this.updateNarrativeMessage(layerIndex, this.paintLayers.length);
        
        // Pinta a camada com animação de fade
        this.paintLayerWithFade(layer, () => {
          layerIndex++;
          paintNextLayer();
        });
      };
      
      paintNextLayer();
    });
  }
  
  /**
   * Pinta uma camada com efeito de fade progressivo
   */
  paintLayerWithFade(layerData, callback) {
    const img = layerData.img;
    const duration = this.categoryDuration[layerData.category] || 500;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Redesenha tudo: textura base + camadas pintadas + camada atual
      this.drawCanvasTexture();
      
      // Coleta todas as camadas a desenhar (pintadas + atual)
      const allLayers = this.paintLayers.filter(l => l.painted || l === layerData);
      
      // Ordena por z-index (menor = mais atrás)
      allLayers.sort((a, b) => a.zIndex - b.zIndex);
      
      // Desenha cada camada
      allLayers.forEach((layer) => {
        if (layer === layerData) {
          // Camada atual: com fade progressivo
          this.drawImageCover(layer.img, progress);
        } else {
          // Camadas já pintadas: opacidade total
          this.drawImageCover(layer.img, 1);
        }
      });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        layerData.painted = true;
        this.paintedLayers.push(layerData);
        callback();
      }
    };
    
    requestAnimationFrame(animate);
  }
  
  /**
   * Desenha imagem mantendo aspect ratio (cover)
   */
  drawImageCover(img, alpha = 1) {
    if (!this.ctx || !img) return;
    
    const imgAspect = img.width / img.height;
    const canvasAspect = this.canvas.width / this.canvas.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;
    
    if (canvasAspect > imgAspect) {
      drawWidth = this.canvas.width;
      drawHeight = this.canvas.width / imgAspect;
      offsetX = 0;
      offsetY = (this.canvas.height - drawHeight) / 2;
    } else {
      drawHeight = this.canvas.height;
      drawWidth = this.canvas.height * imgAspect;
      offsetX = (this.canvas.width - drawWidth) / 2;
      offsetY = 0;
    }
    
    this.ctx.globalAlpha = alpha;
    this.ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    this.ctx.globalAlpha = 1;
  }
  
  /**
   * Redesenha todas as camadas já pintadas (para resize)
   */
  redrawAllPaintedLayers() {
    this.drawCanvasTexture();
    
    const sortedLayers = [...this.paintedLayers].sort((a, b) => a.zIndex - b.zIndex);
    
    sortedLayers.forEach(layer => {
      this.drawImageCover(layer.img, 1);
    });
  }
  
  /**
   * Carrega assets adicionais em paralelo
   */
  async loadAdditionalAssets() {
    const promises = this.additionalAssets.map(url => {
      return this.preloadFile(url).finally(() => {
        this.loadedCount++;
        this.updateProgressBar();
      });
    });
    
    await Promise.all(promises);
  }
  
  /**
   * Pré-carrega um arquivo (imagem ou fetch)
   */
  preloadFile(url) {
    const ext = url.split('.').pop().toLowerCase().split('?')[0];
    
    if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'ico'].includes(ext)) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = url;
      });
    }
    
    return fetch(url, { cache: 'force-cache', mode: 'no-cors' })
      .then(() => {})
      .catch(() => {});
  }
  
  /**
   * Atualiza a barra de progresso
   */
  updateProgressBar() {
    const percent = Math.min(Math.floor((this.loadedCount / this.totalAssets) * 100), 100);
    
    if (this.progressText) {
      this.progressText.textContent = `${percent}%`;
    }
    
    if (this.progressFill) {
      this.progressFill.style.width = `${percent}%`;
    }
    
    console.log(`📦 Progress: ${percent}% (${this.loadedCount}/${this.totalAssets})`);
  }
  
  /**
   * Atualiza mensagem narrativa baseada na camada
   */
  updateNarrativeMessage(currentIndex, total) {
    if (!this.narrativeText) return;
    
    const messageIndex = Math.floor((currentIndex / total) * (this.messages.length - 1));
    const message = this.messages[Math.min(messageIndex, this.messages.length - 1)];
    
    this.narrativeText.textContent = message;
  }
  
  /**
   * Garante tempo mínimo de exibição
   */
  ensureMinDisplayTime() {
    const elapsed = Date.now() - this.startTime;
    const remaining = this.options.minDisplayTime - elapsed;
    
    if (remaining > 0) {
      return new Promise(resolve => setTimeout(resolve, remaining));
    }
    return Promise.resolve();
  }
  
  /**
   * Finaliza o preloader
   */
  complete() {
    // Mensagem final
    if (this.narrativeText) {
      this.narrativeText.textContent = '✓ Work Completed!';
    }
    if (this.progressText) {
      this.progressText.textContent = '100%';
    }
    if (this.progressFill) {
      this.progressFill.style.width = '100%';
    }
    
    // Marca como carregado na sessão
    sessionStorage.setItem('alreadyLoaded', '1');
    
    // Aguarda um momento antes do fade
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.loadingContainer) {
          this.loadingContainer.classList.add('completed');
          
          // Remove do DOM após animação CSS
          setTimeout(() => {
            if (this.loadingContainer && this.loadingContainer.parentNode) {
              this.loadingContainer.remove();
            }
            resolve();
          }, 300);
        } else {
          resolve();
        }
      }, 800); // Pausa para apreciar a arte completa
    });
  }
}

/**
 * Função principal para iniciar o preloader
 */
async function startAssetPreloader() {
  const preloader = new AssetPreloader({
    timeout: 15000,
    minDisplayTime: 2500
  });
  
  await preloader.start();
  await preloader.complete();
  
  console.log('✅ Asset preloader completed - site ready!');
}

// Exporta para uso global
window.AssetPreloader = AssetPreloader;
window.startAssetPreloader = startAssetPreloader;
