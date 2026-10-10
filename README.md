# As Estações do Coração — Lorrane Fernandes

Site literário de Lorrane Fernandes, reunindo o livro de poemas *Versos de Mim* e o universo do romance *As Estações do Coração*.

## O site

- Apresentação de *Versos de Mim* com link para a UICLAP.
- Seções sobre o romance, as quatro estações e a Irlanda.
- Biografia da autora e link para o perfil literário.
- Layout responsivo, navegação para celular e HTML, CSS e JavaScript em um único arquivo.

## Publicar no Cloudflare Pages

Este repositório está preparado como site HTML estático, sem framework ou dependências.

Na criação do projeto Cloudflare Pages, use:

- Production branch: `main`
- Root directory: `/` (raiz do repositório)
- Build command: `bash ./build.sh`
- Build output directory: `dist`
- Framework preset: `None`

O script copia `index.html` para `dist/index.html`, a página principal que o Pages serve. O Cloudflare faz um novo build a cada atualização do branch conectado.

Guia oficial: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/

## Visualizar localmente

Abra `index.html` no navegador ou execute `bash ./build.sh` para gerar os arquivos de publicação em `dist/`.

A arte da capa no código é uma ilustração provisória. Substitua pela imagem oficial quando ela estiver disponível no repositório.
