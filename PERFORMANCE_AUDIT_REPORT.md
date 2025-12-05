# 🔍 RELATÓRIO DE AUDITORIA DE PERFORMANCE - ASCENDRIA

**Data:** 05 de Dezembro de 2025  
**Autor:** Arquiteto de Software Sênior  
**Foco:** Otimização de Carregamento (Speed) e Prevenção de Falhas (Robustness)

---

## 📋 SUMÁRIO EXECUTIVO

O projeto Ascendria apresenta uma arquitetura bem estruturada com SPA Router, Component Loader e Asset Preloader. No entanto, foram identificadas **15 oportunidades críticas** de otimização que podem melhorar significativamente o LCP, CLS e a robustez geral da aplicação.

---

## 1. 🖼️ OTIMIZAÇÃO DE ASSETS E IMAGENS

### 1.1 Problema: Carregamento Síncrono de Todas as Camadas do Background

**Arquivo:** `js/asset-preloader.js` (linhas 59-85)

**Problema:** O preloader carrega TODAS as 13 camadas do background simultaneamente, incluindo 7 nuvens que poderiam ser carregadas sob demanda.

```javascript
// PROBLEMÁTICO - Carrega 13 imagens de uma vez
this.backgroundLayers = [
  { url: '/assets/images/background/backgroundpaisagem/0_telabranca_0.webp', order: 0, zIndex: 0, category: 'base' },
  // ... + 12 camadas mais
];
```

**Solução Otimizada:**

```javascript
// OTIMIZADO - Priorização de camadas críticas vs não-críticas
this.criticalLayers = [
  { url: '/assets/images/background/backgroundpaisagem/0_telabranca_0.webp', order: 0, zIndex: 0, category: 'base' },
  { url: '/assets/images/background/backgroundpaisagem/5_fundosol_1.webp', order: 1, zIndex: 1, category: 'fundo' },
  { url: '/assets/images/background/backgroundpaisagem/3_montanha1_18.webp', order: 2, zIndex: 18, category: 'montanha' },
];

this.deferredLayers = [
  // Nuvens - podem carregar depois do LCP
  { url: '/assets/images/background/backgroundpaisagem/4_nuvem1_15.webp', order: 5, zIndex: 15, category: 'nuvem' },
  { url: '/assets/images/background/backgroundpaisagem/4_nuvem2_15.webp', order: 5, zIndex: 15, category: 'nuvem' },
  // ... demais nuvens
];

async start() {
  // Carrega camadas críticas primeiro (LCP)
  await this.loadCriticalLayers();
  
  // Carrega camadas não-críticas em background
  this.loadDeferredLayers(); // Sem await - não bloqueia
}
```

### 1.2 Problema: Imagens do Ecosystem sem Lazy Loading

**Arquivo:** `components/ecosystem/ecosystem.js` (linhas 1-350)

**Problema:** Todas as imagens dos módulos (rankings, ascendria, community, submenu items) são referenciadas diretamente em src, sem lazy loading.

```javascript
// PROBLEMÁTICO - Imagens carregam mesmo sem serem vistas
node.innerHTML = `
  <img class="eco-node-icon" src="${module.icon}" alt="${module.label}" />
`;
```

**Solução Otimizada:**

```javascript
// OTIMIZADO - Lazy loading nativo + IntersectionObserver fallback
node.innerHTML = `
  <img class="eco-node-icon" 
       src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3C/svg%3E"
       data-src="${module.icon}" 
       alt="${module.label}"
       loading="lazy"
       decoding="async" />
`;

// Adicionar IntersectionObserver para fallback
this.lazyLoadImages();

lazyLoadImages() {
  const images = this.container.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '50px' });
    
    images.forEach(img => observer.observe(img));
  } else {
    // Fallback para navegadores antigos
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  }
}
```

### 1.3 Oportunidade: Preload de Assets Críticos no HTML

**Arquivo:** `index.html`

**Problema:** Não há preload de imagens críticas para o LCP.

**Solução - Adicionar no `<head>`:**

