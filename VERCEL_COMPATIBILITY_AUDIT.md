# 🔴 AUDITORIA DE COMPATIBILIDADE: LiveServer vs Vercel

**Data:** 30 de Novembro de 2025  
**Projeto:** Ascendria Site  
**Status:** 🔴 CRÍTICO - Problemas identificados

---

## 📊 RESUMO EXECUTIVO

### Por que funciona no LiveServer mas não na Vercel?

| Aspecto | LiveServer | Vercel |
|---------|------------|--------|
| **Case Sensitivity** | Windows = case-insensitive | Linux = **CASE-SENSITIVE** |
| **@import CSS** | Resolve relativos localmente | Pode falhar por timing/CORS |
| **Paths relativos** | Resolve a partir do arquivo | Pode ter comportamento diferente |
| **Cache** | Sem cache (sempre atualizado) | Cache agressivo (1 ano para assets) |
| **MIME Types** | Permissivo | Estrito (nosniff) |
| **CSP** | Não aplicado | Headers de segurança ativos |

---

## 🟥 1. CAMINHOS, ROTAS E URLs

### ❌ PROBLEMAS CRÍTICOS ENCONTRADOS

#### 1.1 @import com caminhos relativos (CAUSA PRINCIPAL DO FOUC)

**Arquivos afetados:**
- `pages/whitepaper/style.css`
- `pages/tokenomics/style.css`
- `pages/lore/style.css`

**Código problemático:**
```css
@import url("../../css/style.css");
@import url("../../components/topbar/topbar.css");
@import url("../../components/backgroundlive/backgroundlive.css");
```

**Por que falha na Vercel:**
1. `@import` com paths relativos (`../../`) depende da resolução do navegador
2. LiveServer resolve corretamente porque conhece a estrutura local
3. Vercel serve os arquivos de forma diferente, e o timing do @import causa FOUC
4. O CSS não está carregado quando o HTML renderiza

**CORREÇÃO:**
```css
/* Usar paths absolutos OU eliminar @import */
@import url("/css/style.css");
@import url("/components/topbar/topbar.css");
@import url("/components/backgroundlive/backgroundlive.css");
```

**MELHOR SOLUÇÃO - Eliminar @import completamente:**
Mover os `<link>` para o HTML das páginas internas.

---

#### 1.2 Inconsistência de paths entre HTML e CSS

**Mistura de formatos encontrada:**

| Arquivo | Formato | Status |
|---------|---------|--------|
| `index.html` CSS links | Relativos (`css/style.css`) | ⚠️ |
| `index.html` JS links | Absolutos (`/js/component-loader.js`) | ✅ |
| `about.html` CSS links | Relativos (`css/style.css`) | ⚠️ |
| `about.html` JS links | Misturado | ⚠️ |
| `pages/*/index.html` | Local (`style.css`) | ✅ |

**CORREÇÃO:** Padronizar TODOS os paths como absolutos começando com `/`.

---

#### 1.3 Case Sensitivity (Potencial problema)

**Arquivos com CamelCase:**
- `components/topbar/TopBar.html` ✅
- `components/backgroundlive/BackgroundLive.html` ✅
- `components/footer/Footer.html` ✅

**O component-loader.js já trata isso:**
```javascript
const htmlFileNames = {
  'topbar': 'TopBar',
  'footer': 'Footer',
  'backgroundlive': 'BackgroundLive'
};
```
✅ **OK** - Mapeamento correto implementado.

---

## 🟧 2. IMPORTAÇÕES CSS/JS

### ❌ PROBLEMAS CRÍTICOS

#### 2.1 @import no CSS das páginas internas

**Problema:** Os 3 arquivos de páginas internas usam `@import`:
- `pages/whitepaper/style.css` - 3 imports
- `pages/tokenomics/style.css` - 3 imports  
- `pages/lore/style.css` - 3 imports

**Por que causa FOUC:**
1. Browser baixa `style.css`
2. Encontra `@import`, faz NOVA requisição
3. Enquanto espera, HTML já foi parseado
4. Conteúdo aparece sem estilo → **FOUC**

**SOLUÇÃO:** Eliminar `@import` e usar `<link>` no HTML.

---

#### 2.2 Módulos ES6 externos

**Código atual (index.html):**
```html
<script type="module">
  import { injectSpeedInsights } from 'https://cdn.jsdelivr.net/npm/@vercel/speed-insights@1/dist/index.mjs';
  injectSpeedInsights();
</script>
```
✅ **OK** - URL completa com HTTPS.

---

## 🟨 3. MIME-TYPE, CORS E PERMISSÕES

### ✅ Headers configurados no vercel.json

```json
{
  "key": "X-Content-Type-Options",
  "value": "nosniff"
}
```

**Implicação:** Vercel é ESTRITO com MIME types. Se um arquivo não tiver o tipo correto, será bloqueado.

### ⚠️ CSP configurado

```json
{
  "key": "Content-Security-Policy",
  "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://vitals.vercel-insights.com; frame-ancestors 'self'"
}
```

**Verificação:**
- ✅ `script-src` permite jsdelivr
- ✅ `style-src` permite inline
- ✅ `img-src` permite HTTPS externo
- ✅ `connect-src` permite Vercel Insights

---

## 🟩 4. BUILD, ESTRUTURA E DEPLOY

### ✅ Estrutura de pastas correta

```
/ (raiz)
├── index.html          ✅ Na raiz
├── vercel.json         ✅ Configuração presente
├── assets/             ✅ Assets na raiz
├── components/         ✅ Componentes organizados
├── css/                ✅ CSS global
├── js/                 ✅ JS global
└── pages/              ✅ Subpáginas organizadas
```

