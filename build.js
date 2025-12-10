#!/usr/bin/env node
/**
 * Build script para produção
 * Minifica JS/CSS e otimiza assets
 */

const fs = require('fs');
const path = require('path');

// Configuração
const BUILD_DIR = path.join(__dirname, 'dist');
const SRC_DIR = __dirname;

// Utilitários
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyDir(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function minifyJS(content) {
  // Não minificar portal.js para evitar corromper URLs
  if (content.includes('loadThreeJS')) {
    return content;
  }
  // NÃO minificar arquivos que contêm template literals complexos (shaders, etc)
  // Também não minificar portal.js que tem código complexo
  if (content.includes('gl_FragColor') || content.includes('gl_Position') || 
      content.includes('THREE.') || content.includes('ShaderMaterial') ||
      content.includes('MagicPortal') || content.includes('magic-portal')) {
    // Apenas remover comentários, mas manter estrutura COMPLETA
    // Não remover quebras de linha ou espaços importantes
    content = content.replace(/\/\/.*$/gm, '');
    content = content.replace(/\/\*[\s\S]*?\*\//g, '');
    // Remover apenas console.logs de debug (mas manter console.error)
    content = content.replace(/console\.(log|debug)\([^)]*\);?/g, '');
    // Manter estrutura original - não minificar mais
    return content;
  }
  
  // Remover comentários de linha e bloco
  content = content.replace(/\/\/.*$/gm, '');
  content = content.replace(/\/\*[\s\S]*?\*\//g, '');
  
  // Remover console.logs (exceto console.error em produção pode ser útil)
  content = content.replace(/console\.(log|debug|warn)\([^)]*\);?/g, '');
  
  // Remover linhas vazias múltiplas
  content = content.replace(/\n\s*\n\s*\n/g, '\n');
  
  // Remover espaços desnecessários (básico) - mas ser mais cuidadoso
  content = content.replace(/\s+/g, ' ');
  content = content.replace(/;\s*}/g, '}');
  content = content.replace(/{\s*/g, '{');
  content = content.replace(/}\s*/g, '}');
  
  return content.trim();
}

function minifyCSS(content) {
  // Remover comentários
  content = content.replace(/\/\*[\s\S]*?\*\//g, '');
  
  // Remover espaços desnecessários
  content = content.replace(/\s+/g, ' ');
  content = content.replace(/;\s*}/g, '}');
  content = content.replace(/{\s*/g, '{');
  content = content.replace(/}\s*/g, '}');
  content = content.replace(/:\s*/g, ':');
  content = content.replace(/;\s*/g, ';');
  
  return content.trim();
}

function processHTML(content) {
  // Remover comentários HTML
  content = content.replace(/<!--[\s\S]*?-->/g, '');
  
  // Remover espaços em branco desnecessários
  content = content.replace(/>\s+</g, '><');
  
  return content;
}

// Processar arquivos JS
function processJSFiles() {
  const jsFiles = [];
  
  function findJSFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== 'dist') {
        findJSFiles(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.js')) {
        jsFiles.push(fullPath);
      }
    }
  }
  
  findJSFiles(SRC_DIR);
  
  console.log(`📦 Processando ${jsFiles.length} arquivos JS...`);
  
  jsFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const minified = minifyJS(content);
    const relPath = path.relative(SRC_DIR, file);
    const destPath = path.join(BUILD_DIR, relPath);
    
    ensureDir(path.dirname(destPath));
    fs.writeFileSync(destPath, minified, 'utf8');
  });
}

// Processar arquivos CSS
function processCSSFiles() {
  const cssFiles = [];
  
  function findCSSFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== 'dist') {
        findCSSFiles(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.css')) {
        cssFiles.push(fullPath);
      }
    }
  }
  
  findCSSFiles(SRC_DIR);
  
  console.log(`🎨 Processando ${cssFiles.length} arquivos CSS...`);
  
  cssFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const minified = minifyCSS(content);
    const relPath = path.relative(SRC_DIR, file);
    const destPath = path.join(BUILD_DIR, relPath);
    
    ensureDir(path.dirname(destPath));
    fs.writeFileSync(destPath, minified, 'utf8');
  });
}

// Processar arquivos HTML
function processHTMLFiles() {
  const htmlFiles = [];
  
  function findHTMLFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== 'dist') {
        findHTMLFiles(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        htmlFiles.push(fullPath);
      }
    }
  }
  
  findHTMLFiles(SRC_DIR);
  
  console.log(`📄 Processando ${htmlFiles.length} arquivos HTML...`);
  
  htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const processed = processHTML(content);
    const relPath = path.relative(SRC_DIR, file);
    const destPath = path.join(BUILD_DIR, relPath);
    
    ensureDir(path.dirname(destPath));
    fs.writeFileSync(destPath, processed, 'utf8');
  });
}

// Copiar assets
function copyAssets() {
  console.log('📁 Copiando assets...');
  const assetsDirs = ['assets', 'sitemap.xml', 'vercel.json'];
  
  assetsDirs.forEach(item => {
    const srcPath = path.join(SRC_DIR, item);
    if (fs.existsSync(srcPath)) {
      const destPath = path.join(BUILD_DIR, item);
      if (fs.statSync(srcPath).isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        ensureDir(path.dirname(destPath));
        fs.copyFileSync(srcPath, destPath);
      }
    }
  });
}

// Main
function build() {
  console.log('🚀 Iniciando build de produção...\n');
  
  // Limpar diretório de build
  if (fs.existsSync(BUILD_DIR)) {
    fs.rmSync(BUILD_DIR, { recursive: true });
  }
  ensureDir(BUILD_DIR);
  
  // Processar arquivos
  processJSFiles();
  processCSSFiles();
  processHTMLFiles();
  copyAssets();
  
  // Copiar package.json e outros arquivos necessários
  ['package.json', 'vercel.json', 'sitemap.xml'].forEach(file => {
    const src = path.join(SRC_DIR, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(BUILD_DIR, file));
    }
  });
  
  console.log('\n✅ Build concluído! Arquivos em:', BUILD_DIR);
}

// Executar
if (require.main === module) {
  build();
}

module.exports = { build };