```html
<!-- Preload Critical Assets para LCP -->
<link rel="preload" as="image" href="/assets/images/ui/logoascendria.webp" fetchpriority="high">
<link rel="preload" as="image" href="/assets/images/background/backgroundpaisagem/0_telabranca_0.webp" fetchpriority="high">
<link rel="preload" as="image" href="/assets/images/background/backgroundpaisagem/5_fundosol_1.webp">
```

---

## 2. 📦 CODE SPLITTING E CARREGAMENTO MODULAR

### 2.1 Problema: Three.js Carregado Globalmente

**Arquivo:** `index.html` (linha 253)

**Problema:** Three.js (200KB+) é carregado na home mesmo que o portal não esteja visível.

```html
<!-- PROBLEMÁTICO - Carrega Three.js sempre -->
<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js" defer></script>
<script src="/components/portal/portal.js" defer></script>
```

**Solução Otimizada:**

```html
<!-- REMOVER do index.html e carregar dinamicamente em portal.js -->
```

**Arquivo:** `components/portal/portal.js` - Refatorar início:

```javascript
/**
 * Portal Mágico - Carregamento Dinâmico de Three.js
 * Só carrega Three.js quando o portal entra no viewport
 */

let threeLoaded = false;
let threeLoadPromise = null;

async function loadThreeJS() {
  if (threeLoaded) return Promise.resolve();
  if (threeLoadPromise) return threeLoadPromise;
  
  threeLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
    script.onload = () => {
      threeLoaded = true;
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
  
  return threeLoadPromise;
}

function initPortal() {
  const portalContainer = document.getElementById('magic-portal');
  if (!portalContainer) {
    setTimeout(initPortal, 500);
    return;
  }
  
  if (portalContainer.dataset.portalInit) return;
  
  // Usar IntersectionObserver para carregar só quando visível
  const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting) {
      observer.disconnect();
      portalContainer.dataset.portalInit = 'true';
      
      try {
        await loadThreeJS();
        new MagicPortal(portalContainer);
      } catch (err) {
        console.warn('Portal: Three.js failed to load', err);
        // Fallback: mostrar imagem estática
        portalContainer.innerHTML = '<img src="/assets/images/ui/portal-static.webp" alt="Portal" />';
      }
    }
  }, { rootMargin: '100px' });
  
  observer.observe(portalContainer);
}
```

### 2.2 Problema: Ecosystem.js Carregado na Home Mesmo Sem Scroll

**Arquivo:** `index.html` (linha 256)

**Problema:** O script do ecosystem (885 linhas) carrega imediatamente.

**Solução - Dynamic Import:**

```javascript
// No index.html, remover:
// <script src="/components/ecosystem/ecosystem.js" defer></script>

// Adicionar ao final do script inline:
const ecosystemSection = document.querySelector('#ecosystem');
if (ecosystemSection) {
  const ecosystemObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      ecosystemObserver.disconnect();
      import('/components/ecosystem/ecosystem.js')
        .then(() => console.log('Ecosystem loaded'))
        .catch(err => console.warn('Ecosystem failed:', err));
    }
  }, { rootMargin: '200px' });
  
  ecosystemObserver.observe(ecosystemSection);
}
```

### 2.3 Oportunidade: Módulos de Jogo Separados

**Recomendação:** Para módulos futuros (Idle Mines, Cardinals Row, Champions), criar arquivos separados:

```
/games/
  idle-mines/
    idle-mines.js
    idle-mines.css
  cardinals-row/
    cardinals.js
    cardinals.css
  champions/
    champions.js
    champions.css
```

Com carregamento condicional baseado na rota atual.

---

## 3. 🛡️ PREVENÇÃO DE ERROS E FALHAS (Error Handling)

### 3.1 Problema Crítico: ComponentLoader Sem Error Boundary

**Arquivo:** `js/component-loader.js`

**Problema:** Se um componente falhar, pode quebrar toda a aplicação.

