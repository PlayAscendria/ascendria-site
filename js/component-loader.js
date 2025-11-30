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
      // Mapear nomes dos componentes para seus arquivos HTML corretos (case-sensitive)
      const htmlFileNames = {
        'topbar': 'TopBar',
        'footer': 'Footer',
        'backgroundlive': 'BackgroundLive'
      };
      
      const htmlFileName = htmlFileNames[componentName] || componentName;
      const htmlPath = `/components/${componentName}/${htmlFileName}.html`;
      
      console.log(`🔍 Tentando carregar: ${htmlPath}`);
      const htmlResponse = await fetch(htmlPath);

      if (!htmlResponse.ok) {
        throw new Error(`Erro ao carregar HTML: ${htmlResponse.status} - ${htmlPath}`);
      }

      const html = await htmlResponse.text();
      placeholder.innerHTML = html;
      console.log(`✓ HTML carregado: ${componentName}`);

      // Carregar CSS se não existir
      const cssPath = `/components/${componentName}/${componentName}.css`;
      const cssId = `component-css-${componentName}`;

      if (!document.getElementById(cssId)) {
        const link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.href = cssPath;
        document.head.appendChild(link);
        console.log(`✓ CSS carregado: ${componentName}`);
      }

      // Carregar JS se existir
      const jsPath = `/components/${componentName}/${componentName}.js`;
      
      // Verificar se o arquivo JS existe antes de tentar carregar
      try {
        const jsCheck = await fetch(jsPath, { method: 'HEAD' });
        if (jsCheck.ok) {
          const script = document.createElement('script');
          script.src = jsPath;
          script.defer = true;
          document.body.appendChild(script);
          console.log(`✓ JS carregado: ${componentName}`);
        }
      } catch (jsErr) {
        console.log(`ℹ️ Sem JS para ${componentName} (opcional)`);
      }

      console.log(`✅ Componente ${componentName} carregado com sucesso`);

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
