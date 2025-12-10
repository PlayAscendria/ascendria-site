# ✅ Checklist de Produção - Ascendria Site

Use este checklist antes de fazer deploy em produção.

## 🔍 Pré-Deploy

### Performance
- [x] Service Worker configurado e testado
- [x] Lazy loading implementado em imagens
- [x] Minificação de CSS/JS configurada
- [x] Preload de recursos críticos
- [x] Compressão de imagens (WebP)
- [ ] Teste de Lighthouse Score (>90 em todas as métricas)
- [ ] Teste de Core Web Vitals

### SEO
- [x] Meta tags completas (title, description, keywords)
- [x] Open Graph tags
- [x] Twitter Cards
- [x] Schema.org structured data
- [x] Sitemap.xml atualizado
- [x] Robots.txt configurado
- [x] Canonical URLs
- [ ] Verificar indexação no Google Search Console

### Segurança
- [x] Content Security Policy (CSP) configurado
- [x] X-Frame-Options
- [x] X-XSS-Protection
- [x] HSTS headers
- [x] HTTPS enforcement
- [ ] Verificar vulnerabilidades com ferramentas de segurança

### Acessibilidade
- [x] ARIA labels implementados
- [x] Navegação por teclado funcional
- [x] Skip to main content
- [x] Alt text em imagens
- [ ] Teste com leitor de tela
- [ ] Verificar contraste de cores (WCAG AA)

### Código
- [x] Console.logs removidos (exceto em dev)
- [x] Código comentado removido em produção
- [x] Error handling implementado
- [x] Fallbacks para funcionalidades críticas
- [ ] Teste em múltiplos navegadores
- [ ] Teste em dispositivos móveis

### Build
- [x] Script de build funcionando
- [x] Arquivos minificados corretamente
- [x] Assets copiados corretamente
- [ ] Teste do build local antes do deploy
- [ ] Verificar tamanho dos arquivos

## 🚀 Deploy

### Antes do Deploy
- [ ] Fazer backup do ambiente atual
- [ ] Revisar mudanças no código
- [ ] Executar `npm run build`
- [ ] Testar build localmente (`npm run preview`)
- [ ] Verificar se todos os assets carregam

### Durante o Deploy
- [ ] Monitorar logs de deploy
- [ ] Verificar se Service Worker registra corretamente
- [ ] Testar funcionalidades principais

### Após o Deploy
- [ ] Verificar site em produção
- [ ] Testar navegação entre páginas
- [ ] Verificar carregamento de imagens
- [ ] Testar funcionalidades interativas
- [ ] Verificar métricas de performance
- [ ] Monitorar erros no console

## 📊 Monitoramento

### Ferramentas Recomendadas
- [ ] Google Analytics configurado
- [ ] Vercel Analytics ativo
- [ ] Error tracking (Sentry, etc.)
- [ ] Performance monitoring

### Métricas a Monitorar
- LCP (Largest Contentful Paint) < 2.5s
- FID (First Input Delay) < 100ms
- CLS (Cumulative Layout Shift) < 0.1
- FCP (First Contentful Paint) < 1.8s
- TTFB (Time to First Byte) < 600ms

## 🔄 Manutenção

### Regular
- [ ] Atualizar dependências mensalmente
- [ ] Revisar logs de erro semanalmente
- [ ] Verificar performance mensalmente
- [ ] Atualizar conteúdo conforme necessário

### Quando Atualizar
- [ ] Nova funcionalidade adicionada
- [ ] Correção de bugs
- [ ] Atualização de conteúdo
- [ ] Mudanças de design

## 📝 Notas

- Sempre testar em ambiente de staging antes de produção
- Manter backup dos arquivos antes de grandes mudanças
- Documentar mudanças significativas
- Comunicar mudanças importantes à equipe

---

**Última atualização**: 2025-01-27
**Versão**: 1.0.0

