@echo off
REM ============================================================
REM GameVault — Windows Installation Script
REM ============================================================

echo.
echo 🎮 GameVault — Full Stack Setup
echo ================================

echo.
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
if not exist ".env.local" (
    copy .env.example .env.local
    echo ✅ Created frontend\.env.local from example
)
echo ✅ Frontend dependencies installed

echo.
echo 🐘 Installing backend dependencies...
cd ..\backend
call composer install
if not exist ".env" (
    copy .env.example .env
    php artisan key:generate --ansi
    echo ✅ Created backend\.env and generated APP_KEY
)

echo.
echo ⚠️  IMPORTANT: Update backend\.env with your RAWG API key:
echo    RAWG_API_KEY=your_key_here
echo.
echo    Get a free key at: https://rawg.io/apidocs
echo.
echo ✅ Backend dependencies installed

echo.
echo 🚀 Setup complete! Open TWO terminals and run:
echo.
echo    Terminal 1 (Backend):  cd backend ^&^& php artisan serve
echo    Terminal 2 (Frontend): cd frontend ^&^& npm run dev
echo.
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:8000
echo.

pause
