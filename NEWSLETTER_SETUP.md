# Configuração da newsletter no Cloudflare

O formulário só aceita inscrições depois que as quatro configurações abaixo estiverem definidas. Assim, visitantes não recebem uma falsa confirmação enquanto a integração estiver desligada.

1. No Cloudflare, crie um widget Turnstile do tipo **Managed** e autorize o hostname `versos-de-mim.lofernandes2006.workers.dev`. Copie as chaves Site key e Secret key.
2. Na Brevo, crie ou escolha a lista de contatos da newsletter e copie o ID numérico da lista. Crie também uma chave de API com acesso a contatos.
3. No diretório do projeto, execute no PowerShell:

   ```powershell
   npx wrangler secret put TURNSTILE_SITE_KEY
   npx wrangler secret put TURNSTILE_SECRET_KEY
   npx wrangler secret put BREVO_API_KEY
   npx wrangler secret put BREVO_LIST_ID
   ```

   Cole o valor correspondente quando cada comando pedir. A Site key é pública para o navegador, mas é mantida como secret no Worker e entregue apenas pelo endpoint `/api/config`.
4. Publique com `npx wrangler deploy`, ou envie os arquivos para o branch conectado ao Cloudflare Workers Builds. O endpoint `POST /api/subscribe` valida origem, endereço, consentimento e Turnstile antes de adicionar o contato à lista da Brevo.
5. Teste com um e-mail seu e remova o contato de teste da lista depois.

Não cole chaves em `index.html`, em variáveis do GitHub ou em arquivos commitados. A lista só deve receber pessoas que marcaram o consentimento no formulário; inclua o link de descadastro nas campanhas enviadas pela Brevo.
