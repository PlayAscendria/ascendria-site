// Entry para empacotar Three.js e o portal juntos
import * as THREE from 'three';

if (typeof window !== 'undefined') {
  // Expor THREE globalmente para compatibilidade com o código existente
  window.THREE = THREE;
}

// Importa o script original do portal (executa o IIFE)
import './portal.js';

export default window.MagicPortal;
