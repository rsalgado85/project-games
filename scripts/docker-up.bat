@echo off
setlocal

if not exist ".env.docker" copy ".env.docker.example" ".env.docker"
if not exist "backend\.env.docker" copy "backend\.env.docker.example" "backend\.env.docker"
if not exist "frontend\.env.docker" copy "frontend\.env.docker.example" "frontend\.env.docker"

echo.
echo Building and starting GameVault containers...
docker compose --env-file .env.docker up -d --build

echo.
echo Done.
echo Frontend: http://localhost:15173
echo Backend:  http://localhost:19090

echo.
endlocal
