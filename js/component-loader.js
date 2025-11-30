/**
 * Component Loader - Sistema unificado de carregamento de componentes
 * Carrega HTML, CSS e JS de componentes de forma consistente
 */
class ComponentLoader {
  /**
   * Carrega um componente dinamicamente
   * @param {string} componentName - Nome do componente (ex: 'topbar', 'footer')
   * @param {string} placeholderId - ID do elemento placeholder
   * @returns {Promise<void>}
   */
  static async load(componentName, placeholderId) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) {
      console.warn(`Placeholder #${placeholderId} não encontrado`);
      return;
    }

    try {
      // Determinar caminho base (root ou subdiretório)
      const isRootPage = !window.location.pathname.includes('/pages/');
      const basePath = isRootPage ? '' : '../../';

      // Carregar HTML
      const htmlPath = `${basePath}components/${componentName}/${componentName.charAt(0).toUpperCase() + componentName.slice(1)}.html`;
      const htmlResponse = await fetch(htmlPath);

      if (!htmlResponse.ok) {
        throw new Error(`Erro ao carregar HTML: ${htmlResponse.status}`);
      }

      const html = await htmlResponse.text();
      placeholder.innerHTML = html;

      // Carregar CSS se não existir
      const cssPath = `${basePath}components/${componentName}/${componentName}.css`;
      const cssId = `component-css-${componentName}`;

      if (!document.getElementById(cssId)) {
        const link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.href = cssPath;
        document.head.appendChild(link);
      }

      // Carregar JS
      const jsPath = `${basePath}components/${componentName}/${componentName}.js`;
      const script = document.createElement('script');
      script.src = jsPath;
      script.defer = true;
      document.body.appendChild(script);

      console.log(`✓ Componente ${componentName} carregado com sucesso`);

    } catch (err) {
      console.error(`✗ Erro ao carregar componente ${componentName}:`, err);
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
