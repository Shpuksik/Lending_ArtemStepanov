# Cloudflare Pages GitHub Deploy

Реальный Linux-путь проекта:

```text
/home/momot/sites/Lending_ArtemStepanov
```

## Проверка build на сервере

Все команды выполнять в реальной Linux-папке проекта на сервере:

```bash
cd /home/momot/sites/Lending_ArtemStepanov
npm install
npm run build
npm run preview
```

`npm run build` должен создать папку `dist/` и файл `dist/index.html`.

## Что публикуется через GitHub

В GitHub публикуются исходники проекта:

- `package.json`
- `package-lock.json`
- `astro.config.mjs`
- `tailwind.config.mjs`
- `tsconfig.json`
- `.nvmrc`
- `src/`
- `docs/`
- `.gitignore`

Папка `dist/` не коммитится. Cloudflare Pages сам установит зависимости и соберет production output командой `npm run build`.

Не коммитятся:

- `node_modules/`
- `dist/`
- `.astro/`
- `.env`
- `.env.*`
- временные `*.log`

## Настройки Cloudflare Pages

- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: оставить пустым, если проект находится в корне репозитория.
- Production branch: `main` или текущая основная ветка проекта.

Домен и DNS подключаются отдельным шагом после проверки деплоя. Не менять DNS и не подключать домен без отдельного подтверждения.

## Перед публичным релизом

Проверить и при необходимости заменить:

- телефон;
- Telegram;
- MAX;
- OG image;
- домен.

## Cloudflare UI

1. Открыть Cloudflare Dashboard.
2. Перейти в `Workers & Pages`.
3. Нажать `Create application`.
4. Выбрать `Pages`.
5. Нажать `Connect to Git`.
6. Выбрать GitHub.
7. Выбрать репозиторий проекта.
8. Указать `Framework preset: Astro`.
9. Указать `Build command: npm run build`.
10. Указать `Build output directory: dist`.
11. Указать `Production branch: main` или текущую основную ветку.
12. Нажать `Save and Deploy`.
