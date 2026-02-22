@echo off
echo Starting AutoPart-Connect...

REM Start Backend (Port 5000)
start "Backend Server" cmd /k "npm run dev"

REM Start Frontend (Port 5173)
start "Frontend App" cmd /k "cd client && npm run dev"

echo Servers starting in new windows...
