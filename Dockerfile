FROM php:8.2-cli

# 必要なPHP拡張をインストール
RUN apt-get update && apt-get install -y \
    unzip \
    curl \
    git \
    libsqlite3-dev \
    nodejs \
    npm \
    && docker-php-ext-install pdo pdo_sqlite \
    && rm -rf /var/lib/apt/lists/*

# Composerをインストール
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

# 依存関係インストール＆ビルド
RUN composer install --optimize-autoloader --no-dev
RUN npm install && npm run build

# Laravelの最適化
RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan view:cache

# SQLiteファイル作成
RUN touch database/database.sqlite

# storage/logsの権限設定
RUN chmod -R 775 storage bootstrap/cache

EXPOSE 10000

CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=10000
