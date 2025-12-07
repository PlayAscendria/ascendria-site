/**
 * Portal Mágico - Efeito Three.js
 * Cria um efeito de vórtice/portal mágico interativo
 */

class MagicPortal {
  constructor(container) {
    this.container = container;
    this.width = container.offsetWidth || 200;
    this.height = container.offsetHeight || 300;
    this.mouse = { x: 0, y: 0 };
    this.targetMouse = { x: 0, y: 0 };
    this.time = 0;
    this.isHovered = false;
    this.isDestroyed = false;
    
    this.init();
    this.createPortal();
    this.addEventListeners();
    this.animate();
  }

  init() {
    // Scene
    this.scene = new THREE.Scene();
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
    this.camera.position.z = 2;
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);
  }

  createPortal() {
    // Shader para o efeito de vórtice
    const vertexShader = `
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uHover;
      uniform vec2 uResolution;
      
      varying vec2 vUv;
      varying vec3 vPosition;
      
      #define PI 3.14159265359
      
      // Simplex noise function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
      
      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }
      
      void main() {
        vec2 uv = vUv;
        vec2 center = vec2(0.5);
        
        // Distância do centro
        float dist = distance(uv, center);
        
        // Ângulo para o vórtice
        vec2 dir = uv - center;
        float angle = atan(dir.y, dir.x);
        
        // Efeito de vórtice com rotação baseada no tempo
        float swirl = sin(dist * 10.0 - uTime * 2.0) * 0.5;
        float rotation = angle + swirl + uTime * 0.5;
        
        // Coordenadas distorcidas pelo vórtice
        vec2 swirlUv = center + vec2(cos(rotation), sin(rotation)) * dist;
        
        // Noise para turbulência
        float noise1 = snoise(swirlUv * 3.0 + uTime * 0.3);
        float noise2 = snoise(swirlUv * 6.0 - uTime * 0.5);
        float noise3 = snoise(swirlUv * 12.0 + uTime * 0.7);
        
        // Combinação de ruídos
        float combinedNoise = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
        
        // Cores do portal (cyan/turquesa como na imagem)
        vec3 colorCore = vec3(0.0, 0.9, 1.0);      // Cyan brilhante
        vec3 colorMid = vec3(0.1, 0.6, 0.9);       // Azul médio
        vec3 colorEdge = vec3(0.0, 0.3, 0.5);      // Azul escuro
        vec3 colorGlow = vec3(0.2, 1.0, 0.9);      // Glow turquesa
        
        // Gradiente radial com noise
        float radialGradient = 1.0 - smoothstep(0.0, 0.5, dist);
        float noisyGradient = radialGradient + combinedNoise * 0.3;
        
        // Mistura de cores baseada na distância
        vec3 color = mix(colorEdge, colorMid, smoothstep(0.4, 0.2, dist));
        color = mix(color, colorCore, smoothstep(0.25, 0.0, dist));
        
        // Adiciona brilho pulsante
        float pulse = sin(uTime * 3.0) * 0.5 + 0.5;
        float glowIntensity = smoothstep(0.5, 0.0, dist) * (0.8 + pulse * 0.4);
        color += colorGlow * glowIntensity * 0.5;
        
        // Efeito de energia/raios internos
        float rays = abs(sin(rotation * 8.0 + uTime * 2.0));
        rays = pow(rays, 3.0) * smoothstep(0.4, 0.1, dist);
        color += colorGlow * rays * 0.3;
        
        // Partículas/pontos de luz
        float sparkle = snoise(swirlUv * 20.0 + uTime);
        sparkle = smoothstep(0.7, 1.0, sparkle) * smoothstep(0.5, 0.1, dist);
        color += vec3(1.0) * sparkle * 0.5;
        
        // Borda externa com glow
        float edgeGlow = smoothstep(0.5, 0.45, dist) * smoothstep(0.35, 0.45, dist);
        color += colorGlow * edgeGlow * (1.0 + pulse * 0.5);
        
        // Efeito de hover - intensifica as cores
        float hoverBoost = 1.0 + uHover * 0.5;
        color *= hoverBoost;
        
        // Interação com mouse
        vec2 mouseEffect = uMouse * 0.1;
        float mouseInfluence = 1.0 - smoothstep(0.0, 0.3, distance(uv + mouseEffect * 0.1, center));
        color += colorGlow * mouseInfluence * uHover * 0.3;
        
        // Alpha baseado na distância (circular)
        float alpha = smoothstep(0.5, 0.4, dist);
        alpha *= (0.7 + noisyGradient * 0.3);
        
        // Centro mais opaco
        alpha = max(alpha, smoothstep(0.3, 0.0, dist) * 0.9);
        
        gl_FragColor = vec4(color, alpha);
      }
    `;

    // Material do portal
    this.portalMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uHover: { value: 0 },
        uResolution: { value: new THREE.Vector2(this.width, this.height) }
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false
    });

    // Geometria elíptica (oval) para o portal - como o espelho
    const geometry = new THREE.CircleGeometry(1, 64);
    // Escalar para forma oval (mais alto que largo)
    geometry.scale(0.85, 1.1, 1);
    this.portal = new THREE.Mesh(geometry, this.portalMaterial);
    this.scene.add(this.portal);
  }

  addEventListeners() {
    // Mouse move
    this.container.addEventListener('mousemove', (e) => {
      const rect = this.container.getBoundingClientRect();
      this.targetMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.targetMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    });

    // Hover
    this.container.addEventListener('mouseenter', () => {
      this.isHovered = true;
    });

    this.container.addEventListener('mouseleave', () => {
      this.isHovered = false;
      this.targetMouse.x = 0;
      this.targetMouse.y = 0;
    });

    // Resize
    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    if (this.isDestroyed) return;
    
    const newWidth = this.container.offsetWidth;
    const newHeight = this.container.offsetHeight;
    
    // Só atualiza se tiver tamanho válido
    if (newWidth > 0 && newHeight > 0) {
      this.width = newWidth;
      this.height = newHeight;
      
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      
      this.renderer.setSize(this.width, this.height);
      this.portalMaterial.uniforms.uResolution.value.set(this.width, this.height);
    }
  }

  animate() {
    if (this.isDestroyed) return;
    
    requestAnimationFrame(() => this.animate());
    
    this.time += 0.016; // ~60fps
    
    // Smooth mouse movement
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.1;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.1;
    
    // Smooth hover transition
    const targetHover = this.isHovered ? 1.0 : 0.0;
    const currentHover = this.portalMaterial.uniforms.uHover.value;
    this.portalMaterial.uniforms.uHover.value += (targetHover - currentHover) * 0.1;
    
    // Update uniforms
    this.portalMaterial.uniforms.uTime.value = this.time;
    this.portalMaterial.uniforms.uMouse.value.set(this.mouse.x, this.mouse.y);
    
    // Slight rotation based on mouse
    this.portal.rotation.x = this.mouse.y * 0.1;
    this.portal.rotation.y = this.mouse.x * 0.1;
    
    // Scale pulse on hover
    const hoverScale = 1 + this.portalMaterial.uniforms.uHover.value * 0.05;
    this.portal.scale.set(hoverScale, hoverScale, 1);
    
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    this.isDestroyed = true;
    this.renderer.dispose();
    this.portalMaterial.dispose();
    if (this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}

// Carrega Three.js dinamicamente
let threeLoadPromise = null;
function loadThreeJS() {
  if (typeof THREE !== 'undefined') return Promise.resolve();
  if (threeLoadPromise) return threeLoadPromise;
  
  threeLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
  
  return threeLoadPromise;
}

// Inicialização - usa IntersectionObserver para carregar Three.js apenas quando necessário
function initPortal() {
  const portalContainer = document.getElementById('magic-portal');
  
  if (!portalContainer) {
    // Tenta novamente em 500ms se o container não existir ainda
    setTimeout(initPortal, 500);
    return;
  }
  
  // Verifica se já foi inicializado
  if (portalContainer.dataset.portalInit) return;
  
  // Usar IntersectionObserver para carregar Three.js só quando portal estiver próximo
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        portalContainer.dataset.portalInit = 'true';
        
        loadThreeJS().then(() => {
          new MagicPortal(portalContainer);
        }).catch(err => {
          console.warn('Portal: Three.js failed to load', err);
        });
      }
    }, { rootMargin: '200px' }); // Carrega 200px antes de ficar visível
    
    observer.observe(portalContainer);
  } else {
    // Fallback para navegadores sem IntersectionObserver
    portalContainer.dataset.portalInit = 'true';
    loadThreeJS().then(() => {
      new MagicPortal(portalContainer);
    });
  }
}

// Tenta inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(initPortal, 100));
} else {
  setTimeout(initPortal, 100);
}

// Export para uso externo
window.MagicPortal = MagicPortal;

