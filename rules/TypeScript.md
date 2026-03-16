# TypeScript Rules

## Обязательно
- Strict mode включён — не отключать
- Никаких `any` — использовать `unknown` если тип неизвестен
- Props всегда через `interface`, не через `type`
- Возвращаемый тип функций-компонентов не нужен (React.FC не использовать)
- Для событий: `React.MouseEvent<HTMLButtonElement>`, `React.ChangeEvent<HTMLInputElement>` и т.д.

## Импорты
```ts
// ✅ Правильно
import { ComponentName } from '@components/ui'

// ❌ Неправильно  
import { ComponentName } from '@components/ui/ComponentName/ComponentName'
```

## Примеры типов
```ts
// Props компонента
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
  className?: string
}

// Асинхронные функции
const fetchData = async (id: string): Promise<UserData> => { ... }

// Состояние
const [items, setItems] = useState<Item[]>([])
```