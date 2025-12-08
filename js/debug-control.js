// debug-control.js
// Minimal production-safe logger control.
// Include this file early (head) to silence console.* in production-like environments.
(function(){
  'use strict';

  // If window.DEBUG is already explicitly set (e.g. staging), respect it.
  if (typeof window.DEBUG === 'undefined') {
    try {
      // Allow opt-in debug in local/staging by setting localStorage DEBUG='1'
      window.DEBUG = (localStorage && localStorage.getItem && localStorage.getItem('DEBUG') === '1') || false;
    } catch (e) {
      window.DEBUG = false;
    }
  }

  if (!window.DEBUG && typeof console !== 'undefined') {
    // Keep console.error/warn so real issues are visible; silence verbose logs.
    console.log = function(){};
    console.debug = function(){};
    console.info = function(){};
  }

})();
/**
 * Debug Control - Ascendria Site
 * Gerencia logs de debug em producao vs desenvolvimento
 *
 * SEGURANCA: Remove console.logs visiveis em producao sem alterar codigo existente
 * MANUTENCAO: Para ativar logs em dev, mude DEBUG para true
 *
 * @version 1.0.0
 * @date 08/12/2025
 */

(function() {
    'use strict';

    // Configuracao: true para desenvolvimento, false para producao
    // IMPORTANTE: Manter false em deploy de producao
    window.DEBUG = false;

    // Silenciar console em producao
    if (!window.DEBUG && window.console) {
        // Salvar funcoes originais caso precisem ser restauradas
        window.__originalConsole = {
            log: console.log,
            debug: console.debug,
            info: console.info
        };

        // Substituir por funcoes vazias (no-op)
        console.log = function() {};
        console.debug = function() {};
        // console.info mantido por seguranca (pode ter informacoes criticas)

        // console.warn e console.error SEMPRE ativos (erros devem ser visiveis)
    }

    // Helper para desenvolvedores: restaurar console se necessario
    window.restoreConsole = function() {
        if (window.__originalConsole) {
            console.log = window.__originalConsole.log;
            console.debug = window.__originalConsole.debug;
            console.info = window.__originalConsole.info;
            console.log('[DEBUG] Console restaurado');
        }
    };

})();
