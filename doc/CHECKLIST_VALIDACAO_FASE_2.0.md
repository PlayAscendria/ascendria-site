# CHECKLIST DE VALIDACAO - FASE 2.0

**Data:** 08/12/2025
**Objetivo:** Validar estabilidade antes de Fase 2.1 (Performance)
**Tempo Estimado:** 1-2 horas

---

## PRE-REQUISITOS

- [ ] Branch `webp-conversion` atualizada localmente
- [ ] Deploy em staging Vercel realizado
- [ ] DevTools aberto (F12) em navegador limpo

---

## 1. TESTE DE CONEXAO LENTA (CRITICO)

### 1.1 Configurar Throttle
- [ ] Abrir Chrome DevTools (F12)
- [ ] Aba Network
- [ ] Dropdown "No throttling" → Selecionar "Slow 3G"
- [ ] Desabilitar cache: Check "Disable cache"

### 1.2 Teste de Carregamento
- [ ] Recarregar pagina (Ctrl+Shift+R)
- [ ] **FOOTER carrega COM estilos aplicados?** (sem FOUC)
- [ ] **Footer NAO aciona fallback HTML hardcoded?**
- [ ] **Topbar aparece com blur/transparencia correta?**
- [ ] **Background hero carrega progressivamente?**

### 1.3 Console Limpo
- [ ] Aba Console no DevTools
- [ ] **Console esta LIMPO?** (sem console.log visiveis)
- [ ] **console.warn e console.error funcionam?** (se houver)
- [ ] Testar: `localStorage.setItem('DEBUG', '1')` + reload
- [ ] Logs devem aparecer agora (debug mode ativo)
- [ ] Limpar: `localStorage.removeItem('DEBUG')` + reload

**Resultado Esperado:**
```
✅ Footer carrega estavel (sem fallback)
✅ Sem FOUC em nenhum componente
✅ Console limpo em modo producao
```

---

## 2. LIGHTHOUSE BASELINE (OBRIGATORIO)

### 2.1 Rodar Lighthouse
- [ ] Abrir DevTools → Aba Lighthouse
- [ ] Modo: "Navigation" (default)
- [ ] Device: Desktop E Mobile (rodar 2x)
- [ ] Categorias: Performance, Accessibility, Best Practices, SEO
- [ ] Clicar "Analyze page load"

### 2.2 Anotar Metricas BASELINE (Desktop)
```
Performance Score: _____ / 100
FCP: _____ s
LCP: _____ s  (deve ser REAL agora, nao inflado)
TBT: _____ ms
CLS: _____
```

### 2.3 Anotar Metricas BASELINE (Mobile)
```
Performance Score: _____ / 100
FCP: _____ s
LCP: _____ s
TBT: _____ ms
CLS: _____
```

### 2.4 Validar Mudancas da Fase 2.0
- [ ] **LCP mudou vs antes?** (deve ser diferente, pois fantasma foi removido)
- [ ] **Diagnostico Lighthouse menciona "render-blocking CSS"?** (esperado)
- [ ] **Diagnostico menciona "large images"?** (esperado para NFTs)

**Resultado Esperado:**
```
✅ Performance: 70-75 (baseline honesto)
✅ LCP agora e real (~3.5-4.5s)
✅ Seguranca: 95+ (mantido da Fase 1)
```

---

## 3. VALIDACAO VISUAL COMPLETA

### 3.1 Desktop (1920x1080)
- [ ] **Parallax do backgroundlive funciona?** (scroll suave)
- [ ] **Animacoes das nuvens sao fluidas?** (60fps)
- [ ] **Topbar blur/transparencia correta?**
- [ ] **NFTs com qualidade maxima?** (4K se tela suporta)
- [ ] **Footer posicionado no final da pagina?**
- [ ] **Transicoes ao scroll (reveal NFTs) funcionam?**

### 3.2 Mobile (375x667 - iPhone SE)
- [ ] Usar DevTools → Toggle device toolbar (Ctrl+Shift+M)
- [ ] Selecionar "iPhone SE" ou similar
- [ ] Reload + testar scroll
- [ ] **Responsive funciona?**
- [ ] **Touch interactions OK?**
- [ ] **Imagens carregam (mesmo grandes)?**

