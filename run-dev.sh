#!/usr/bin/env bash
# Wrapper to run dev server with Node 18
# Usage: ./run-dev.sh
# If you get esbuild platform errors, run: rm -rf node_modules && npm install
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
cd "$(dirname "$0")"

# Use Node 18 (nvm exec or nvm use)
nvm use 18 2>/dev/null || nvm use 2>/dev/null || true
exec node ./node_modules/vite/bin/vite.js
