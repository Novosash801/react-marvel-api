# 🦸 Marvel Universe

Веб-приложение для знакомства с героями и комиксами вселенной Marvel. Выбирайте персонажей, смотрите информацию о них, открывайте каталог комиксов и подробные страницы выпусков.

## ✨ Возможности

- Случайный персонаж Marvel с краткой информацией.
- Каталог героев с выбором персонажа и просмотром его данных.
- Список комиксов и отдельная страница каждого выпуска.
- Постраничная загрузка данных, индикаторы загрузки и обработка ошибок.
- Навигация между разделами без полной перезагрузки страницы.

## 🧰 Стек технологий

<p>
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" />
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=222222" />
  <img alt="React Router" src="https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white" />
  <img alt="Sass" src="https://img.shields.io/badge/Sass-SCSS-CC6699?logo=sass&logoColor=white" />
  <img alt="ESLint" src="https://img.shields.io/badge/ESLint-10-4B32C3?logo=eslint&logoColor=white" />
</p>

| Инструмент | Для чего используется |
| --- | --- |
| ⚛️ **React** | Компоненты, состояние и интерфейс приложения. |
| ⚡ **Vite** | Локальный сервер разработки, быстрая сборка и предпросмотр production-версии. |
| 🟨 **JavaScript** | Логика приложения и работа с асинхронными запросами. |
| 🧭 **React Router** | Навигация между главной страницей, каталогом комиксов и страницей выпуска. |
| 🎨 **Sass (SCSS)** | Стилизация компонентов. |
| 🧹 **ESLint** | Проверка кода на ошибки и соблюдение правил проекта. |
| 🦸 **Marvel API** | Данные о персонажах и комиксах. |

## 🚀 Запуск проекта

### Требования

- Node.js **20.19+** или **22.12+**
- npm
- Доступ к совместимому с Marvel API endpoint и API-ключ

### Установка и запуск

1. Склонируйте репозиторий и перейдите в папку проекта:

   ```bash
   git clone <URL-репозитория>
   cd react-marvel
   ```

2. Установите зависимости:

   ```bash
   npm install
   ```

3. Создайте в корне проекта файл `.env` и задайте параметры API:

   ```env
   VITE_MARVEL_API_BASE=https://marvel-server-zeta.vercel.app/
   VITE_MARVEL_API_KEY=your_api_key
   ```

   `VITE_MARVEL_API_BASE` — адрес API, совместимого с используемыми маршрутами проекта; URL должен заканчиваться `/`. `VITE_MARVEL_API_KEY` — публичный ключ, который ожидает ваш API endpoint. Переменные с префиксом `VITE_` попадают в клиентскую сборку, поэтому не храните в них приватные секреты. Не добавляйте `.env` с реальными значениями в репозиторий.

4. Запустите приложение в режиме разработки:

   ```bash
   npm run dev
   ```

   Откройте адрес, указанный Vite в терминале (обычно `http://localhost:5173`).

### Дополнительные команды

```bash
npm run lint    # Проверить код
npm run build   # Собрать production-версию в dist/
npm run preview # Локально просмотреть production-сборку
```
