@echo off
REM AI-Powered Predictive Dashboard - Startup Script
REM This script starts both backend and frontend servers

echo.
echo ========================================
echo AI-Powered Predictive Dashboard
echo ========================================
echo.
echo Starting backend server on port 5000...
echo Starting frontend server on port 3000...
echo.

REM Start backend in a new window
start "Backend Server" cmd /k "cd backend && node server.js"

REM Wait 2 seconds for backend to start
timeout /t 2 /nobreak

REM Start frontend in a new window
start "Frontend Server" cmd /k "cd frontend && npm start"

echo.
echo ========================================
echo Servers started!
echo ========================================
echo.
echo Backend:  http://localhost:5000/api
echo Frontend: http://localhost:3000
echo.
echo Press Ctrl+C in either window to stop.
echo.
pause
