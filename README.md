# As Estações do Coração — Lorrane Fernandes

Site literário de Lorrane Fernandes, reunindo *Versos de Mim*, *As Estações do Coração* e a galeria de personagens de *As Coisas que Deixamos no Inverno*.

## O site

- Apresentação de *Versos de Mim* com link para a UICLAP.
- Seções sobre os romances, as quatro estações e a Irlanda.
- Galeria com os personagens de *As Coisas que Deixamos no Inverno*.
- Layout responsivo, navegação para celular e HTML, CSS e JavaScript em um único arquivo.

## Publicar no Cloudflare Pages

Este repositório está preparado como site HTML estático, sem framework ou dependências.

Na criação do projeto Cloudflare Pages, use:

- Production branch: `main`
- Root directory: `/` (raiz do repositório)
- Build command: `bash ./build.sh`
- Build output directory: `dist`
- Framework preset: `None`

O script prepara `dist/index.html` e copia as imagens de `assets/characters/` para `dist/assets/characters/`. O Pages serve a página principal e suas imagens a partir dessa pasta.

Guia oficial: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/

## Visualizar localmente

Abra `index.html` no navegador ou execute `bash ./build.sh` para gerar os arquivos de publicação em `dist/`.