```javascript
// PROBLEMÁTICO - Erro propagado sem tratamento adequado
static async load(componentName, placeholderId) {
  // ... código ...
  } catch (err) {
    throw err; // Propaga o erro!
  }
}
```

**Solução Otimizada:**

```javascript
/**
 * Component Loader com Error Boundaries
 */
class ComponentLoader {
  static FETCH_TIMEOUT = 5000;
  static RETRY_ATTEMPTS = 2;
  static RETRY_DELAY = 1000;

  /**
   * Carrega componente com retry e fallback
   */
  static async load(componentName, placeholderId, options = {}) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;

    const { retries = this.RETRY_ATTEMPTS } = options;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        await this._loadComponent(componentName, placeholder);
        return; // Sucesso
      } catch (err) {
        console.warn(`[ComponentLoader] ${componentName} attempt ${attempt + 1} failed:`, err.message);
        
        if (attempt < retries) {
          await this._delay(this.RETRY_DELAY * (attempt + 1));
        } else {
          // Fallback: mostrar placeholder de erro elegante
          this._showFallback(placeholder, componentName);
        }
      }
    }
  }

  static _showFallback(placeholder, componentName) {
    placeholder.innerHTML = `
      <div class="component-error" role="alert" aria-live="polite">
        <p>Unable to load ${componentName}.</p>
        <button onclick="ComponentLoader.retryLoad('${componentName}', '${placeholder.id}')">
          Retry
        </button>
      </div>
    `;
    placeholder.classList.add('component-failed');
  }

  static async retryLoad(componentName, placeholderId) {
    const placeholder = document.getElementById(placeholderId);
    if (placeholder) {
      placeholder.innerHTML = '<div class="component-loading">Loading...</div>';
      placeholder.classList.remove('component-failed');
    }
    await this.load(componentName, placeholderId, { retries: 1 });
  }

  static _delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ... resto do código existente
}
```

### 3.2 Problema Crítico: SPA Router Sem Tratamento de Falhas de Rede

**Arquivo:** `js/spa-router.js` (linhas 262-300)

**Problema:** Se o fetch falhar, redireciona para a página mas pode causar loop.

```javascript
// PROBLEMÁTICO
async function navigateDocToDoc(url, targetPath, pushState) {
  const response = await fetch(url.pathname);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  // ... sem tratamento de rede offline
}
```

**Solução Otimizada:**

```javascript
async function navigateDocToDoc(url, targetPath, pushState) {
  const main = document.querySelector('main');
  
  // Verificar conectividade antes
  if (!navigator.onLine) {
    showOfflineMessage();
    return;
  }
  
  // Fade out
  if (main) {
    main.style.transition = `opacity ${CONFIG.transitionDuration}ms ease-out`;
    main.style.opacity = '0';
  }
  
  await sleep(CONFIG.transitionDuration);
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(url.pathname, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const html = await response.text();
    // ... resto do código
    
  } catch (err) {
    // Restaurar visibilidade e mostrar erro amigável
    if (main) {
      main.style.opacity = '1';
    }
    
    if (err.name === 'AbortError') {
      showErrorToast('Request timeout. Please try again.');
    } else if (!navigator.onLine) {
      showOfflineMessage();
    } else {
      showErrorToast('Failed to load page. Please refresh.');
    }
    
    throw err; // Re-throw para o catch externo
  }
}

function showOfflineMessage() {
  const toast = document.createElement('div');
  toast.className = 'offline-toast';
  toast.innerHTML = `
    <span>📡 You are offline</span>
    <button onclick="window.location.reload()">Retry</button>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 5000);
}