### ⚠️ .gitignore pode excluir arquivos necessários

**Atual:**
```
node_modules/
package-lock.json
```

**Verificação:** `package-lock.json` está ignorado, mas não é necessário para site estático.

### ✅ cleanUrls e trailingSlash configurados

```json
{
  "trailingSlash": false,
  "cleanUrls": true
}
```

---

## 🟦 5. SCRIPTS E COMPORTAMENTO DO DOM

### ❌ PROBLEMA CRÍTICO: Timing de carregamento

**Sequência atual no index.html:**
1. CSS carrega (bloqueante) ✅
2. Body inicia com `opacity: 0` ✅
3. Script revela body imediatamente ❌ **MUITO CEDO**
4. ComponentLoader carrega componentes (async)
5. `body.loaded` é adicionado

**Problema:** O script que revela o body executa ANTES dos componentes carregarem.

**No LiveServer:** Mais rápido, parece funcionar
**Na Vercel:** Latência de rede expõe o problema

---

### ❌ PROBLEMA: body.loaded depende de componentes async

**Código atual:**
```javascript
(async function() {
  await Promise.all([
    ComponentLoader.load('topbar', 'topbar-placeholder'),
    ComponentLoader.load('backgroundlive', 'backgroundlive-placeholder'),
    ComponentLoader.load('footer', 'footer-placeholder')
  ]);
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
})();
```

**Problema:** Se QUALQUER fetch falhar, `loaded` pode não ser adicionado.

---

## 🟪 6. APIs EXTERNAS

### ✅ Todas as chamadas usam HTTPS

- `https://cdn.jsdelivr.net` - Swiper, Speed Insights ✅
- `https://vitals.vercel-insights.com` - Analytics ✅
- Links sociais são todos HTTPS ✅

---

## 📋 DIAGNÓSTICO FINAL

### 🔴 CAUSAS RAIZ DO PROBLEMA

| # | Causa | Impacto | Prioridade |
|---|-------|---------|------------|
| 1 | `@import` com paths relativos nas páginas internas | FOUC nas páginas whitepaper/tokenomics/lore | 🔴 CRÍTICO |
| 2 | Timing de revelação do body antes dos componentes | FOUC na página principal | 🔴 CRÍTICO |
| 3 | CSS esconde conteúdo mas JS assíncrono controla | Race condition | 🟠 ALTO |
| 4 | Paths inconsistentes (mistura relativo/absoluto) | Potencial quebra | 🟡 MÉDIO |

---

## 🛠️ CORREÇÕES NECESSÁRIAS

### CORREÇÃO 1: Eliminar @import das páginas internas

**Arquivos:** `pages/whitepaper/index.html`, `pages/tokenomics/index.html`, `pages/lore/index.html`

**Adicionar no `<head>` de cada página:**
```html
<!-- CSS Global (antes do style.css local) -->
<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="/components/topbar/topbar.css">
<link rel="stylesheet" href="/components/backgroundlive/backgroundlive.css">

<!-- CSS Local -->
<link rel="stylesheet" href="style.css">
```

**Remover dos arquivos CSS:**
```css
/* REMOVER estas linhas */
@import url("../../css/style.css");
@import url("../../components/topbar/topbar.css");
@import url("../../components/backgroundlive/backgroundlive.css");
```

---

### CORREÇÃO 2: Padronizar paths como absolutos

**index.html - Mudar de:**
```html
<link rel="stylesheet" href="pages/loading/loading.css">
<link rel="stylesheet" href="css/style.css">
```

**Para:**
```html
<link rel="stylesheet" href="/pages/loading/loading.css">
<link rel="stylesheet" href="/css/style.css">
```

---

### CORREÇÃO 3: Garantir revelação após componentes

**Remover revelação prematura:**
```html
<!-- REMOVER este script -->
<script>document.body.style.opacity = '1';</script>
```

**Manter apenas a revelação após componentes:**
```javascript
// Já existe, apenas garantir que funciona
document.body.classList.add('loaded');
```

---

### CORREÇÃO 4: Adicionar fallback de timeout

```javascript
// Adicionar timeout de segurança
setTimeout(() => {
  if (!document.body.classList.contains('loaded')) {
    console.warn('⚠️ Fallback: forçando exibição após timeout');
    document.body.classList.add('loaded');
  }
}, 3000);
```

---

## ✅ CHECKLIST DE COMPATIBILIDADE VERCEL

- [ ] Eliminar TODOS os `@import` de CSS
- [ ] Usar paths absolutos (`/css/...`) em todos os lugares
- [ ] Não revelar body antes dos componentes carregarem
- [ ] Verificar case-sensitivity de todos os arquivos
- [ ] Testar com cache limpo (Ctrl+Shift+R)
- [ ] Verificar Console do navegador em produção
- [ ] Validar que todos os assets existem com nomes exatos

---

## 🧪 COMO TESTAR

1. **Limpar cache:** `Ctrl+Shift+R` no navegador
2. **DevTools:** Abrir Network e verificar se todos arquivos retornam 200
3. **Console:** Verificar erros de 404 ou CORS
4. **Throttling:** Testar com "Slow 3G" para expor race conditions
5. **Incognito:** Testar sem extensões

---

## 📝 PRÓXIMOS PASSOS

1. Aplicar CORREÇÃO 1 (eliminar @import) - **PRIORITÁRIO**
2. Aplicar CORREÇÃO 2 (paths absolutos)
3. Aplicar CORREÇÃO 3 (timing de revelação)
4. Deploy e testar
5. Monitorar Console em produção
