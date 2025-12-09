/**
 * Component Loader - Sistema unificado de carregamento de componentes
 * Carrega HTML, CSS e JS de componentes de forma consistente
 * 
 * VERCEL COMPATIBILITY:
 * - Usa SEMPRE paths absolutos (começando com /)
 * - Case-sensitive: nomes de arquivos devem corresponder EXATAMENTE
 * - Timeout de fetch para evitar travamentos
 */
class ComponentLoader {
  // Timeout para fetch (5 segundos)
  static FETCH_TIMEOUT = 5000;
  
  /**
   * Fetch com timeout para evitar travamentos
   */
  static async fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.FETCH_TIMEOUT);
    
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeout);
      return response;
    } catch (err) {
      clearTimeout(timeout);
      if (err.name === 'AbortError') {
        throw new Error(`Timeout ao carregar: ${url}`);
      }
      throw err;
    }
  }

  /**
   * Carrega um componente dinamicamente
   * @param {string} componentName - Nome do componente (ex: 'topbar', 'footer')
   * @param {string} placeholderId - ID do elemento placeholder
   * @returns {Promise<void>}
   */
  static async load(componentName, placeholderId) {
    const placeholder = document.getElementById(placeholderId);

    if (!placeholder) {
      console.warn(`[ComponentLoader] Placeholder não encontrado: ${placeholderId}`);
      return;
    }

    try {
      // Mapear nomes dos componentes para seus arquivos HTML corretos (CASE-SENSITIVE!)
      // Linux/Vercel é case-sensitive, então os nomes devem corresponder EXATAMENTE
      const htmlFileNames = {
        'topbar': 'TopBar',        // /components/topbar/TopBar.html
        'footer': 'Footer',        // /components/footer/Footer.html
        'backgroundlive': 'BackgroundLive',  // /components/backgroundlive/BackgroundLive.html
        'nfts': 'Nfts'            // /components/nfts/Nfts.html
      };

      const htmlFileName = htmlFileNames[componentName] || componentName;
      // SEMPRE usar paths absolutos (começando com /)
      const htmlPath = `/components/${componentName}/${htmlFileName}.html`;
      console.debug && console.debug(`[ComponentLoader] Carregando ${componentName} de ${htmlPath}`);
      const htmlResponse = await this.fetchWithTimeout(htmlPath);

      if (!htmlResponse.ok) {
        throw new Error(`HTTP ${htmlResponse.status} - Não foi possível carregar ${htmlPath}`);
      }

      const html = await htmlResponse.text();
      console.debug && console.debug(`[ComponentLoader] ${componentName} HTML carregado:`);
      placeholder.innerHTML = html;
      console.debug && console.debug(`[ComponentLoader] ${componentName} injetado no DOM`);
      
      // Carregar CSS se não existir (path absoluto)
      const cssPath = `/components/${componentName}/${componentName}.css`;
      const cssId = `component-css-${componentName}`;

      // Verifica se o CSS já foi carregado (pelo ID ou pelo href)
      const cssAlreadyLoaded = document.getElementById(cssId) || 
        document.querySelector(`link[href="${cssPath}"], link[href*="${componentName}/${componentName}.css"]`);

      if (!cssAlreadyLoaded) {
        const link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.href = cssPath;
        document.head.appendChild(link);

        // Aguarda o carregamento do stylesheet com fallback de timeout
        // Não bloqueia indefinidamente: resolve após load, error ou 3000ms
        try {
          await new Promise((resolve) => {
            let done = false;
            const tidy = () => {
              if (done) return; done = true; resolve();
            };
            const t = setTimeout(() => { tidy(); }, 3000);
            link.onload = () => { clearTimeout(t); tidy(); };
            link.onerror = () => { clearTimeout(t); tidy(); };
          });
        } catch (e) {
          // Não devemos quebrar a renderização se o CSS falhar
        }
      }

      // Carregar JS se existir (path absoluto)
      const jsPath = `/components/${componentName}/${componentName}.js`;
      
      try {
        const jsCheck = await this.fetchWithTimeout(jsPath, { method: 'HEAD' });
        if (jsCheck.ok) {
          const script = document.createElement('script');
          script.src = jsPath;
          script.defer = true;
          document.body.appendChild(script);
        }
      } catch (jsErr) {
        // JS é opcional, não logar como erro
      }

          } catch (err) {
      // Erro silencioso em produção - componente falhou ao carregar
      console.error(`[ComponentLoader] Erro ao carregar ${componentName}:`, err);
      throw err;
    }
  }

  /**
   * Carrega múltiplos componentes em paralelo
   * @param {Array<{name: string, placeholder: string}>} components
   * @returns {Promise<void[]>}
   */
  static async loadMultiple(components) {
    const promises = components.map(comp =>
      this.load(comp.name, comp.placeholder)
    );
    return Promise.all(promises);
  }
}

// Expor globalmente
window.ComponentLoader = ComponentLoader;

