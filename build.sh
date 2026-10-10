#!/usr/bin/env bash
set -euo pipefail

mkdir -p dist
cp index.html dist/index.html

echo "Cloudflare Pages output prepared in dist/"
