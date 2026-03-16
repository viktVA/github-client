---
name: scss
description: >
  Применяй когда нужно создать переменную, изменить значение переменной в файлах variables.scss, название.module.scss
  Триггеры: "поменяй стили", "обнови дизайн", "сделай как на референсе",
  "измени цвета/шрифты/отступы", "редизайн".
---
## Система именования токенов (Design Tokens)

Все переменные в `variables.scss` строго следуют этой схеме:

### Глобальные токены (не привязаны к компоненту)
Формат: `$категория-подкатегория`

```scss
// Типографика
$font-size-xs
$font-size-sm
$font-size-md
$font-size-lg
$font-size-xl
$font-size-2xl

$font-weight-regular    // 400
$font-weight-medium     // 500
$font-weight-bold       // 700

$line-height-sm
$line-height-md
$line-height-lg

// Отступы
$spacing-xs
$spacing-sm
$spacing-md
$spacing-lg
$spacing-xl
$spacing-2xl

// Радиусы
$radius-sm
$radius-md
$radius-lg
$radius-full

// Тени
$shadow-sm
$shadow-md
$shadow-lg

// Переходы
$transition-fast        // 150ms ease
$transition-base        // 250ms ease
$transition-slow        // 400ms ease

// Z-index
$z-dropdown
$z-modal
$z-tooltip
```

### Глобальные цветовые токены
Формат: `$color-роль` или `$color-роль-вариант`

```scss
// Смысловые роли (semantic)
$color-primary
$color-primary-hover
$color-primary-active

$color-secondary
$color-secondary-hover

$color-accent

// Поверхности и фон
$color-background
$color-surface
$color-surface-hover

// Текст
$color-text
$color-text-muted
$color-text-inverse

// Границы
$color-border
$color-border-focus

// Состояния
$color-error
$color-error-hover
$color-success
$color-warning
```

### Токены компонента
Формат: `$component-роль` или `$component-роль-псевдокласс`

Псевдоклассы добавляются только если визуально отличаются: `-hover`, `-active`, `-disabled`, `-focus`

```scss
// Кнопка
$button-bg
$button-bg-hover
$button-bg-active
$button-bg-disabled
$button-text
$button-text-disabled
$button-border
$button-border-focus

// Инпут
$input-bg
$input-bg-focus
$input-text
$input-text-placeholder
$input-border
$input-border-hover
$input-border-focus
$input-border-error

// Карточка
$card-bg
$card-bg-hover
$card-border
$card-shadow

// Навигация
$nav-bg
$nav-text
$nav-text-active
$nav-border
```
## Динамические токены
Записываются по такому же принципу как правила выше, могут быть Глобальные токены,Глобальные цветовые токены,Токены компонента
Только записываються ввиде `--переменная` и находятся в самом конце файла `variables.scss` в `:root{ }`
```scss
:root {
  --переменная: значение
}
```
## Правила в файлах `module.scss`
- НЕ создавать переменные типа `$переменная`
- Создавать переменные типа `--переменная`
- К переменным формата `--переменная` обращаться так `var(--переменная)`
- Если переменные типа `$переменная` присваивается переменной типа `--переменная`, то ее записывать в виде `#{$переменная}` 
- Если переменные типа `$переменная` присваивается свойству, то записывать в виде `$переменная`

### Правило приоритета
1. Если токен компонента есть — используй его: `$button-bg`
2. Если токена компонента нет — используй глобальный: `$color-primary`
3. Если значение переменной меняется в зависимости от логики кода в tsx, то добавлять переменную в Динамические токены, при этом не надо удалять ее вид `$переменная`
4. Никогда не хардкодить значение напрямую

### Запрещено
```scss
// ❌ Придуманные имена
$btn-color-1
$myButton-blue
$card_BG

// ✅ Правильно
$button-bg
$button-text
$card-bg
```


## Главное правило
ВСЕ значения — только через переменные из `src/components/variables.scss`.
Никогда не хардкодить цвета, размеры, шрифты напрямую.


## Подключение переменных
```scss
// В начале каждого .module.scss
@use '@components/variables.scss' as *;
// Путь регулируй в зависимости от глубины папки
```

## Правильно vs Неправильно
```scss
// ✅ Правильно
.button {
  background: $color-primary;
  padding: $spacing-2 $spacing-4;
  border-radius: $radius-md;
  font-size: $font-size-base;
  transition: $transition-base;
}

// ❌ Неправильно
.button {
  background: #6366f1;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  transition: 250ms ease;
}
```

## Нельзя
- НЕ трогай именование классов, если создаешь новый то пиши их как в проекте
- `!important` — никогда
- Вложенность больше 3 уровней
- Глобальные стили в `.module.scss` файлах
- НЕ делай inline-стили, если стиль не меняется от логики кода.
