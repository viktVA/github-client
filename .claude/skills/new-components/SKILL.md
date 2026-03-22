---
name: new-component
description: Создаёт новый UI-компонент в src/components/. Используй этот скилл всегда когда нужно создать новый переиспользуемый компонент — если пользователь просто говорит "создай общий компонент X" или "добавь общий компонент".
---

# Создание нового компонента

## Перед началом — обязательно проверь

Посмотри на существующие компоненты в `src/components/`:
```bash
ls src/components/
```
Если похожий компонент уже есть — сообщи пользователю и не создавай дубликат.

## Сначала определи — где будет жить компонент?

**Локальный** (используется только внутри одной страницы):
→ src/App/pages/НазваниеPage/components/МойКомпонент/

**Общий** (используется в 2+ местах):
→ src/components/МойКомпонент/

Структура файлов одинаковая в обоих случаях.
Если не знаешь — спроси пользователя.


---

## Структура файлов

```
src/components/НазваниеКомпонента/
├── НазваниеКомпонента.tsx       # компонент
├── НазваниеКомпонента.module.scss  # стили
└── index.ts                     # реэкспорт
```

---

## Шаблон: НазваниеКомпонента.tsx

```tsx
import React from 'react';
import classNames from 'classnames';
import styles from './НазваниеКомпонента.module.scss';

export type НазваниеКомпонентаProps = {
  /** Дополнительный className */
  className?: string;
  /** Содержимое */
  children?: React.ReactNode;
  // остальные пропсы с JSDoc-комментариями
};

const НазваниеКомпонента: React.FC<НазваниеКомпонентаProps> = ({
  className,
  children,
  ...restProps
}) => {
  return (
    <div className={classNames(styles.название, className)} {...restProps}>
      {children}
    </div>
  );
};

export default НазваниеКомпонента;
```

**Правила по шаблону:**
- Тип пропсов — `НазваниеКомпонентаProps` в том же файле
- Каждый проп — с JSDoc-комментарием `/** ... */`
- `className` — всегда опциональный, всегда через `classNames(styles.блок, className)`
- `...restProps` — прокидывать если компонент оборачивает HTML-элемент
- Если оборачивает `<input>` — использовать `React.forwardRef` (см. паттерн Input)
- Если оборачивает `<button>` — расширять `React.ButtonHTMLAttributes<HTMLButtonElement>`

---

## Шаблон: НазваниеКомпонента.module.scss

```scss
@use '@components/variables' as *;

.название {
  // используй переменные из variables.scss:
  // Отступы: $space-xxs(8px) $space-xs(12px) $space-s(14px) $space-m(16px) $space-l(20px) $space-xl(24px)
  // Радиус: $border-radius (6px)
  // Цвета бренда: $brand (#1f883d), var(--brand-hover), var(--brand-active)
  // Цвета текста: $text-primary, $text-secondary, $text-accent

  // CSS-переменные для состояний (как в Button, Input):
  // --color-bg: #{$...};
  // --color-text: #{$...};

  &__элемент {
    // BEM: блок__элемент
  }

  &__элемент_модификатор {
    // BEM: блок__элемент_модификатор
  }

  &:hover:not(:disabled) {
    // состояния через CSS-переменные
  }
}
```

**Правила по стилям:**
- Всегда `@use '@components/variables' as *;` первой строкой
- БЭМ: `блок`, `блок__элемент`, `блок__элемент_модификатор`
- Состояния (hover, active, disabled, focus) — через CSS-переменные как в Button и Input
- Никаких inline-стилей в tsx кроме динамических значений (размер, цвет из пропса)
- Если нужен шрифт Roboto — `@import '../../styles/Roboto/fonts.css';`

---

## Шаблон: index.ts

```ts
export { default } from './НазваниеКомпонента';
export * from './НазваниеКомпонента';
```

Всегда оба экспорта — дефолтный и именованный (для типов пропсов).

---

## Готовые компоненты для переиспользования внутри нового

| Нужно | Используй |
|---|---|
| Текст с типографикой | `Text` из `@components/Text` |
| Кнопка | `Button` из `@components/Button` |
| Поле ввода | `Input` из `@components/Input` |
| Спиннер загрузки | `Loader` из `@components/Loader` (`size`: `'s'`/`'m'`/`'l'`) |
| Несколько CSS-классов | `classNames` из `classnames` |

---

## Паттерны из проекта

### Компонент с нативными HTML-атрибутами (как Button)
```tsx
export type МойПропс = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};
```

### Компонент с forwardRef (как Input)
```tsx
const МойInput = React.forwardRef<HTMLInputElement, МойПропсProps>(
  ({ onChange, ...restProps }, ref) => { ... }
);
```

### Кастомный onChange вместо нативного (как Input)
```tsx
export type МойПропс = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  onChange: (value: string) => void;
};
```

### CSS-переменные для состояний (как Button, Input)
```scss
.компонент {
  --color-bg: #{$button-primary-bg};
  --color-text: #{$button-primary-text};
  background-color: var(--color-bg);
  color: var(--color-text);

  &:hover:not(:disabled) {
    --color-bg: #{$button-primary-bg-hover};
  }
}
```

---

## Чеклист перед завершением

- [ ] Папка называется точно так же как компонент (PascalCase)
- [ ] Тип пропсов называется `НазваниеProps` и экспортируется
- [ ] Все пропсы с JSDoc-комментариями `/** */`
- [ ] `className` опциональный, объединяется через `classNames()`
- [ ] SCSS начинается с `@use '@components/variables' as *;`
- [ ] Классы в SCSS — только BEM
- [ ] `index.ts` содержит оба экспорта (default + named)
- [ ] Импорты в tsx — только через алиасы `@components/`, не через `../../`
- [ ] Не установлено ни одного нового пакета