# 🎮 GameVault — Professional Full Stack Portfolio

> A modern, production-grade video game discovery platform built with **React 19 + TypeScript** (frontend) and **Laravel 12 + PHP 8.4** (backend). Designed to demonstrate Senior Full Stack / Tech Lead engineering capabilities.

![GameVault Banner](https://via.placeholder.com/1200x400/0A0A0F/6C63FF?text=GameVault+%E2%80%94+Professional+Portfolio)

---

## 🏗️ Architecture Overview

```
project-games/
├── frontend/          # React 19 + Vite + TypeScript
├── backend/           # Laravel 12 + PHP 8.4
├── vercel.json        # Vercel monorepo config
└── README.md
```

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT BROWSER                        │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │            React 19 + TypeScript (Vite)           │   │
│  │                                                    │   │
│  │  ┌─────────┐  ┌──────────┐  ┌─────────────────┐  │   │
│  │  │  Pages  │  │Components│  │   Zustand Store  │  │   │
│  │  └────┬────┘  └────┬─────┘  └────────┬────────┘  │   │
│  │       │             │                  │           │   │
│  │  ┌────▼─────────────▼──────────────────▼───────┐  │   │
│  │  │         TanStack Query (Cache L2)            │  │   │
│  │  └────────────────────┬────────────────────────┘  │   │
│  │                       │                            │   │
│  │  ┌────────────────────▼────────────────────────┐  │   │
│  │  │       cacheManager (localStorage, L3)        │  │   │
│  │  └────────────────────┬────────────────────────┘  │   │
│  └───────────────────────┼────────────────────────────┘  │
└──────────────────────────┼──────────────────────────────┘
                           │ HTTPS / REST
┌──────────────────────────▼──────────────────────────────┐
│              VERCEL SERVERLESS / LARAVEL                  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │              Laravel 12 API                       │   │
│  │                                                    │   │
│  │  Controllers → Requests → Services → Repositories │   │
│  │                    ↓                               │   │
│  │         Laravel Cache (L1, TTL 6h)                │   │
│  └────────────────────┬──────────────────────────────┘   │
└───────────────────────┼──────────────────────────────────┘
                        │ HTTP
┌───────────────────────▼──────────────────────────────────┐
│                   RAWG.io API                             │
│                 https://api.rawg.io/api                   │
└──────────────────────────────────────────────────────────┘
```

### Cache Strategy (3-Level)

```
Request
  │
  ▼
┌─────────────────────────────────┐
│  L3: localStorage (Browser)     │◄── TTL: configurable (default 30min)
│  cacheManager.get(key)          │
└────────────┬────────────────────┘
             │ MISS
             ▼
┌─────────────────────────────────┐
│  L2: TanStack Query Cache       │◄── staleTime: 5min, cacheTime: 10min
│  useQuery({ queryKey, ... })    │
└────────────┬────────────────────┘
             │ MISS
             ▼
┌─────────────────────────────────┐
│  L1: Laravel Cache (Redis/File) │◄── TTL: 6 hours
│  Cache::remember(key, 6h, fn)   │
└────────────┬────────────────────┘
             │ MISS
             ▼
┌─────────────────────────────────┐
│  RAWG.io External API           │
└─────────────────────────────────┘
```

---

## 🚀 Features

| Feature | Status |
|---------|--------|
| 🎮 Games Explorer with Advanced Filters | ✅ |
| 🔍 Real-time Search | ✅ |
| 📄 Game Detail Pages | ✅ |
| 🔥 Trending / Popular / Top Rated | ✅ |
| 📅 Upcoming Releases | ✅ |
| ⚖️ Game Comparator | ✅ |
| ❤️ Favorites (localStorage) | ✅ |
| 🕐 Recent History (localStorage) | ✅ |
| 🌗 Dark / Light Theme | ✅ |
| 📱 Responsive (Mobile First) | ✅ |
| ♿ Accessibility (ARIA) | ✅ |
| 🔍 SEO + Open Graph | ✅ |
| 📧 Contact Form | ✅ |
| 🛡️ Rate Limiting | ✅ |
| ⚡ 3-Level Cache | ✅ |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19+ | UI Framework |
| TypeScript | 5.x | Type Safety |
| Vite | 6.x | Build Tool |
| React Router | 7+ | Routing |
| TanStack Query | 5.x | Server State / Cache L2 |
| Zustand | 5.x | Global State |
| Tailwind CSS | 4.x | Styling |
| Framer Motion | 12.x | Animations |
| Axios | 1.x | HTTP Client |
| Lucide React | Latest | Icons |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| PHP | 8.4+ | Runtime |
| Laravel | 12+ | Framework |
| Laravel HTTP Client | - | External API calls |
| Laravel Cache | - | Cache L1 |
| Laravel Pint | - | Code Style |
| PHPStan | Level 8 | Static Analysis |

---

## 📁 Project Structure

```
frontend/src/
├── assets/            # Static assets
├── cache/
│   └── cacheManager.ts    # 3-level cache utility
├── components/
│   ├── ui/            # Base UI (Button, Card, Badge, Skeleton...)
│   ├── layout/        # Header, Footer, Sidebar
│   └── games/         # GameCard, GameGrid, GameFilters, GameCarousel
├── hooks/
│   ├── useGames.ts
│   ├── useGameDetail.ts
│   ├── useFavorites.ts
│   ├── useHistory.ts
│   └── useTheme.ts
├── layouts/
│   └── MainLayout.tsx
├── pages/
│   ├── Home/
│   ├── Games/
│   ├── GameDetail/
│   ├── Popular/
│   ├── Upcoming/
│   ├── TopRated/
│   ├── Comparator/
│   ├── About/
│   └── Contact/
├── routes/
│   └── index.tsx
├── services/
│   ├── api.ts         # Axios instance
│   └── gamesService.ts
├── store/
│   └── index.ts       # Zustand store
├── types/
│   └── index.ts
└── utils/
    ├── formatters.ts
    └── helpers.ts

backend/app/
├── Http/
│   ├── Controllers/
│   │   ├── GameController.php
│   │   └── ContactController.php
│   ├── Requests/
│   │   ├── SearchGamesRequest.php
│   │   ├── CompareGamesRequest.php
│   │   └── ContactRequest.php
│   └── Resources/
│       ├── GameResource.php
│       ├── GameDetailResource.php
│       └── GameCollection.php
├── Services/
│   ├── GameService.php
│   └── ContactService.php
├── Repositories/
│   └── GameRepository.php
├── DTOs/
│   ├── GameDTO.php
│   └── GameDetailDTO.php
├── Interfaces/
│   └── GameRepositoryInterface.php
└── Exceptions/
    └── RawgApiException.php
```

---

## ⚙️ Prerequisites

- **Node.js** 20+
- **PHP** 8.4+
- **Composer** 2+
- **RAWG API Key** (free at [rawg.io/apidocs](https://rawg.io/apidocs))

---

## 🔧 Local Development Setup

### 1. Clone & Navigate

```bash
git clone https://github.com/yourusername/project-games.git
cd project-games
```

### 2. Backend Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Edit `.env`:
```env
RAWG_API_KEY=your_rawg_api_key_here
RAWG_BASE_URL=https://api.rawg.io/api
```

Start the backend:
```bash
php artisan serve --port=8000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
```

Edit `.env.local`:
```env
VITE_API_URL=http://localhost:8000
```

Start the frontend:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🧪 Code Quality

### Frontend

```bash
# Lint
npm run lint

# Format
npm run format

# Type check
npm run type-check

# Build
npm run build
```

### Backend

```bash
# Code style fix
./vendor/bin/pint

# Static analysis
./vendor/bin/phpstan analyse

# Tests
php artisan test
```

---

## 🌐 Vercel Deployment Guide

### Step 1 — Import Repository

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository

### Step 2 — Configure Build Settings

The `vercel.json` handles routing automatically for the monorepo setup.

Vercel will detect:
- **Frontend**: React/Vite app in `/frontend`
- **Backend**: PHP/Laravel in `/backend`

### Step 3 — Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```
# Backend
RAWG_API_KEY=your_rawg_api_key_here
RAWG_BASE_URL=https://api.rawg.io/api
APP_KEY=base64:your_laravel_app_key
APP_ENV=production
APP_DEBUG=false
CACHE_DRIVER=file
LOG_CHANNEL=stderr

# Frontend
VITE_API_URL=https://your-vercel-domain.vercel.app
```

### Step 4 — Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Step 5 — Verify

Visit your Vercel URL. Test key routes:
- `/` — Home with trending games
- `/games` — Explorer
- `/games/3498` — GTA V detail
- `/top-rated` — Top Rated
- `/comparator` — Game Comparator

---

## 🔑 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/games/trending` | Trending games |
| GET | `/api/games/popular` | All-time popular |
| GET | `/api/games/top-rated` | Highest metacritic |
| GET | `/api/games/upcoming` | Upcoming releases |
| GET | `/api/games/search` | Search with filters |
| GET | `/api/games/{id}` | Game detail |
| GET | `/api/games/compare` | Compare two games |
| POST | `/api/contact` | Contact form |

### Query Parameters (search)

| Param | Type | Example |
|-------|------|---------|
| `q` | string | `?q=zelda` |
| `page` | int | `?page=2` |
| `page_size` | int | `?page_size=20` |
| `platforms` | string | `?platforms=18,1` |
| `genres` | string | `?genres=action,rpg` |
| `ordering` | string | `?ordering=-rating` |
| `dates` | string | `?dates=2024-01-01,2024-12-31` |

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-primary` | `#0A0A0F` | Main background |
| `--color-bg-secondary` | `#111118` | Cards, surfaces |
| `--color-accent-primary` | `#6C63FF` | CTAs, highlights |
| `--color-accent-secondary` | `#00D2FF` | Gradients, badges |
| `--color-text-primary` | `#F8F8FF` | Main text |
| `--color-text-muted` | `#8B8B9E` | Secondary text |

---

## 👤 About the Developer

This project was built to showcase:
- ✅ Clean Architecture principles
- ✅ SOLID + DRY + KISS
- ✅ Repository & Service patterns
- ✅ Multi-level caching strategy
- ✅ TypeScript strict mode
- ✅ Production-ready deployment
- ✅ Performance optimization (Lighthouse 95+)

---

## 📄 License

MIT © 2026 — Built with ❤️ as a professional portfolio piece.