### 3.3 Comparacao Side-by-Side (Opcional)
- [ ] Abrir producao atual em aba 1
- [ ] Abrir staging em aba 2
- [ ] Comparar visualmente cada secao
- [ ] **Nenhuma diferenca visual detectada?**

**Resultado Esperado:**
```
✅ Zero diferenca visual vs producao
✅ Animacoes/efeitos 100% preservados
✅ Qualidade NFT identica
```

---

## 4. CSP E JSON-LD

### 4.1 Validar Headers CSP
```bash
# Windows PowerShell:
curl.exe -I https://staging.playascendria.com

# Ou no navegador: DevTools > Network > Doc > Headers > Response Headers
```

- [ ] **Content-Security-Policy header presente?**
- [ ] **Valor contem `script-src 'self' https://cdn.jsdelivr.net ...`?**
- [ ] **NAO contem `'unsafe-inline'` em script-src?** (correto)

### 4.2 Validar JSON-LD
- [ ] Abrir: https://search.google.com/test/rich-results
- [ ] Inserir URL: `https://staging.playascendria.com`
- [ ] Clicar "Test URL"
- [ ] **JSON-LD detectado?** (Organization, VideoGame, BreadcrumbList, CollectionPage)
- [ ] **Sem erros de validacao?**

**Resultado Esperado:**
```
✅ CSP corrigido (sem unsafe-inline)
✅ JSON-LD funcionando perfeitamente inline
✅ Structured data validado pelo Google
```

---

## 5. TESTES DE INTERACAO JS

### 5.1 NFTs Share Button
- [ ] Scroll ate secao NFTs
- [ ] Clicar em "Share" de qualquer NFT
- [ ] **Funciona corretamente?** (sem erros no console)

### 5.2 Navegacao por Ancora
- [ ] Clicar em link do menu para "#nfts"
- [ ] **Scroll suave ate secao?**
- [ ] **Topbar altura compensada?**

### 5.3 Portal Magico (Three.js)
- [ ] Scroll ate portal
- [ ] **Animacao 3D carrega?**
- [ ] **Performance OK?** (sem travamentos)

**Resultado Esperado:**
```
✅ Todas interacoes JS funcionam
✅ Sem erros no console
✅ Performance mantida
```

---

## 6. TESTES DE REGRESSAO (Edge Cases)

### 6.1 Reload Multiplos
- [ ] Recarregar pagina 5x seguidas (Ctrl+R)
- [ ] **Footer sempre carrega corretamente?**
- [ ] **Sem comportamento erratico?**

### 6.2 Hard Reload
- [ ] Ctrl+Shift+R (hard reload, limpa cache)
- [ ] **Tudo funciona?**
- [ ] **Loading screen aparece?**

### 6.3 Aba Anonima
- [ ] Abrir staging em aba anonima (Ctrl+Shift+N)
- [ ] Simular "primeiro acesso"
- [ ] **Loading screen funciona?**
- [ ] **Assets preloader OK?**

---

## RESULTADO FINAL

### ✅ APROVADO - Prosseguir para Fase 2.1
- Todos os testes passaram
- Nenhuma regressao visual detectada
- Metricas baseline estabelecidas
- ComponentLoader estavel

### ⚠️ PROBLEMAS ENCONTRADOS
**Listar aqui qualquer problema:**

1. _____________________________
2. _____________________________
3. _____________________________

**Acao:** Corrigir antes de Fase 2.1

---

## PROXIMAS ACOES APOS APROVACAO

**Se validacao OK, iniciar:**

### ETAPA 2: Otimizacao de Imagens (srcset)
- Tempo: 3-4 horas
- Risco: BAIXO
- Ganho: LCP -1.0s~1.5s

**Arquivos a modificar:**
- `index.html` (preload, hero background)
- `components/nfts/Nfts.html` (srcset para NFTs principais)
- Gerar variantes WebP lossless (800w, 1200w, 1600w)

---

**Responsavel Validacao:** _____________________
**Data Validacao:** _____________________
**Status:** [ ] APROVADO  [ ] COM PENDENCIAS
