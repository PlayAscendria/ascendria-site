
class ComponentLoader {

  static FETCH_TIMEOUT = 15000;


  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  
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

  
  static async load(componentName, placeholderId) {
    const placeholder = document.getElementById(placeholderId);

    if (!placeholder) {

      return;
    }

    try {


      const htmlFileNames = {
        'topbar': 'TopBar',        
        'footer': 'Footer',        
        'backgroundlive': 'BackgroundLive',  
        'nfts': 'Nfts'            
      };

      const htmlFileName = htmlFileNames[componentName] || componentName;

      const htmlPath = `/components/${componentName}/${htmlFileName}.html`;


      let htmlResponse;
      try {
        htmlResponse = await this.fetchWithTimeout(htmlPath);
      } catch (firstErr) {

        try {
          await this.sleep(800);
          htmlResponse = await this.fetchWithTimeout(htmlPath);
        } catch (secondErr) {

          throw secondErr;
        }
      }

      if (!htmlResponse.ok) {
        throw new Error(`HTTP ${htmlResponse.status} - Não foi possível carregar ${htmlPath}`);
      }

      const html = await htmlResponse.text();

      placeholder.innerHTML = html;
      
      // Dispara evento quando componente é carregado
      document.dispatchEvent(new CustomEvent('componentLoaded', {
        detail: { component: componentName, placeholderId: placeholderId }
      }));

      

      const cssPath = `/components/${componentName}/${componentName}.css`;
      const cssId = `component-css-${componentName}`;


      const cssAlreadyLoaded = document.getElementById(cssId) || 
        document.querySelector(`link[href="${cssPath}"], link[href*="${componentName}/${componentName}.css"]`);

      if (!cssAlreadyLoaded) {
        const link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.href = cssPath;
        document.head.appendChild(link);

        // Nota: não bloquear o carregamento do JS aguardando o CSS.
        // O CSS pode carregar em segundo plano; não é necessário aguardar onload.
      }


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

      }

          } catch (err) {


      throw err;
    }
  }

  
  static async loadMultiple(components) {
    const promises = components.map(comp =>
      this.load(comp.name, comp.placeholder)
    );
    return Promise.all(promises);
  }
}


window.ComponentLoader = ComponentLoader;

