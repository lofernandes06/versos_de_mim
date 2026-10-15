# Lorrane Fernandes — site literário

Site de autora para apresentar *Versos de Mim* e acompanhar os projetos de romance *As Estações do Coração* e *As Coisas que Deixamos no Inverno*.

## O que há no site

- CTA de compra para a UICLAP e convite para a lista de novidades.
- Ficha do livro, amostra de poemas e espaços editáveis para resenhas autorizadas.
- Apresentação dos romances e percurso narrativo pelas quatro estações.
- Galeria dos personagens, mapa inicial de núcleos familiares e ambientação na Irlanda.
- Formulário de interesse com consentimento. Para receber inscrições, conecte-o a uma plataforma de e-mail.
- HTML, CSS e JavaScript em `index.html`; recursos de SEO em `robots.txt` e `sitemap.xml`.

O retrato de Lorrane Fernandes foi fornecido pela autora. Os poemas da página são textos de demonstração e devem ser substituídos por poemas autorizados antes da publicação editorial definitiva.

## Publicação automática pelo GitHub

Para publicar cada atualização enviada à branch `main`, conecte o Worker existente ao repositório pelo painel Cloudflare:

1. Abra **Workers & Pages** e selecione o Worker `versos-de-mim`.
2. Vá em **Settings > Builds > Connect** e conecte `lofernandes06/versos_de_mim`.
3. Autorize a integração GitHub do Cloudflare para esse repositório.
4. Configure a branch de produção como `main`, diretório raiz como `/`, comando de build como `bash ./build.sh` e comando de deploy como `npx wrangler deploy`.

O nome do Worker já corresponde ao campo `name` de `wrangler.jsonc`. Depois de salvar a conexão, cada push à branch `main` aciona o build e deploy automaticamente. O comando manual abaixo continua disponível como alternativa.

## Publicar no Cloudflare Workers

O `wrangler.jsonc` configura o Worker `versos-de-mim` para servir os arquivos em `dist/`.

No Windows PowerShell, dentro da pasta do projeto:

```powershell
npx wrangler login
Invoke-WebRequest "https://raw.githubusercontent.com/lofernandes06/versos_de_mim/main/index.html" -OutFile ".\index.html"
New-Item -ItemType Directory -Force .\assets | Out-Null
Invoke-WebRequest "https://raw.githubusercontent.com/lofernandes06/versos_de_mim/main/assets/lorrane-fernandes.webp" -OutFile ".\assets\lorrane-fernandes.webp"
Remove-Item .\dist -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force .\dist | Out-Null
Copy-Item .\index.html, .\robots.txt, .\sitemap.xml .\dist\ -Force
Copy-Item .\assets .\dist\ -Recurse -Force
npx wrangler deploy
```

No macOS, Linux ou Git Bash:

```bash
bash ./build.sh
npx wrangler deploy
```

O deploy atualiza o Worker público. Não publique até copiar para a pasta local as alterações mais recentes do repositório.

## Ver localmente

Abra `index.html` no navegador. As imagens ficam em `assets/`.
