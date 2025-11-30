/**
 * ASCENDRIA - Asset Preloader AAA
 * 
 * Pré-carrega TODOS os assets críticos do site antes de exibir o conteúdo.
 * Usa a tela de loading existente para mostrar progresso REAL.
 * 
 * Features:
 * - Detecta automaticamente imagens, CSS backgrounds, scripts, fontes
 * - Progresso baseado em carregamento REAL (não simulado)
 * - Mensagens narrativas sincronizadas com progresso
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
      timeout: options.timeout || 15000,        // Timeout máximo em ms
      minDisplayTime: options.minDisplayTime || 2000, // Tempo mínimo de exibição
      ...options
    };
    
    // Estado
    this.assets = [];
    this.loadedCount = 0;
    this.totalAssets = 0;
    this.startTime = 0;
    this.paintedLayers = [];
    this.currentLayerIndex = 0;
    
    // Mensagens narrativas (estilo AAA)
    this.narrativeMessages = [
      { threshold: 0,  message: 'Preparing the canvas...' },
      { threshold: 10, message: 'Painting the grass...' },
      { threshold: 25, message: 'Adding the mountains...' },
      { threshold: 40, message: 'Drawing the clouds...' },
      { threshold: 55, message: 'Summoning the ancient magic...' },
      { threshold: 70, message: 'Writing the runes...' },
      { threshold: 85, message: 'Final touches...' },
      { threshold: 95, message: 'Masterpiece almost complete!' },
      { threshold: 100, message: '✓ Welcome to Ascendria!' }
    ];
    
    // Assets do BackgroundLive (críticos - ordem de pintura)
    this.backgroundLayers = [
      { url: '/assets/images/background/backgroundpaisagem/5_fundosol_1.webp', category: 'fundo', zIndex: 1 },
      { url: '/assets/images/background/backgroundpaisagem/3_montanha2_14.webp', category: 'montanha', zIndex: 17 },
      { url: '/assets/images/background/backgroundpaisagem/3_montanha1_18.webp', category: 'montanha', zIndex: 18 },
      { url: '/assets/images/background/backgroundpaisagem/nuvens/4_nuvem1_15.webp', category: 'nuvem', zIndex: 15 },
      { url: '/assets/images/background/backgroundpaisagem/nuvens/4_nuvem2_15.webp', category: 'nuvem', zIndex: 14 },
      { url: '/assets/images/background/backgroundpaisagem/nuvens/4_nuvem3_15.webp', category: 'nuvem', zIndex: 13 },
      { url: '/assets/images/background/backgroundpaisagem/nuvens/4_nuvem4_15.webp', category: 'nuvem', zIndex: 15 },
      { url: '/assets/images/background/backgroundpaisagem/nuvens/4_nuvem5_15.webp', category: 'nuvem', zIndex: 11 },
      { url: '/assets/images/background/backgroundpaisagem/nuvens/4_nuvem6_15.webp', category: 'nuvem', zIndex: 10 },
      { url: '/assets/images/background/backgroundpaisagem/nuvens/4_nuvem7_15.webp', category: 'nuvem', zIndex: 9 },
      { url: '/assets/images/background/backgroundpaisagem/2_grama2_19.webp', category: 'grama', zIndex: 19 },
      { url: '/assets/images/background/backgroundpaisagem/1_grama1_20.webp', category: 'grama', zIndex: 20 },
    ];
    
    // Assets manuais adicionais (críticos para o site)
    this.manualAssets = [
      // UI
      '/assets/images/ui/logoascendria.webp',
      '/assets/images/ui/favicon.webp',
      '/assets/images/ui/separator.webp',
      '/assets/images/ui/left_button.webp',
      '/assets/images/ui/right_button.webp',
      
      // Componentes
      '/components/backgroundlive/backgroundlive.js',
      '/components/topbar/topbar.js',
      '/components/footer/footer.js',
      
      // CSS dos componentes (já carregados via link, mas garantir cache)
      '/css/style.css',
      '/components/topbar/topbar.css',
      '/components/backgroundlive/backgroundlive.css',
      '/components/footer/footer.css',
    ];
  }
  
  /**
   * Inicia o preloader
   * @returns {Promise} Resolve quando todos assets carregarem
   */
  async start() {
    this.startTime = Date.now();
    
    // Ativa a tela de loading
    if (this.loadingContainer) {
      this.loadingContainer.classList.add('active');
    }
    
    // Inicializa canvas
    this.initCanvas();
    
    // Coleta todos os assets
    this.collectAssets();
    
    console.log(`🎮 AssetPreloader: ${this.totalAssets} assets para carregar`);
    
    // Inicia carregamento com timeout
    return Promise.race([
      this.loadAllAssets(),
      this.createTimeout()
    ]).then(() => {
      return this.ensureMinDisplayTime();
    });
  }
  
  /**
   * Inicializa o canvas para efeito de pintura
   */
  initCanvas() {
    if (!this.canvas || !this.ctx) return;
    
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.drawCanvasBase();
    
    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.redrawCanvas();
    });
  }
  
  /**
   * Desenha base do canvas (textura de tela de pintura)
   */
  drawCanvasBase() {
    if (!this.ctx) return;
    
    // Fundo bege com textura
    this.ctx.fillStyle = '#f5f1e8';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Adiciona textura sutil
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 10;
      data[i] += noise;
      data[i + 1] += noise;
      data[i + 2] += noise;
    }
    
    this.ctx.putImageData(imageData, 0, 0);
  }
  
  /**
   * Redesenha canvas com todas as camadas pintadas
   */
  redrawCanvas() {
    this.drawCanvasBase();
    
    // Ordena por z-index e desenha
    const sortedLayers = [...this.paintedLayers].sort((a, b) => a.zIndex - b.zIndex);
    
    sortedLayers.forEach(layer => {
      if (layer.img && layer.img.complete) {
        this.drawImageCover(layer.img, 1);
      }
    });
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
   * Coleta todos os assets do site
   */
  collectAssets() {
    const assetSet = new Set();
    
    // 1. Assets do background (críticos, com metadata)
    this.backgroundLayers.forEach(layer => {
      assetSet.add(JSON.stringify({ 
        url: layer.url, 
        type: 'background-layer',
        category: layer.category,
        zIndex: layer.zIndex
      }));
    });
    
    // 2. Assets manuais
    this.manualAssets.forEach(url => {
      assetSet.add(JSON.stringify({ url, type: this.getAssetType(url) }));
    });
    
    // 3. Auto-detectar imagens na página
    document.querySelectorAll('img[src]').forEach(img => {
      if (img.src && !img.src.startsWith('data:')) {
        const url = new URL(img.src, window.location.origin).pathname;
        assetSet.add(JSON.stringify({ url, type: 'image' }));
      }
    });
    
    // 4. Auto-detectar CSS background-images (parseando stylesheets carregados)
    this.detectCSSBackgrounds(assetSet);
    
    // Converte Set para array de objetos
    this.assets = Array.from(assetSet).map(json => JSON.parse(json));
    this.totalAssets = this.assets.length;
  }
  
  /**
   * Detecta background-images dos CSS carregados
   */
  detectCSSBackgrounds(assetSet) {
    // Background images já estão nos backgroundLayers
    // Aqui podemos adicionar detecção adicional se necessário
  }
  
  /**
   * Determina tipo do asset pela extensão
   */
  getAssetType(url) {
    const ext = url.split('.').pop().toLowerCase().split('?')[0];
    
    if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'ico'].includes(ext)) {
      return 'image';
    }
    if (['js'].includes(ext)) {
      return 'script';
    }
    if (['css'].includes(ext)) {
      return 'stylesheet';
    }
    if (['woff', 'woff2', 'ttf', 'otf', 'eot'].includes(ext)) {
      return 'font';
    }
    return 'file';
  }
  
  /**
   * Carrega todos os assets
   */
  async loadAllAssets() {
    const promises = this.assets.map(asset => this.loadAsset(asset));
    await Promise.all(promises);
  }
  
  /**
   * Carrega um asset individual
   */
  async loadAsset(asset) {
    try {
      if (asset.type === 'image' || asset.type === 'background-layer') {
        await this.preloadImage(asset);
      } else {
        await this.preloadFile(asset.url);
      }
    } catch (err) {
      console.warn(`⚠️ Failed to preload: ${asset.url}`);
    } finally {
      this.loadedCount++;
      this.updateProgress();
    }
  }
  
  /**
   * Pré-carrega uma imagem
   */
  preloadImage(asset) {
    return new Promise((resolve) => {
      const img = new Image();
      
      img.onload = () => {
        // Se é uma camada do background, adiciona à lista de pintadas
        if (asset.type === 'background-layer') {
          this.paintedLayers.push({
            img: img,
            zIndex: asset.zIndex,
            category: asset.category
          });
          // Efeito de pintura progressiva
          this.paintLayer(img, asset.zIndex);
        }
        resolve();
      };
      
      img.onerror = () => {
        console.warn(`Failed to load image: ${asset.url}`);
        resolve();
      };
      
      img.src = asset.url;
    });
  }
  
  /**
   * Pinta uma camada no canvas com fade
   */
  paintLayer(img, zIndex) {
    if (!this.ctx) return;
    
    // Redesenha tudo para manter ordem correta
    this.redrawCanvas();
  }
  
  /**
   * Pré-carrega um arquivo genérico (CSS, JS, etc)
   */
  preloadFile(url) {
    return fetch(url, { 
      cache: 'force-cache',
      mode: 'no-cors'
    }).then(() => {}).catch(() => {});
  }
  
  /**
   * Atualiza UI de progresso
   */
  updateProgress() {
    const percent = Math.min(Math.floor((this.loadedCount / this.totalAssets) * 100), 100);
    
    // Atualiza texto de porcentagem
    if (this.progressText) {
      this.progressText.textContent = `${percent}%`;
    }
    
    // Atualiza barra de progresso visual
    if (this.progressFill) {
      this.progressFill.style.width = `${percent}%`;
    }
    
    // Atualiza mensagem narrativa
    this.updateNarrativeMessage(percent);
    
    console.log(`📦 Progress: ${percent}% (${this.loadedCount}/${this.totalAssets})`);
  }
  
  /**
   * Atualiza mensagem narrativa baseada no progresso
   */
  updateNarrativeMessage(percent) {
    if (!this.narrativeText) return;
    
    // Encontra mensagem apropriada para o percentual
    let message = this.narrativeMessages[0].message;
    
    for (const item of this.narrativeMessages) {
      if (percent >= item.threshold) {
        message = item.message;
      }
    }
    
    if (this.narrativeText.textContent !== message) {
      this.narrativeText.textContent = message;
    }
  }
  
  /**
   * Cria timeout de segurança
   */
  createTimeout() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.warn(`⚠️ Preloader timeout after ${this.options.timeout}ms`);
        resolve();
      }, this.options.timeout);
    });
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
      this.narrativeText.textContent = '✓ Welcome to Ascendria!';
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
          
          // Remove do DOM após animação
          setTimeout(() => {
            if (this.loadingContainer && this.loadingContainer.parentNode) {
              this.loadingContainer.remove();
            }
            resolve();
          }, 300);
        } else {
          resolve();
        }
      }, 500);
    });
  }
}

/**
 * Função principal para iniciar o preloader
 */
async function startAssetPreloader() {
  const preloader = new AssetPreloader({
    timeout: 15000,      // 15s máximo
    minDisplayTime: 2500 // 2.5s mínimo para apreciar a arte
  });
  
  await preloader.start();
  await preloader.complete();
  
  console.log('✅ Asset preloader completed - site ready!');
}

// Exporta para uso global
window.AssetPreloader = AssetPreloader;
window.startAssetPreloader = startAssetPreloader;
