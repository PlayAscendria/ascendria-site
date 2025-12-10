

class AssetPreloader {
  constructor(options = {}) {

    this.loadingContainer = document.getElementById('loading-screen');
    this.progressText = document.getElementById('progressValue');
    this.progressFill = document.getElementById('progressFill');
    this.narrativeText = document.getElementById('paintingText');
    this.canvas = document.getElementById('paintCanvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d', { willReadFrequently: true }) : null;
    

    this.options = {
      timeout: options.timeout || 15000,
      minDisplayTime: options.minDisplayTime || 2000,
      ...options
    };
    

    this.assets = [];
    this.loadedCount = 0;
    this.totalAssets = 0;
    this.startTime = 0;
    

    this.paintLayers = [];
    this.paintedLayers = [];
    this.currentPaintIndex = 0;
    this.isPainting = false;
    this.paintingComplete = false;
    this.paintedLayersCount = 0; 
    

    this.messages = [
      'Preparing the canvas...',
      'Painting the background...',
      'Adding mountains...',
      'Drawing clouds...',
      'Painting the grass...',
      'Final details...',
      'Masterpiece completed!'
    ];
    

    this.categoryDuration = {
      'base': 500,
      'fundo': 400,
      'montanha': 350,
      'nuvem': 120,
      'grama': 400
    };
    


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
    

    this.additionalAssets = [

      '/assets/images/ui/logoascendria.webp',
      '/assets/images/ui/favicon.webp',


      '/components/backgroundlive/backgroundlive.js',
      '/components/topbar/topbar.js',
      '/components/footer/footer.js',


      '/css/style.css',
      '/components/topbar/topbar.css',
      '/components/backgroundlive/backgroundlive.css',
      '/components/footer/footer.css',
    ];
  }
  
  
  async start() {

    try { window.mark && window.mark('preloader-start'); } catch(e){}
    this.startTime = Date.now();
    

    if (this.loadingContainer) {
      this.loadingContainer.classList.add('active');
    }
    

    this.initCanvas();
    

    this.totalAssets = this.backgroundLayers.length + this.additionalAssets.length;
    

    await this.loadPaintingLayers();
    

    await Promise.all([
      this.startProgressivePainting(),
      this.loadAdditionalAssets()
    ]);
    

    await this.ensureMinDisplayTime();
    
    return Promise.resolve();
  }
  
  
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
  
  
  drawCanvasTexture() {
    if (!this.ctx) return;
    

    this.ctx.fillStyle = '#f5f1e8';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    

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
          resolve();
        };
        
        img.onerror = () => {

          this.loadedCount++;
          this.updateProgressBar();
          resolve();
        };
        
        img.src = layer.url;
      });
    });
    
    await Promise.all(loadPromises);
    

    this.paintLayers.sort((a, b) => a.order - b.order);
  }
  
  
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
        

        this.updateNarrativeMessage(layerIndex, this.paintLayers.length);
        

        this.paintLayerWithFade(layer, () => {
          layerIndex++;
          paintNextLayer();
        });
      };
      
      paintNextLayer();
    });
  }
  
  
  paintLayerWithFade(layerData, callback) {
    const img = layerData.img;
    const duration = this.categoryDuration[layerData.category] || 500;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      

      this.drawCanvasTexture();
      

      const allLayers = this.paintLayers.filter(l => l.painted || l === layerData);
      

      allLayers.sort((a, b) => a.zIndex - b.zIndex);
      

      allLayers.forEach((layer) => {
        if (layer === layerData) {

          this.drawImageCover(layer.img, progress);
        } else {

          this.drawImageCover(layer.img, 1);
        }
      });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        layerData.painted = true;
        this.paintedLayers.push(layerData);
        this.paintedLayersCount++;
        this.updateProgressBar(); 
        callback();
      }
    };
    
    requestAnimationFrame(animate);
  }
  
  
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
  
  
  redrawAllPaintedLayers() {
    this.drawCanvasTexture();
    
    const sortedLayers = [...this.paintedLayers].sort((a, b) => a.zIndex - b.zIndex);
    
    sortedLayers.forEach(layer => {
      this.drawImageCover(layer.img, 1);
    });
  }
  
  
  async loadAdditionalAssets() {
    const promises = this.additionalAssets.map(url => {
      return this.preloadFile(url).finally(() => {
        this.loadedCount++;
        this.updateProgressBar();
      });
    });
    
    await Promise.all(promises);
  }
  
  
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
  
  
  updateProgressBar() {

    const loadPercent = this.totalAssets > 0 
      ? (this.loadedCount / this.totalAssets) * 50 
      : 0;
    

    const paintPercent = this.paintLayers.length > 0 
      ? (this.paintedLayersCount / this.paintLayers.length) * 50 
      : 0;
    
    const percent = Math.min(Math.floor(loadPercent + paintPercent), 100);
    
    if (this.progressText) {
      this.progressText.textContent = `${percent}%`;
    }
    
    if (this.progressFill) {
      this.progressFill.style.width = `${percent}%`;
    }
  }
  
  
  updateNarrativeMessage(currentIndex, total) {
    if (!this.narrativeText) return;
    
    const messageIndex = Math.floor((currentIndex / total) * (this.messages.length - 1));
    const message = this.messages[Math.min(messageIndex, this.messages.length - 1)];
    
    this.narrativeText.textContent = message;
  }
  
  
  ensureMinDisplayTime() {
    const elapsed = Date.now() - this.startTime;
    const remaining = this.options.minDisplayTime - elapsed;
    
    if (remaining > 0) {
      return new Promise(resolve => setTimeout(resolve, remaining));
    }
    return Promise.resolve();
  }
  
  
  complete() {
    try { window.markEnd && window.markEnd('preloader-start'); } catch(e){}

    if (this.narrativeText) {
      this.narrativeText.textContent = '✓ Work Completed!';
    }
    if (this.progressText) {
      this.progressText.textContent = '100%';
    }
    if (this.progressFill) {
      this.progressFill.style.width = '100%';
    }
    

    sessionStorage.setItem('alreadyLoaded', '1');
    

    return new Promise(resolve => {
      setTimeout(() => {
        if (this.loadingContainer) {
          this.loadingContainer.classList.add('completed');
          

          setTimeout(() => {
            if (this.loadingContainer && this.loadingContainer.parentNode) {
              this.loadingContainer.remove();
            }
            resolve();
          }, 300);
        } else {
          resolve();
        }
      }, 800); 
    });
  }
}


async function startAssetPreloader() {
  const preloader = new AssetPreloader({
    timeout: 15000,
    minDisplayTime: 2500
  });
  
  await preloader.start();
  await preloader.complete();
}


window.AssetPreloader = AssetPreloader;
window.startAssetPreloader = startAssetPreloader;