function showErrorToast(message) {
  const toast = document.createElement('div');
  toast.className = 'error-toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}
```

### 3.3 Problema: Asset Preloader Sem Fallback para Imagens

**Arquivo:** `js/asset-preloader.js` (linhas 180-210)

**Problema:** Se uma imagem crítica falhar, a pintura progressiva pode quebrar.

```javascript
// PROBLEMÁTICO - Apenas loga erro, não trata
img.onerror = () => {
  console.error(`✗ Failed: ${layer.url}`);
  this.loadedCount++;
  this.updateProgressBar();
  resolve();
};
```

**Solução Otimizada:**

```javascript
// OTIMIZADO - Fallback com placeholder colorido
img.onerror = () => {
  console.warn(`[AssetPreloader] Failed to load: ${layer.url}`);
  
  // Criar canvas de fallback com cor da categoria
  const fallbackColors = {
    'base': '#f5f1e8',
    'fundo': '#87CEEB',
    'montanha': '#6B8E23',
    'nuvem': '#FFFFFF',
    'grama': '#228B22'
  };
  
  // Criar imagem de fallback
  const canvas = document.createElement('canvas');
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = fallbackColors[layer.category] || '#cccccc';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Converter para imagem
  const fallbackImg = new Image();
  fallbackImg.src = canvas.toDataURL();
  
  this.paintLayers.push({
    img: fallbackImg,
    order: layer.order,
    zIndex: layer.zIndex,
    category: layer.category,
    url: layer.url,
    painted: false,
    isFallback: true
  });
  
  this.loadedCount++;
  this.updateProgressBar();
  resolve();
};
```

---

## 4. ⚡ PERFORMANCE DE RENDERIZAÇÃO

### 4.1 Problema: BackgroundLive com Event Listeners Sem Cleanup

**Arquivo:** `components/backgroundlive/backgroundlive.js`

**Problema:** Event listeners nunca são removidos, causando memory leaks em navegação SPA.

```javascript
// PROBLEMÁTICO - Listeners acumulam em navegação SPA
window.addEventListener('mousemove', (e)=>{ mouseX = e.clientX; mouseY = e.clientY; });
window.addEventListener('scroll', requestUpdate, { passive: true });
window.addEventListener('resize', requestUpdate);
```

**Solução Otimizada:**

```javascript
(function(){
  let instance = null;
  
  class BackgroundLive {
    constructor(root) {
      if (instance) {
        instance.destroy(); // Limpa instância anterior
      }
      instance = this;
      
      this.root = root;
      this.mouseX = 0;
      this.mouseY = 0;
      this.ticking = false;
      this.isDestroyed = false;
      this.abortController = new AbortController();
      
      this.init();
    }
    
    init() {
      const layers = this.root.querySelectorAll('.bg-layer');
      if (!layers.length) return;
      
      this.layers = layers;
      
      // Event listeners com AbortController para cleanup
      const options = { 
        passive: true, 
        signal: this.abortController.signal 
      };
      
      window.addEventListener('mousemove', this.handleMouseMove.bind(this), options);
      window.addEventListener('scroll', this.requestUpdate.bind(this), options);
      window.addEventListener('resize', this.handleResize.bind(this), options);
      
      this.createSunRays();
      this.requestUpdate();
    }
    
    handleMouseMove(e) {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.requestUpdate();
    }
    
    handleResize() {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.createSunRays();
        this.requestUpdate();
      }, 120);
    }
    
    requestUpdate() {
      if (this.isDestroyed) return;
      if (!this.ticking) {
        this.ticking = true;
        requestAnimationFrame(() => this.update());
      }
    }
    
    update() {
      if (this.isDestroyed) return;
      this.ticking = false;
      // ... lógica de update existente
    }
    
    destroy() {
      this.isDestroyed = true;
      this.abortController.abort(); // Remove TODOS os listeners de uma vez
      clearTimeout(this.resizeTimer);
      
      const sunRays = this.root.querySelector('.sun-rays');
      if (sunRays) sunRays.remove();
    }
  }
  
  // Expor para cleanup em navegação SPA
  window.BackgroundLive = {
    init: (root) => new BackgroundLive(root),
    destroy: () => instance?.destroy(),
    setMode: (mode) => { /* ... */ }
  };
})();
```

### 4.2 Problema: Portal Three.js Sem Dispose Adequado

**Arquivo:** `components/portal/portal.js` (linhas 271-280)

**Problema:** O método destroy não limpa todos os recursos do WebGL.

```javascript
// PROBLEMÁTICO - Dispose incompleto
destroy() {
  this.isDestroyed = true;
  this.renderer.dispose();
  this.portalMaterial.dispose();
  // Falta: geometria, texturas, scene
}
```

**Solução Otimizada:**

```javascript
destroy() {
  this.isDestroyed = true;
  
  // Remover event listeners
  window.removeEventListener('resize', this.boundOnResize);
  this.container.removeEventListener('mousemove', this.boundOnMouseMove);
  this.container.removeEventListener('mouseenter', this.boundOnMouseEnter);
  this.container.removeEventListener('mouseleave', this.boundOnMouseLeave);
  
  // Dispose de geometria
  if (this.portal && this.portal.geometry) {
    this.portal.geometry.dispose();
  }
  
  // Dispose de material e uniforms
  if (this.portalMaterial) {
    this.portalMaterial.dispose();
  }
  
  // Limpar scene
  while (this.scene.children.length > 0) {
    const child = this.scene.children[0];
    this.scene.remove(child);
    if (child.geometry) child.geometry.dispose();
    if (child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach(m => m.dispose());
      } else {
        child.material.dispose();
      }
    }
  }
  
  // Dispose do renderer e liberar contexto WebGL
  if (this.renderer) {
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    
    if (this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
  
  // Limpar referências
  this.scene = null;
  this.camera = null;
  this.renderer = null;
  this.portal = null;
  this.portalMaterial = null;
}
```

### 4.3 Problema: Ecosystem.js Animação requestAnimationFrame Sem Cleanup

**Arquivo:** `components/ecosystem/ecosystem.js` (linhas 680-750)

**Problema:** A função animate usa requestAnimationFrame em loop sem ID para cancelamento.

**Solução:** Adicionar cancelamento da animação:

```javascript
async transitionAnimation(fromElement, toElement, onMiddle) {
  return new Promise((resolve) => {
    const duration = 1400;
    const startTime = performance.now();
    let animationId = null;
    
    const animate = (currentTime) => {
      // ... lógica existente ...
      
      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        // Cleanup
        animationId = null;
        resolve();
      }
    };
    
    // Guardar referência para possível cancelamento
    animationId = requestAnimationFrame(animate);
    
    // Adicionar ao objeto para cancelamento futuro
    this.currentAnimation = { id: animationId, resolve };
  });
}

