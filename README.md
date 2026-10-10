# As Estações do Coração — Lorrane Fernandes

Site literário de Lorrane Fernandes, reunindo *Versos de Mim*, *As Estações do Coração* e a galeria de personagens de *As Coisas que Deixamos no Inverno*.

## O site

- Apresentação de *Versos de Mim* com link para a UICLAP.
- Seções sobre os romances, as quatro estações e a Irlanda.
- Galeria com os personagens de *As Coisas que Deixamos no Inverno*.
- Layout responsivo, navegação para celular e HTML, CSS e JavaScript em um único arquivo.

## Publicar no Cloudflare Workers

O arquivo `wrangler.jsonc` configura o site como um Worker de arquivos estáticos, compatível com o endereço `*.workers.dev`.

Para publicar a partir de um computador autenticado na sua conta Cloudflare:

1. Execute `npx wrangler login` para autenticar.
2. Execute `bash ./build.sh` para preparar `dist/`.
3. Execute `npx wrangler deploy` para atualizar o Worker `versos-de-mim`.

O script prepara `dist/index.html` e copia as imagens de `assets/characters/` para `dist/assets/characters/`. O Worker serve a página principal e suas imagens a partir dessa pasta.

Guia oficial: https://developers.cloudflare.com/workers/static-assets/get-started/

## Visualizar localmente

Abra `index.html` no navegador ou execute `bash ./build.sh` para gerar os arquivos de publicação em `dist/`.
