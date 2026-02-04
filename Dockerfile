FROM php:8.4-cli

RUN apt-get update && apt-get install -y \
    unzip \
    curl \
    git \
    libsqlite3-dev \
    libzip-dev \
    libpng-dev \
    && docker-php-ext-install pdo pdo_sqlite zip \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --optimize-autoloader --no-dev --no-scripts

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

RUN touch database/database.sqlite \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 10000

CMD php artisan migrate --force \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache \
    && php artisan serve --host=0.0.0.0 --port=10000
