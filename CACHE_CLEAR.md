# Como Limpar Cache e Resolver Erros

Se você está vendo erros de sintaxe no console, siga estes passos:

## 1. Limpar Cache do Navegador

### Chrome/Edge:
1. Pressione `Ctrl + Shift + Delete`
2. Selecione "Imagens e arquivos em cache"
3. Selecione "Todo o período"
4. Clique em "Limpar dados"

### Ou use Hard Refresh:
- `Ctrl + Shift + R` (Windows/Linux)
- `Cmd + Shift + R` (Mac)

## 2. Desabilitar Service Worker (Temporariamente)

1. Abra DevTools (F12)
2. Vá para a aba "Application" (Chrome) ou "Storage" (Firefox)
3. Clique em "Service Workers" no menu lateral
4. Clique em "Unregister" para cada Service Worker registrado
5. Recarregue a página

## 3. Limpar Cache do Service Worker

1. Abra DevTools (F12)
2. Vá para "Application" > "Storage"
3. Clique em "Clear site data"
4. Recarregue a página

## 4. Verificar se há arquivos minificados

Se você executou `npm run build`, pode haver arquivos minificados na pasta `dist/` que estão sendo servidos. Certifique-se de que está servindo os arquivos da raiz do projeto, não da pasta `dist/`.

## 5. Verificar Console para Erros Específicos

Após limpar o cache, verifique o console novamente. Os erros devem desaparecer.

## Erros Conhecidos e Soluções

### "Unexpected identifier 'magic'"
- **Causa**: Cache do navegador com versão antiga/corrompida do arquivo
- **Solução**: Limpar cache (passos acima)

### "missing ) after argument list" no sw.js
- **Causa**: Service Worker em cache com versão antiga
- **Solução**: Desregistrar Service Worker e limpar cache

### "Failed to load Three.js"
- **Causa**: Problema de rede ou CSP bloqueando o CDN
- **Solução**: Verificar conexão e CSP headers

