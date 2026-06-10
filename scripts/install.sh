#!/usr/bin/env bash

# ============================================================
# GameVault — Full Installation Script
# ============================================================

set -e

echo "🎮 GameVault — Full Stack Setup"
echo "================================"

# ── Frontend ──────────────────────────────────────────────────
echo ""
echo "📦 Installing frontend dependencies..."
cd frontend
npm install

if [ ! -f ".env.local" ]; then
  cp .env.example .env.local
  echo "✅ Created frontend/.env.local from example"
fi

echo "✅ Frontend dependencies installed"

# ── Backend ───────────────────────────────────────────────────
echo ""
echo "🐘 Installing backend dependencies..."
cd ../backend
composer install

if [ ! -f ".env" ]; then
  cp .env.example .env
  php artisan key:generate --ansi
  echo "✅ Created backend/.env and generated APP_KEY"
fi

echo ""
echo "⚠️  IMPORTANT: Update backend/.env with your RAWG API key:"
echo "   RAWG_API_KEY=your_key_here"
echo ""
echo "   Get a free key at: https://rawg.io/apidocs"
echo ""
echo "✅ Backend dependencies installed"

# ── Done ──────────────────────────────────────────────────────
echo ""
echo "🚀 Setup complete! Run the following to start:"
echo ""
echo "   Terminal 1 (Backend):  cd backend && php artisan serve"
echo "   Terminal 2 (Frontend): cd frontend && npm run dev"
echo ""
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:8000"
