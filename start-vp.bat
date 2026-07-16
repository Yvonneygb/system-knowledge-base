@echo off
cd /d C:\Users\ARROW\.qclaw\workspace\kb\docs
start /B npx vitepress dev --port 5174 --host 0.0.0.0
timeout /t 5 /nobreak >nul
tasklist /FI "IMAGENAME eq node.exe"