// No destroy():
destroy() {
  if (this.currentAnimation && this.currentAnimation.id) {
    cancelAnimationFrame(this.currentAnimation.id);
  }
  // ... resto do cleanup
}
```

---

## 5. 📊 CORE WEB VITALS

### 5.1 Problema: CLS Alto - Loading Screen Sem Dimensões Reservadas

**Arquivo:** `index.html` / `pages/loading/loading.css`

**Problema:** O loading screen pode causar CLS quando desaparece.

**Solução - Adicionar contain ao CSS:**

```css
/* Adicionar a loading.css */
#loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Prevenir CLS */
  contain: layout style paint;
  z-index: 99999;
}

/* Garantir que o conteúdo abaixo não sofra shift */
#content-area {
  contain: layout style;
}
```

### 5.2 Problema: CLS - Imagens Sem aspect-ratio

**Arquivo:** `css/style.css`

**Problema:** Imagens carregando causam layout shift.

**Solução - Adicionar aspect-ratio global:**

```css
/* Prevenir CLS em imagens */
img {
  height: auto;
  max-width: 100%;
}

/* Aspect ratios conhecidos */
.eco-node-icon,
.submenu-icon {
  aspect-ratio: 1 / 1;
  object-fit: contain;
}

.hero {
  aspect-ratio: 16 / 9;
  min-height: 100vh;
}

