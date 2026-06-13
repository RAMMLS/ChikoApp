# ChikoApp
Визуально выверенное PWA-приложение для Chiko на Next.js и TypeScript.

## Стек

- Next.js 15
- TypeScript
- Tailwind CSS
- Docker / Docker Compose

## Запуск локально

```bash
npm install
npm run dev
```

## Запуск в одну команду

```bash
docker compose up -d --build
```

После запуска приложение доступно на `http://localhost:3000`.

## Деплой

- Vercel: проект собирается стандартной командой `npm run build`
- Docker: используется production-сборка через standalone output
