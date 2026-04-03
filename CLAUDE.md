# CLAUDE.md

> Этот файл читается Claude Code **автоматически при старте каждой сессии**.
> Здесь — всё, что Claude должен знать о проекте, не задавая лишних вопросов.

---

## Что это за проект

GitHub Client — SPA на React + TypeScript + Vite.
Показывает репозитории организации GitHub и отдельные страницы репозитория.
Стили — CSS Modules + SCSS. Роутинг — React Router v7. HTTP — axios.

---

## Структура проекта

```
src/
├── api/            # Функции для запросов к GitHub API
├── App/
│   ├── App.tsx     # Корневой layout (header + <Outlet>)
│   └── pages/
│       ├── RepoListPage/   # Список репозиториев с пагинацией
│       └── RepoPage/       # Страница одного репозитория
├── components/     # Переиспользуемые UI-компоненты
├── config/
│   ├── routes.ts           # Объект routes с mask/create
│   └── routesConfig.tsx    # RouteObject[] для createBrowserRouter
├── custom_types/   # TypeScript-типы для данных
├── styles/         # Глобальные стили и шрифты
└── utils/          # Вспомогательные функции
```

---

## Соглашения по коду

### Компоненты

- **Один компонент — одна папка**: `ComponentName/ComponentName.tsx` + `index.ts` (реэкспорт) + `ComponentName.module.scss`
- `index.ts` — только реэкспорт: `export { default } from './ComponentName'`
- Компоненты — функциональные, типизированы через `React.FC<Props>`
- Пропсы описываются отдельным типом `ComponentNameProps` в том же файле

### Стили

- Используй **CSS Modules**: `styles['block__element']` или `styles.block`
- Классы по методологии BEM: `block`, `block__element`, `block__element_modifier`
- Глобальные CSS-переменные лежат в `src/components/variables.scss`
- Для нескольких классов — `classNames(...)` из пакета `classnames`

### Алиасы путей (vite + tsconfig)

```ts
@components/Button     →  src/components/Button
@api/getRepo           →  src/api/getRepo
@config/routes         →  src/config/routes
@custom_types/repo     →  src/custom_types/repo
@utils/workDate        →  src/utils/workDate
@assets/icons/logo.png →  src/assets/icons/logo.png
```

Всегда используй алиасы, не относительные пути `../../`.

### Роуты

Добавлять маршруты через объект `routes` в `src/config/routes.ts`:

```ts
export const routes = {
  repository: {
    mask: "/repositories/:owner/:name",
    create: (owner: string, name: string) => `/repositories/${owner}/${name}`,
  }
};
```

Затем регистрировать в `routesConfig.tsx`.

### API

- Каждая сущность — отдельный файл в `src/api/`
- Используй `axios` с явной типизацией: `axios<RepoInfo>({...})`
- Обработка ошибок — `try/catch` в `useEffect` внутри страницы

### Типы

- Пользовательские типы — в `src/custom_types/`
- Именование: `PascalCase`, суффикс `Info` для расширенных сущностей (например `RepoInfo`)

---

## Готовые UI-компоненты

| Компонент | Назначение | Ключевые пропсы |
|---|---|---|
| `Text` | Типографика | `view`, `tag`, `weight`, `color`, `maxLines` |
| `Button` | Кнопка | `className`, `children`, `onClick` |
| `Input` | Поле ввода | `value`, `onChange`, `placeholder` |
| `Card` | Карточка репо | `image`, `title`, `subtitle`, `captionSlot`, `contentSlot`, `actionSlot`, `onClick` |
| `MultiDropdown` | Мультиселект | `options`, `value`, `onChange`, `getTitle` |
| `Loader` | Индикатор загрузки | — |
| `CheckBox` | Чекбокс | `checked`, `onChange` |

---

## Данные из GitHub API

### RepoInfo (одиночный репозиторий)
```ts
type RepoInfo = {
  id: number;
  name: string;
  homepage: string;
  topics: string[];
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  languages_url: string;
  contributors_url: string;
  languages?: object;        // подгружается отдельным запросом
  contributors?: Contributors[];  // подгружается отдельным запросом
};
```

### Repo (список)
```ts
type Repo = {
  id: number; name: string;
  owner: { login: string; avatar_url: string; type: string; }
  description: string; updated_at: string; stargazers_count: number;
};
```

---

## Что сейчас не реализовано (TODO)

- `RepoPage` — пустой `<div>`, нужно отрисовать UI
- Фильтр по типу (MultiDropdown в RepoListPage не подключён к логике)
- Поиск (Input не подключён к фильтрации репозиториев)
- Состояния загрузки и ошибок (нет `<Loader>` и error state)
- Обработка 404 / пустых состояний