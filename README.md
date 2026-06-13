# ChikoApp
Визуально выверенное PWA-приложение для Chiko на Next.js и TypeScript.

## Стек

- Next.js 15
- TypeScript
- Tailwind CSS
- Vercel CLI deployment

## Запуск локально

```bash
npm install
npm run dev
```

## Деплой на Vercel

```bash
npm run deploy:vercel
```

Для production-деплоя:

```bash
npm run deploy:vercel:prod
```

Что делает скрипт:

- при отсутствии `node_modules` выполняет `npm ci`
- проверяет production-сборку через `npm run build`
- запускает `npx vercel@latest`
- при первом запуске попросит выполнить `login` и `link`
- если скрипт случайно запускается внутри самой среды Vercel, он не вызывает `vercel` повторно

Локальный production preview при необходимости:

```bash
npm run build
npm run start
```

Можно вызвать скрипт напрямую:

```bash
./deploy-vercel.sh preview
./deploy-vercel.sh prod
```

## Настройки Vercel

- `Build Command`: `npm run build`
- `Install Command`: `npm ci`
- если в проекте Vercel сейчас указан `chmod +x deploy-vercel.sh && ./deploy-vercel.sh`, это нужно убрать
- в репозитории уже добавлен `vercel.json`, который фиксирует корректный build-сценарий
