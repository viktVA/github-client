# Component Rules

## Структура файла компонента
```tsx
// 1. Импорты React (если нужны хуки)
import { useState } from 'react'

// 2. Импорт стилей
import styles from './ComponentName.module.scss'

// 3. Импорт других компонентов
import { Button } from 'src/components/ui'

// 4. Interface Props — всегда перед компонентом
interface Props {
  title: string
  onClick?: () => void
  className?: string
}

// 5. Компонент
export const ComponentName = ({ title, onClick, className }: Props) => {
  return (
    <div className={`${styles.root} ${className ?? ''}`}>
      {title}
    </div>
  )
}
```

## Запрещено
- `React.FC` — не использовать
- Default export — только named export
- Inline styles — никогда
- Вложенные компоненты внутри компонента (объявлять отдельно)

## Условные классы
```tsx
// Используй clsx если установлен, или шаблонные строки
className={`${styles.root} ${isActive ? styles.active : ''}`}
```

## Обработка событий
```tsx
// Именуй через handle*
const handleClick = () => { ... }
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { ... }
```