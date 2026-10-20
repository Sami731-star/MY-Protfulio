#!/usr/bin/env bash
# Oakimul Sami Portfolio Local Launcher

cd "$(dirname "$0")"

echo "========================================================"
echo "  OAKIMUL SAMI PORTFOLIO - LOCALHOST LAUNCHER"
echo "========================================================"
echo ""

if [ ! -d "node_modules" ]; then
    echo "[INFO] First time setup: Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "[ERROR] Failed to install packages."
        exit 1
    fi
    echo "[INFO] Dependencies installed successfully!"
    echo ""
fi

echo "[INFO] Starting server on http://localhost:3000 ..."
npm run dev
