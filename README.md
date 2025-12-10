# Ascendria - Gaming Community & NFT Ecosystem

Site oficial da comunidade de gaming e ecossistema NFT Ascendria.

## 🚀 Tecnologias

- HTML5 semântico
- CSS3 com animações e responsividade
- JavaScript vanilla (ES6+)
- Service Worker para cache e performance
- Component-based architecture
- SPA Router para navegação suave

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm start

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 🏗️ Estrutura do Projeto

```
ascendria-site/
├── assets/              # Imagens e recursos estáticos
│   └── images/
├── components/          # Componentes reutilizáveis
│   ├── backgroundlive/  # Background animado
│   ├── ecosystem/       # Seção do ecossistema
│   ├── footer/          # Rodapé
│   ├── nfts/            # Seção de NFTs
│   ├── portal/          # Portal de entrada
│   └── topbar/          # Barra de navegação
├── css/                 # Estilos globais
├── js/                  # Scripts principais
│   ├── asset-preloader.js    # Pré-carregamento de assets
│   ├── component-loader.js  # Carregador de componentes
│   └── spa-router.js        # Roteador SPA
├── pages/               # Páginas adicionais
│   ├── financialmodel/ # Modelo financeiro
│   ├── lore/           # Lore do jogo
│   └── whitepaper/     # Whitepaper
├── build.js            # Script de build
├── sw.js               # Service Worker
└── vercel.json         # Configuração Vercel
```

## 🎯 Features

### Performance
- ✅ Service Worker para cache offline
- ✅ Lazy loading de imagens
- ✅ Minificação de CSS/JS em produção
- ✅ Preload de recursos críticos
- ✅ Otimização de assets

### SEO
- ✅ Meta tags otimizadas
- ✅ Schema.org structured data
- ✅ Sitemap.xml
- ✅ Open Graph e Twitter Cards
- ✅ Canonical URLs

### Acessibilidade
- ✅ ARIA labels
- ✅ Navegação por teclado
- ✅ Skip to main content
- ✅ Contraste adequado
- ✅ Semântica HTML5

### Segurança
- ✅ Content Security Policy (CSP)
- ✅ XSS Protection
- ✅ HTTPS enforcement
- ✅ Frame protection

## 🔧 Build para Produção

O script de build (`build.js`) realiza:

1. **Minificação de JavaScript**: Remove comentários, espaços e console.logs
2. **Minificação de CSS**: Remove comentários e espaços desnecessários
3. **Otimização de HTML**: Remove comentários e espaços
4. **Cópia de assets**: Mantém estrutura de pastas

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## 📱 Responsividade

O site é totalmente responsivo e otimizado para:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1440px+)

## 🌐 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente (se necessário)
3. Deploy automático a cada push

O arquivo `vercel.json` já está configurado com:
- Headers de segurança
- Cache policies
- Redirects
- Clean URLs

### Outros Provedores

O site é estático e pode ser deployado em qualquer servidor:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## 🔍 Performance

### Métricas Alvo
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FCP (First Contentful Paint)**: < 1.8s

### Otimizações Implementadas
- Service Worker para cache
- Lazy loading de imagens
- Preload de recursos críticos
- Minificação de assets
- Compressão de imagens (WebP)

## 🐛 Debugging

### Modo Debug
Para ativar logs de debug, defina:

```javascript
window.DEBUG = true;
```

### Diagnostic Page
Acesse `/diagnostic.html` para verificar:
- Status dos componentes
- Carregamento de assets
- Capacidades do navegador

## 📝 Scripts Disponíveis

```bash
npm start          # Servidor de desenvolvimento
npm run build      # Build para produção
npm run preview    # Preview do build
npm run clean      # Limpar pasta dist
```

## 🔐 Segurança

O site implementa várias camadas de segurança:

- **CSP Headers**: Previne XSS attacks
- **X-Frame-Options**: Previne clickjacking
- **HSTS**: Força HTTPS
- **X-Content-Type-Options**: Previne MIME sniffing
- **Referrer Policy**: Controla informações de referência

## 📄 Licença

Proprietário - Ascendria Team

## 🤝 Contribuindo

Este é um projeto privado. Para sugestões ou problemas, entre em contato através do Discord.

## 📞 Contato

- **Website**: https://playascendria.com
- **Discord**: https://discord.gg/wdAS9ey5pm
- **Twitter**: https://x.com/PlayAscendria
- **YouTube**: https://www.youtube.com/@PlayAscendria
- **TikTok**: https://www.tiktok.com/@playascendria

---

Desenvolvido com ❤️ pela equipe Ascendria

