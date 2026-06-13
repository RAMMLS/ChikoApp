#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MODE="${1:-preview}"

cd "$ROOT_DIR"

if ! command -v npm >/dev/null 2>&1; then
  echo "Ошибка: npm не найден. Установи Node.js 20+ и повтори."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Устанавливаю зависимости..."
  npm ci
fi

echo "Проверяю production-сборку..."
npm run build

VERCEL_ARGS=()

case "$MODE" in
  preview)
    echo "Запускаю preview deployment в Vercel..."
    ;;
  prod|production)
    echo "Запускаю production deployment в Vercel..."
    VERCEL_ARGS+=(--prod)
    ;;
  *)
    echo "Неизвестный режим: $MODE"
    echo "Использование: ./deploy-vercel.sh [preview|prod]"
    exit 1
    ;;
esac

if [ ! -f .vercel/project.json ]; then
  echo "Проект еще не привязан к Vercel. CLI попросит выполнить login/link."
fi

npx vercel@latest "${VERCEL_ARGS[@]}"
