#!/usr/bin/env bash
set -e

echo "Stopping and removing GameVault containers..."
docker compose --env-file .env.docker down --remove-orphans

echo "Done"
