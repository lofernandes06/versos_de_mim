#!/usr/bin/env bash
set -euo pipefail

rm -rf dist
mkdir -p dist
cp index.html politica-de-privacidade.html robots.txt sitemap.xml dist/
if [[ -d assets ]]; then
  cp -R assets dist/assets
fi

echo "Cloudflare Workers assets prepared in dist/"
