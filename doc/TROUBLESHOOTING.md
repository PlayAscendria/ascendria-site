# 🚨 Guia Rápido de Troubleshooting - Vercel

## Problema: Site não está carregando na Vercel

### Passo 1: Acesse a Página de Diagnóstico
```
https://seu-dominio.vercel.app/diagnostic.html
```

### Passo 2: Execute o Diagnóstico Completo
1. Clique em "Run Full Diagnostic"
2. Aguarde os resultados
3. Copie o relatório completo

### Passo 3: Identifique Erros Comuns

#### ❌ Erro 404 em Components
**Sintoma**: `❌ /components/topbar/TopBar.html: Failed (404)`

**Solução**:
1. Verifique se os arquivos existem no repositório
2. Confirme que o case do nome está correto (TopBar vs topbar)
3. Verifique o `.vercelignore` - pode estar excluindo componentes

#### ❌ Erro CORS
**Sintoma**: `Access to fetch blocked by CORS policy`

**Solução**:
1. Isso não deve acontecer na Vercel (mesma origem)
2. Se ocorrer, adicione headers no `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/components/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" }
      ]
    }
  ]
}
```

#### ❌ JavaScript não carrega
**Sintoma**: `component-loader.js` falha

**Causas Possíveis**:
1. Caminho errado no HTML
2. Arquivo não commitado no git
3. Vercel não fez build correto

**Solução**:
```bash
# Verifique se o arquivo existe
git ls-files | grep component-loader.js

# Se não existir, adicione e commit
git add js/component-loader.js
git commit -m "fix: add missing component-loader.js"
git push origin main
```

#### ❌ CSS não está aplicado
**Sintoma**: Página sem estilo

**Solução**:
1. Verifique os links no `<head>`
2. Confirme que os caminhos começam com `/` para absolutos
3. Teste localmente primeiro

### Passo 4: Verifique o Console do Browser

Abra DevTools (F12) e procure por:
- ❌ Erros em vermelho
- ⚠️ Warnings em amarelo
- 🔵 Logs informativos

### Passo 5: Verifique Logs da Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Vá em seu projeto
3. Clique na última deployment
4. Veja "Build Logs" e "Runtime Logs"

### Passo 6: Force Redeploy

Se tudo estiver correto mas ainda não funciona:

1. Na Vercel Dashboard:
   - Vá em "Deployments"
   - Clique nos 3 pontos da última deployment
   - Selecione "Redeploy"

2. Ou via Git:
```bash
git commit --allow-empty -m "chore: trigger redeploy"
git push origin main
```

## 🔍 Checklist de Verificação Rápida

- [ ] Todos os arquivos estão commitados no git
- [ ] Nomes de arquivos têm o case correto
- [ ] Paths nos HTMLs começam com `/` para absolutos
- [ ] `vercel.json` está válido (use jsonlint)
- [ ] Não há erros no console do browser
- [ ] GitHub Actions passou (veja badge no repo)
- [ ] Testou localmente antes do deploy

## 🆘 Ainda com Problemas?

1. **Teste Local Primeiro**:
```bash
python -m http.server 8000
# Abra http://localhost:8000
```

2. **Compare Local vs Vercel**:
   - Se funciona local mas não na Vercel = problema de deploy
   - Se não funciona em nenhum = problema no código

3. **Verifique GitHub Actions**:
   - Vá em "Actions" no GitHub
   - Veja se o workflow passou
   - Leia os logs de erro

4. **Debug Step-by-Step**:
   - Comente o código aos poucos
   - Identifique qual parte está quebrando
   - Conserte essa parte específica

## 📞 Contato

Se nada funcionar, compartilhe:
1. URL da página de diagnóstico
2. Screenshot do console (F12)
3. Link para o último commit
4. Logs da Vercel

---
**Última atualização**: 30/11/2025

