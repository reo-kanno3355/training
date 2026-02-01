#!/usr/bin/env bash
set -e

# PHP依存関係インストール
composer install --optimize-autoloader --no-dev

# Node依存関係インストール＆ビルド
npm install
npm run build

# Laravelの最適化
php artisan config:cache
php artisan route:cache
php artisan view:cache

# SQLiteファイルの作成とマイグレーション
touch database/database.sqlite
php artisan migrate --force
