# Deployment guide

## Что проверено локально

Проверка выполнялась на рабочей локальной копии проекта:

`C:\dev\Lending_ArtemStepanov`

Причина: на диске `M:` ранее возникала ошибка `EPERM: mkdir M:\sites\Lending_ArtemStepanov`, а сам диск может быть сетевым или виртуальным и ограничивать операции npm с большим количеством файлов.

Проверено:

- `package.json` существует и содержит скрипты `dev`, `start`, `build`, `preview`, `astro`.
- Структура `src` присутствует: `components`, `config`, `layouts`, `pages`, `styles`.
- Документы проекта существуют:
  - `docs/website-development-plan.md`
  - `docs/website-content-prototype.md`
  - `docs/website-visual-concept.md`
- `npm install` проходит на локальной копии на `C:`.
- `npm run build` создает статический сайт в `dist`.
- `npm run preview` отдает собранный сайт локально.
- FAQ реализован через нативные `details`/`summary`, без клиентского JS.
- React/Vue/Svelte и тяжелые JS-библиотеки в проект не добавлялись.

## Локальный запуск

Из корня проекта:

```powershell
npm install
npm run dev
```

Production build:

```powershell
npm run build
```

Preview production-сборки:

```powershell
npm run preview
```

## Если на диске M: возникает EPERM

Ошибка вида:

```text
EPERM: mkdir M:\sites\Lending_ArtemStepanov
```

обычно означает проблему не с кодом сайта, а с правами или особенностями файловой системы. Для npm это особенно заметно, потому что `node_modules` содержит много вложенных директорий, симлинков и мелких файлов.

## Рекомендованный workaround

Не удалять исходный проект на `M:`. Для разработки и сборки использовать локальную копию на `C:`.

```powershell
cd C:\
mkdir C:\dev -ErrorAction SilentlyContinue
robocopy M:\sites\Lending_ArtemStepanov C:\dev\Lending_ArtemStepanov /MIR /XD node_modules dist .astro
cd C:\dev\Lending_ArtemStepanov
npm install
npm run build
npm run preview
```

Рекомендация: не хранить `node_modules` на `M:`. Исходники можно держать на `M:`, но зависимости, `.astro` и `dist` лучше создавать в локальной рабочей копии на `C:`.

## Cloudflare Pages

Рекомендованный вариант для MVP: Cloudflare Pages.

Почему подходит:

- сайт статический;
- Astro собирает готовый `dist`;
- быстрый CDN подходит для QR-трафика;
- домен можно подключить позже, отдельным решением.

Настройки проекта в Cloudflare Pages:

- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: оставить пустым, если проект лежит в корне репозитория; если проект лежит в подпапке, указать эту подпапку.
- Node version: использовать актуальную LTS. В проект добавлен `.nvmrc` со значением `24`. При необходимости в Cloudflare Pages можно также указать переменную окружения `NODE_VERSION=24`.

Официальные ориентиры:

- Cloudflare Pages для Astro: https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
- Build configuration Cloudflare Pages: https://developers.cloudflare.com/pages/configuration/build-configuration/
- Build image и Node version: https://developers.cloudflare.com/pages/configuration/build-image/

## Vercel

Vercel можно использовать как быстрый zero-config вариант, если будет удобнее деплоить через Vercel.

Настройки:

- Framework preset: `Astro`
- Build command: `npm run build`
- Output directory: `dist`
- Root directory: оставить пустым, если проект лежит в корне репозитория; если проект лежит в подпапке, указать эту подпапку.
- Node version: использовать LTS Node `24`, через `.nvmrc` или настройки проекта.

Официальный ориентир:

- Astro on Vercel: https://vercel.com/docs/frameworks/frontend/astro

## Что заменить перед публичным релизом

Перед публикацией проверить и при необходимости заменить:

- телефон;
- Telegram;
- MAX;
- OG image;
- домен.

Не подключать домен и не менять DNS без отдельного подтверждения.

## Чеклист перед деплоем

- `npm run build` проходит без ошибок.
- `dist` создан.
- В `dist` есть `index.html`.
- В `dist` нет `node_modules`.
- Контакты проверены.
- Запрещенной терминологии нет.
- Сайт проверен на мобильной ширине 360-430px.
- Нет горизонтального скролла.
- CTA работают.
- SEO meta заполнены.
- OG image добавлен или осознанно оставлен на потом.

## Реальный деплой

Если деплой делается через Cloudflare Pages UI:

1. Зайти в Cloudflare Dashboard.
2. Открыть `Workers & Pages`.
3. Нажать `Create application`.
4. Выбрать `Pages`.
5. Выбрать `Import an existing Git repository`.
6. Подключить репозиторий с проектом.
7. Указать настройки из раздела `Cloudflare Pages`.
8. Нажать `Save and Deploy`.

Если деплой делается через Vercel UI:

1. Зайти в Vercel Dashboard.
2. Нажать `Add New Project`.
3. Импортировать Git-репозиторий.
4. Проверить настройки из раздела `Vercel`.
5. Нажать `Deploy`.

Если CLI просит логин, токен, выбор аккаунта или изменение DNS, остановиться и выполнить эти действия вручную в UI. Не публиковать сайт и не подключать домен без отдельного подтверждения.
