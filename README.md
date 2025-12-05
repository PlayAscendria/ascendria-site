# Ascendria - Gaming Community & NFT Ecosystem

Official website for Ascendria gaming community and NFT ecosystem.

## 🚀 Quick Start

### Local Development
```powershell
# Using Python
Set-Location 'd:\PROJETOS\ASCENDRIA\ascendria-site'
python -m http.server 8000

# Using Node.js
npx serve

# Open in browser: http://localhost:8000
```

## 📁 Project Structure

```
ascendria-site/
├── index.html              # Main homepage
├── diagnostic.html         # Diagnostic tool for troubleshooting
├── assets/                 # Static assets
│   ├── fonts/
│   ├── icons/
│   └── images/
├── components/             # Reusable components
│   ├── topbar/
│   ├── footer/
│   └── backgroundlive/
├── css/                    # Global styles
├── js/                     # Global scripts
└── pages/                  # Sub-pages
    ├── lore/
    ├── financialmodel/
    └── whitepaper/
```

## 🔧 CI/CD Pipeline

### GitHub Actions
Automated quality checks on every push:
- HTML/CSS/JavaScript linting
- File reference validation
- JSON validation
- Security checks

### Deployment
Automatically deployed to Vercel on push to `main` branch.

## 🐛 Troubleshooting

### Site Not Loading on Vercel?

1. **Check Diagnostic Page**: Visit `https://your-domain.vercel.app/diagnostic.html`
2. **Run Full Diagnostic**: Click "Run Full Diagnostic" button
3. **Check Console**: Open browser DevTools (F12) for errors

### Common Issues

#### Components Not Loading
- Verify `component-loader.js` is accessible
- Check component paths in console
- Ensure files exist with correct case

#### White Screen / Blank Page
1. Open browser console (F12)
2. Visit `/diagnostic.html` to run tests
3. Verify all CSS/JS files are loading

## 📊 SEO Features

- Meta tags (description, keywords, robots)
- Open Graph & Twitter Card tags
- JSON-LD structured data
- Sitemap.xml & Robots.txt
- Canonical URLs

## 🔒 Security

Headers configured in `vercel.json`:
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection: 1; mode=block

## 📧 Support

- Discord: [Join our community](https://discord.gg/zjsPBXfFX7)
- YouTube: [@PlayAscendria](https://youtube.com/@PlayAscendria)

## 📄 License

Copyright © 2025 Ascendria Team. All rights reserved.
