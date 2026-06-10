FROM composer:2.8 AS vendor
WORKDIR /var/www/backend

COPY composer.json ./
RUN composer install --no-dev --prefer-dist --no-interaction --no-scripts --ignore-platform-reqs

FROM php:8.4-cli-alpine AS runtime
WORKDIR /var/www/backend

RUN apk add --no-cache bash curl wget oniguruma-dev sqlite-dev \
    && docker-php-ext-install mbstring bcmath pdo pdo_sqlite

COPY --from=vendor /var/www/backend/vendor ./vendor
COPY . .

RUN mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache database \
    && touch database/database.sqlite

COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 9000

ENTRYPOINT ["/entrypoint.sh"]
