---
name: uikit
description: >
  Применяй когда нужно добавить новый компонент, изменить существующий
  или разобраться в структуре UI-кита.
  Триггеры: "создай компонент", "добавь кнопку", "измени Card",
  "новый ui компонент", "обнови компонент".
---

# Скилл: Работа с UI-китом

## Структура каждого компонента

```
src/components/ui/ComponentName/
├── ComponentName.tsx          ← разметка + логика
├── ComponentName.module.scss  ← стили (используют переменные из variables.scss)
└── index.ts                   ← реэкспорт
```

## Шаблон нового компонента

**ComponentName.tsx**

```tsx
import styles from './ComponentName.module.scss'
import classNames from "classnames";

interface Props {
    // пропсы здесь
    className?: string
}

export const ComponentName = ({className}: Props) => {
    return (
        <div className={classNames(styles[`${root}`],classNames && styles[`${className}`])}>
            {/* содержимое */}
        </div>
    )
}
```

**ComponentName.module.scss**
```scss
@use '@components/variables.scss' as *;

.root {
  --color-bg: #{$componentName-color-bg};
  // только переменные, не хардкод
  color: $color-text;
  font-size: $font-size-base;
  padding: $spacing-4;
  border-radius: $radius-md;
  transition: $transition-base;
  background: var(--color-bg);
  
}
```

**index.ts**
```ts
export { ComponentName } from './ComponentName'
```

## После создания компонента
Обязательно добавить экспорт в `src/components/ui/index.ts`:
```ts
export { ComponentName } from './ComponentName'
```

## Правила
- Никаких inline-стилей
- Все значения через переменные из variables.scss
- `className` проп — всегда опциональный
- Типы — только через `interface`, не `type` для Props
- Не использовать `any`