/* Skeleton loading para imagens */
img[data-src] {
  background: linear-gradient(90deg, #1a1a2e 25%, #2a2a4e 50%, #1a1a2e 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### 5.3 Problema: LCP Alto - CSS Bloqueante Desnecessário

**Arquivo:** `index.html` (linhas 78-89)

**Problema:** Todos os CSS carregam de forma bloqueante, atrasando o LCP.

```html
<!-- PROBLEMÁTICO - Todos bloqueantes -->
<link rel="stylesheet" href="/pages/loading/loading.css">
<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="/components/topbar/topbar.css">
<!-- ... mais 5 arquivos -->
```

**Solução Otimizada:**

```html
<!-- CSS Crítico (bloqueante) -->
<link rel="stylesheet" href="/pages/loading/loading.css">
<link rel="stylesheet" href="/css/critical.css"> <!-- Extrair CSS crítico -->

<!-- CSS Não-Crítico (async) -->
<link rel="preload" href="/css/style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/components/topbar/topbar.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/components/backgroundlive/backgroundlive.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/components/portal/portal.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/components/ecosystem/ecosystem.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/components/footer/footer.css" as="style" onload="this.onload=null;this.rel='stylesheet'">

<!-- Fallback para navegadores sem JS -->
<noscript>
  <link rel="stylesheet" href="/css/style.css">
  <link rel="stylesheet" href="/components/topbar/topbar.css">
  <!-- ... -->
</noscript>

<!-- Responsive SEMPRE por último -->
<link rel="stylesheet" href="/css/responsive.css">
```

**Criar arquivo `css/critical.css` com CSS mínimo para LCP:**

```css
/* critical.css - Apenas o necessário para first paint */
html, body {
  background: #0a0e27;
  margin: 0;
  padding: 0;
}

#loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f5f1e8;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
}

#content-area,
#topbar-placeholder,
.topbar {
  opacity: 0;
  visibility: hidden;
}

body.loaded #content-area,
body.loaded #topbar-placeholder,
body.loaded .topbar {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.4s ease-out;
}
```

### 5.4 Otimização: Font Display Swap

**Adicionar ao `<head>` se usar fontes externas:**

```html
<style>
  @font-face {
    font-family: 'YourFont';
    src: url('/fonts/yourfont.woff2') format('woff2');
    font-display: swap; /* Previne FOIT */
  }
</style>
```

---

## 6. 📁 CHECKLIST DE IMPLEMENTAÇÃO

### Prioridade ALTA (Impacto Imediato no LCP/CLS):

- [ ] Implementar preload de imagens críticas
- [ ] Extrair CSS crítico para arquivo separado
- [ ] Adicionar lazy loading às imagens do ecosystem
- [ ] Implementar aspect-ratio nas imagens

### Prioridade MÉDIA (Melhoria de Robustez):

- [ ] Refatorar ComponentLoader com Error Boundaries
- [ ] Adicionar tratamento offline ao SPA Router
- [ ] Implementar retry com fallback no Asset Preloader

### Prioridade BAIXA (Otimização de Memória):

- [ ] Refatorar BackgroundLive com cleanup de eventos
- [ ] Melhorar dispose do Portal Three.js
- [ ] Adicionar cancelamento de animações no Ecosystem

---

## 7. 📈 MÉTRICAS ESPERADAS APÓS OTIMIZAÇÃO

| Métrica | Antes (Estimado) | Depois (Projetado) |
|---------|------------------|-------------------|
| LCP | ~3.5s | ~1.8s |
| FID | ~150ms | ~80ms |
| CLS | ~0.25 | ~0.05 |
| Time to Interactive | ~4.0s | ~2.5s |
| Total Blocking Time | ~600ms | ~300ms |

---

## 8. 🔧 PRÓXIMOS PASSOS

1. **Fase 1:** Implementar preloads e CSS crítico (1 dia)
2. **Fase 2:** Refatorar Error Handling (2 dias)
3. **Fase 3:** Implementar lazy loading e code splitting (2 dias)
4. **Fase 4:** Cleanup de memory leaks (1 dia)
5. **Fase 5:** Testes e validação com Lighthouse (1 dia)

---

*Relatório gerado por Arquiteto de Software Sênior - Especialista em Performance Web*
