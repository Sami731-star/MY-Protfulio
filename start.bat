@echo off
title Oakimul Sami Portfolio Dev Server
color 0B
echo ========================================================
echo   OAKIMUL SAMI PORTFOLIO - LOCALHOST LAUNCHER
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/3] Checking dependencies...
if not exist node_modules (
    echo [INFO] Installing required packages...
    call npm install
    if errorlevel 1 (
        echo [ERROR] npm install failed. Please make sure Node.js is installed.
        pause
        exit /b 1
    )
)

echo [2/3] Starting server on http://localhost:3000 ...
start "" http://localhost:3000

echo [3/3] Running localhost server...
call npx tsx server.ts

if errorlevel 1 (
    echo.
    echo [FALLBACK] Trying alternative launcher...
    call npm run dev
)

pause
