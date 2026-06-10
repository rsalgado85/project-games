#!/usr/bin/env sh
set -e

APP_PORT="${APP_PORT:-9000}"

if [ ! -f /var/www/backend/.env ] && [ -f /var/www/backend/.env.docker ]; then
  cp /var/www/backend/.env.docker /var/www/backend/.env
fi

mkdir -p /var/www/backend/storage/framework/cache \
  /var/www/backend/storage/framework/sessions \
  /var/www/backend/storage/framework/views \
  /var/www/backend/storage/logs \
  /var/www/backend/bootstrap/cache \
  /var/www/backend/database

touch /var/www/backend/database/database.sqlite

echo "Starting GameVault backend on port ${APP_PORT}"
exec php -S 0.0.0.0:"${APP_PORT}" -t public public/index.php
