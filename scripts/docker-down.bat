@echo off
setlocal

echo.
echo Stopping and removing GameVault containers...
docker compose --env-file .env.docker down --remove-orphans

echo.
echo Done.
echo.
endlocal
