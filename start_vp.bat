@echo off
cd /d C:\Users\ARROW\.qclaw\workspace\kb
npx vitepress dev docs --port 5174 --host 0.0.0.0 > C:\Users\ARROW\.qclaw\workspace\vp_output.txt 2> C:\Users\ARROW\.qclaw\workspace\vp_errors.txt
