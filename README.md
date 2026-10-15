# Lorrane Fernandes — site literário

Site de autora para apresentar *Versos de Mim* e acompanhar os romances *As Estações do Coração* e *As Coisas que Deixamos no Inverno*.

## Projeto

- Site em um único `index.html`, com CSS e JavaScript embutidos.
- Retratos dos personagens com fallback de monograma e mapa de relações.
- Política de Privacidade em `politica-de-privacidade.html`.
- `src/worker.js` serve os arquivos e recebe inscrições em `POST /api/subscribe`.
- Imagem social `assets/og-lorrane-fernandes.png` em 1200 × 630.
- `robots.txt` e `sitemap.xml` publicados na raiz.

Poemas, resenhas, número de páginas, ligação da Irlanda com a trama, relação entre Marina e Benício e e-mail profissional estão comentados no código para serem preenchidos com informações confirmadas e autorizadas.

## Newsletter

A inscrição usa Cloudflare Turnstile contra automação e envia o contato, depois do consentimento, à lista da Brevo. O Worker precisa das chaves `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `BREVO_API_KEY` e `BREVO_LIST_ID`. Siga [NEWSLETTER_SETUP.md](NEWSLETTER_SETUP.md) para configurar os segredos. Sem eles, o formulário informa que a lista ainda não está disponível e não simula uma inscrição.

## Publicação automática pelo GitHub

Quando o Worker estiver conectado ao Cloudflare Workers Builds, cada atualização enviada para `main` pode iniciar automaticamente o build e deploy. No painel Cloudflare, o projeto deve usar:

- Diretório raiz: `/`
- Comando de build: `bash ./build.sh`
- Comando de deploy: `npx wrangler deploy`

O `wrangler.jsonc` define `src/worker.js` como Worker e `dist/` como diretório de arquivos estáticos. O script de build prepara o HTML, a política, SEO e imagens nessa pasta.

## Publicação manual

Com Wrangler autenticado, em macOS, Linux ou Git Bash:

```bash
bash ./build.sh
npx wrangler deploy
```

No Windows PowerShell, dentro da pasta do projeto:

```powershell
Remove-Item .\dist -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force .\dist | Out-Null
Copy-Item .\index.html, .\politica-de-privacidade.html, .\robots.txt, .\sitemap.xml .\dist\ -Force
Copy-Item .\assets .\dist\ -Recurse -Force
npx wrangler deploy
```

## Verificar

Abra `index.html` no navegador ou execute `bash ./build.sh` e sirva a pasta `dist/` em um servidor local. O endpoint de newsletter depende das chaves da Cloudflare e da Brevo.
