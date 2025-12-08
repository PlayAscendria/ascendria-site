# Auditoria Técnica - Ascendria (Completa)

Data: 08/12/2025

Resumo: auditoria técnica voltada a performance, segurança, JS/CSS e imagens. Todas as recomendações preservam efeitos visuais, transições e qualidade das imagens. Não proponho mudanças de stack nem remoção de efeitos.

---

**1) Sumário executivo**

- Console.logs em produção — poluição do console e exposição de detalhes internos. (Média)
- Race condition no carregamento do `footer` (ComponentLoader + dom-handlers) — fallback acionando indevidamente. (Alta)
- Possível LCP fantasma: preload + imagem invisível no `index.html`. (Alta)
- CSS crítico vs não-crítico: organização e carregamento (bloqueante). (Média)
- Uso intensivo de `filter` / `backdrop-filter` — potencial impacto no framerate. (Média)
- CSP no `vercel.json` e scripts inline (`application/ld+json`) — alinhar políticas com prática atual. (Alta)
- Imagens grandes (assets/nfts/*) — já WebP, mas precisam de compressão lossless e variantes responsivas. (Média)
- Acessibilidade: `prefers-reduced-motion` presente em pontos; revisar headings e contrastes. (Baixa)

---

**2) Achados detalhados, evidências e localizações**

2.1 Console.log e mensagens de debug
- Exemplos encontrados (grep):
  - `components/nfts/nfts.js` — linhas com `console.log('[Ascenders] Share button found:')`.
  # Auditoria Técnica — versão refeita

  Data: 08/12/2025

  Objetivo: análise técnica completa focalizada em performance (FCP/LCP/framerate), arquitetura JS, CSS, segurança (CSP) e imagens. Todas as recomendações aqui são não-intrusivas e projetadas para preservar 100% dos efeitos visuais, animações e qualidade de imagem.

  ## Resumo executivo (rápido)
  - Race condition / fallback do `footer` (alto) — ComponentLoader + dom-handlers: o CSS/HTML injetado pode não estar aplicado quando a página é exibida.
  - Potencial LCP fantasma (alto) — `index.html` faz preload da imagem e injeta um `<img>` praticamente invisível; pode gerar métricas incorretas.
  - CSS crítico vs não-crítico (médio) — várias folhas de estilo carregadas bloqueantes; estratégia de preloads mista.
  - Uso intensivo de `filter` / `backdrop-filter` (médio) — camadas que exigem composição e podem afetar framerate em GPUs fracas.
  - Console logs e warnings (baixo→médio) — presença de `console.log`, `console.warn` e `console.error` espalhados (úteis para debug, ruidosos em produção).
  - CSP e JSON-LD inline (alto para segurança) — headers em `vercel.json` e uso inline de JSON-LD exigem verificação (hashes/nonces ou mover para arquivo externo).
  - Imagens críticas de alta resolução (médio) — já WebP, mas sem variantes responsivas; alguns recursos muito grandes precisam de entrega adaptativa (srcset) e compressão lossless.

  ## Metodologia
  - Buscas automatizadas por padrões (`console.`, `rel=preload`, `fetchpriority`, `loading="lazy"`, `requestAnimationFrame`, `will-change`, `backdrop-filter`, `script type="application/ld+json"`) e revisão manual dos arquivos chave: `index.html`, `js/*`, `components/*`, `assets/images/*`, `vercel.json`.

  ## Achados (com localizações)

  1) ComponentLoader & Footer — Race condition (Alta)
  - Localizações:
    - `js/component-loader.js` (método `load`) — injeta HTML e CSS dinamicamente; não aguarda `link.onload`.
    - `js/dom-handlers.js` — `loadComponents()` usa `Promise.all` e depois valida com timeouts; `injectFooterFallback()` insere footer em caso de falha.

  2) LCP fantasma (Alta)
  - Localização:
    - `index.html` — `link rel="preload" as="image" href="/assets/images/background/backgroundpaisagem/5_fundosol_1.webp" fetchpriority="high"` + `<img ... style="position:absolute;width:1px;height:1px;opacity:0.01;...">`.

  3) CSS crítico e ordem de carregamento (Média)
  - Localizações chaves:
    - `index.html` — `/pages/loading/loading.css`, `/css/style.css`, `/components/topbar/topbar.css`, `/components/backgroundlive/backgroundlive.css`, preloads para alguns componentes e `responsive.css` por último.

  4) Filtros / backdrop-filter / will-change (Médio)
  - Arquivos:
    - `components/backgroundlive/backgroundlive.css` (muitas animações de nuvens e `filter: blur()`),
    - `components/topbar/topbar.css` (backdrop-filter),
    - `components/nfts/nfts.css` (backdrop-filter e blur),
    - `components/*` com `will-change: transform/opacity` em lugares (padrão correto, mas requer gestão).

  5) requestAnimationFrame e loops (Médio)
  - Locais com RAF:
    - `components/portal/portal.js`, `components/ecosystem/ecosystem.js`, `js/asset-preloader.js`, `pages/*` — verificar cancelamento e throttling.

  6) Console logs / warnings / errors (Baixa→Média)
  - Exemplos:
    - `components/nfts/nfts.js` (console.log / console.warn durante montagem de layers),
    - `js/component-loader.js` (console.log, console.warn, console.error),
    - `js/dom-handlers.js` (console.warn/debug footer, console.error),
    - `js/asset-preloader.js` e diversas páginas com logs de debug/diagnóstico.

  7) CSP e JSON-LD (Alta)
  - `vercel.json` define `Content-Security-Policy` em headers; `script-src` permite `self` e CDNs, mas não `unsafe-inline`. `index.html` tem múltiplos blocos inline `application/ld+json` — possível incompatibilidade que exige hashes ou mover JSON-LD para arquivos externos.

  8) Imagens críticas e dimensões (Média)
  - Exemplos:
    - `components/nfts/Nfts.html`: `miner_1.webp`, `miner_2.webp`, `miner_3.webp` com `width="4133" height="5846"` (muito grandes).
    - Muitas imagens usam `loading="lazy"` corretamente, mas faltam `srcset`/`sizes` para servir variantes responsivas.

  ## Recomendações (seguras e não intrusivas)

  Prioridade Alta
  - Corrigir o fluxo de carregamento de CSS dinâmico no `ComponentLoader` para aguardar `link.onload` (com timeout) antes de sinalizar componente como pronto. Isso reduz falsos fallbacks e FOUC. (Implementação pode ser testada em staging.)
  - Reavaliar preload LCP: garantir que o recurso preloadado é o mesmo utilizado pelo elemento visível (ou via asset-preloader se hero é canvas). Evitar a técnica 1×1 invisível.
  - Revisar CSP em staging (curl -I) e, se necessário, mover JSON-LD inline para arquivos externos sob `/assets/ld/` ou gerar hashes para permitir inline sem `'unsafe-inline'`.

  Prioridade Média
  - Gerar variantes responsivas lossless (WebP/AVIF) e adicionar `srcset`/`sizes` para imagens de galeria e backgrounds.
  - Auditar camadas com `filter/backdrop-filter` e aplicar `contain: paint` e `will-change` somente quando necessário; remover `will-change` após animação.
  - Garantir cancelamento de RAF loops quando componente sair de viewport ou for desmontado.

  Prioridade Baixa
  - Política de logs: consolidar ou reduzir `console.log` em produção para reduzir ruído (opcional; não crítico). Manter `console.error`/`warn` para problemas reais.

  ## Plano de ação seguro (step-by-step)
  1) Coleta de métricas em staging: Lighthouse + RUM; registrar FCP/LCP/CLS atuais.
  2) Validar headers CSP aplicados pelo Vercel (curl) — verificar permissões para inline JSON-LD.
  3) Implementar e testar em PR a melhoria no `ComponentLoader` (aguardar `link.onload` com timeout). Testar com throttle e validar que fallback de footer não é mais disparado.
  4) Mapear LCP real (hero rendering) e alinhar preload com o recurso efetivamente usado.
  5) Gerar variantes lossless para 3 imagens grandes e propor `srcset` de prova de conceito no staging para validação visual.
  6) Auditar performance de pintura (devtools paint flashing) nas camadas com blur e aplicar `contain`/`will-change` controlado.
  7) Revisão de logs e policy de console, se desejado pela equipe.

  ## Checklist de aceitação
  - LCP real corresponde ao que o usuário vê (hero). 
  - Footer sem fallback indevido em condições de rede lenta.
  - Nenhuma regressão visual após ajustes (QA manual). 
  - Framerate estável em dispositivos alvo.
  - CSP validado; JSON-LD funcional.

  ## Próximo passo (escolha)
  - Quer que eu:
    - (A) **Apenas análise**: eu executo verificação de headers CSP em staging/prod e atualizo o relatório com resultados (sem alterar código); ou
    - (B) **Patch mínimo para staging**: eu preparo um PR com a alteração segura no `ComponentLoader` (aguardar `link.onload` + timeout) e instruções de QA; ou
    - (C) **Prova de imagem**: eu gero variantes lossless de exemplo para as imagens `nfts/miner_*` e proponho `srcset` de amostra para validar em staging.

  Diga a opção que prefere e eu executo a próxima etapa.
