#!/bin/sh
set -e

cd frontend
npm install --legacy-peer-deps

cd ../backend
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php --install-dir=. --filename=composer
php composer install --no-dev --prefer-dist --no-interaction --ignore-platform-reqs
