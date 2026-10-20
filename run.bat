@echo off
rem Allows typing just "npm" or "npm start" inside the project folder
if "%1"=="" (
    call npm start
) else (
    call npm %*
)
