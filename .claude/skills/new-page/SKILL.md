---
name: new-page
description: Создаёт новую страницу в проекте. Используй этот скилл всегда когда нужно добавить новую страницу, роут или экран — даже если пользователь просто говорит "создай страницу X", "добавь экран", "сделай новый роут".
---

# Создание новой страницы

## Перед началом — обязательно проверь

```bash
ls src/App/pages/
cat src/config/routes.ts
cat src/config/routesConfig.tsx
```

Убедись что такой страницы и роута ещё нет. Если есть — сообщи пользователю.


## Макет страницы
Если пользователь прикрепил скриншот или изображение макета:
1. Внимательно изучи макет перед тем как писать код
2. Выпиши из макета: список блоков, их порядок, примерные размеры
3. Покажи пользователю план структуры HTML/scss и жди подтверждения
4. Только после подтверждения — пиши код

Если макета нет — спроси: "Есть ли макет страницы? Прикрепи скриншот или опиши структуру."


---

## Структура файлов

```
src/App/pages/НазваниеPage/
├── НазваниеPage.tsx          # компонент страницы
├── НазваниеPage.module.scss  # стили
├── components                # папка для компонентов, которые используются только на этой странице
└── index.ts                  # реэкспорт

```

Название папки и файлов — всегда `PascalCase` с суффиксом `Page`.

---

## Шаг 1 — Создать файлы страницы

### НазваниеPage.tsx

```tsx
import styles from './НазваниеPage.module.scss';

const НазваниеPage = () => {
  return (
    <div className={styles['название-page']}>
      <div className={styles['название-page__container']}>
        {/* содержимое */}
      </div>
    </div>
  );
};

export default НазваниеPage;
```

**Правила:**
- Страница — это обычный функциональный компонент, без `React.FC` (как в проекте)
- Нет пропсов — страница получает данные через `useParams`, `useSearchParams`, API
- Данные загружаются внутри через `useEffect` + `useState`
- Обработка ошибок — `try/catch` внутри `useEffect`
- Состояние загрузки — отдельный `useState<boolean>`

### Паттерн загрузки данных (как в RepoPage, RepoListPage)

```tsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSomething } from '@api/getSomething';
import type { SomeType } from '@custom_types/something';
import Loader from '@components/Loader';
import styles from './НазваниеPage.module.scss';

const НазваниеPage = () => {
  const { id } = useParams(); // если нужны параметры роута
  const [data, setData] = useState<SomeType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getSomething(id!);
        setData(result);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <Loader size={'l'} />;
  if (error || !data) return <div>Что-то пошло не так</div>;

  return (
    <div className={styles['название-page']}>
      {/* рендер данных */}
    </div>
  );
};

export default НазваниеPage;
```

### НазваниеPage.module.scss

```scss
@use '@components/variables' as *;

.название-page {
  margin-top: 30px;   // как в RepoListPage
  width: 100%;
  overflow: hidden;

  &__container {
    width: 85%;       // стандартная ширина контейнера в проекте
    margin: 0 auto;
  }

  &__title {
    text-align: center;
    margin-bottom: 60px;
  }
}
```

**Правила:**
- Всегда начинать с `@use '@components/variables' as *;`
- Ширина контейнера — `85%` с `margin: 0 auto` (стандарт проекта)
- БЭМ: блок = имя страницы в kebab-case (`repo-page`, `repo-list-page`)
- Вложенность через `&__элемент`

### index.ts

```ts
export { default } from './НазваниеPage';
```

Только дефолтный экспорт — страницы не экспортируют типы.

---

## Шаг 2 — Добавить роут в routes.ts

Файл: `src/config/routes.ts`

```ts
// Добавить в объект routes:

// Страница без параметров:
название: {
  mask: '/путь',
  create: () => '/путь',
},

// Страница с параметрами (как repository):
название: {
  mask: '/путь/:параметр',
  create: (параметр: string) => `/путь/${параметр}`,
},
```

**Реальный пример из проекта:**
```ts
export const routes = {
  main: {
    mask: '/',
    create: () => '/',
  },
  repositories: {
    mask: '/repositories',
    create: () => '/repositories',
  },
  repository: {
    mask: '/repositories/:owner/:name',
    create: (owner: string, name: string) => `/repositories/${owner}/${name}`,
  },
  // → сюда добавляешь новый роут
};
```

---

## Шаг 3 — Зарегистрировать в routesConfig.tsx

Файл: `src/config/routesConfig.tsx`

```tsx
// 1. Добавить импорт страницы (через алиас):
import НазваниеPage from '../App/pages/НазваниеPage';

// 2. Добавить в children массива:
{
  path: routes.название.mask,
  element: <НазваниеPage />
}
```

**Реальная структура routesConfig:**
```tsx
export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    children: [
      { index: true, element: <Navigate to={routes.repositories.mask} replace /> },
      { path: routes.repositories.mask, element: <RepoListPage /> },
      { path: routes.repository.mask, element: <RepoPage /> },
      // → сюда добавляешь новый роут
    ]
  },
  { path: '*', element: <Navigate to={routes.main.mask} replace /> },
];
```

---

## Шаг 4 — Навигация на новую страницу

Из других компонентов переходить через `routes.название.create()`:

```tsx
// Через useNavigate:
const navigate = useNavigate();
navigate(routes.название.create());
navigate(routes.название.create(owner, name)); // с параметрами

// Через Link:
<Link to={routes.название.create()}>Перейти</Link>
```

**Никогда не хардкодить пути строками** — только через объект `routes`.

---

## Чеклист перед завершением

- [ ] Папка называется `НазваниеPage` (PascalCase + суффикс Page)
- [ ] Три файла: `.tsx`, `.module.scss`, `index.ts`
- [ ] SCSS начинается с `@use '@components/variables' as *;`
- [ ] БЭМ-блок в SCSS = имя страницы в kebab-case
- [ ] Роут добавлен в `src/config/routes.ts` с `mask` и `create`
- [ ] Страница зарегистрирована в `routesConfig.tsx` в `children`
- [ ] Импорт страницы в routesConfig — через относительный путь `../App/pages/...`
- [ ] Навигация в коде — только через `routes.название.create()`, не строками
- [ ] Если страница грузит данные — есть состояния `loading` и `error`
- [ ] Загрузка показывает `<Loader size={'l'} />`