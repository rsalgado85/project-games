#!/usr/bin/env bash
set -e

[ -f .env.docker ] || cp .env.docker.example .env.docker
[ -f backend/.env.docker ] || cp backend/.env.docker.example backend/.env.docker
[ -f frontend/.env.docker ] || cp frontend/.env.docker.example frontend/.env.docker

echo "Building and starting GameVault containers..."
docker compose --env-file .env.docker up -d --build

echo "Done"
echo "Frontend: http://localhost:15173"
echo "Backend:  http://localhost:19090"
