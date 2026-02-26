import React from 'react';
import classNames from 'classnames';
import styles from './MultiDropdown.module.scss';
import Input from "../Input";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import Text from "../Text";
export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
                                                       className,
                                                       options,
                                                       value,
                                                       onChange,
                                                       disabled,
                                                       getTitle,
                                                       ...props
                                                     }) => {
  const [valueInput, setValueInput] = React.useState('');
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const dropdownRef = React.useRef<HTMLDivElement | null>(null);

  // =========================
  // Handlers
  // =========================

  const handleOptionClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const key = e.currentTarget.dataset.id;
    if (!key) return;

    const option = options.find(item => item.key === key);
    if (!option) return;

    const isSelected = value.some(item => item.key === key);

    const newValue = isSelected ?
        value.filter(item => item.key !== option.key)
        : [...value, option];

    onChange(newValue);
  };

  const handleInputClick = () => {
    if (disabled) {
      setIsOpen(false);
      return;
    }

    setIsOpen(true);
  };

  // =========================
  // Effects
  // =========================

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setValueInput('');
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  React.useEffect(() => {
    if (disabled) {
      setIsOpen(false);
    }
  }, [disabled]);

  // =========================
  // Derived values
  // =========================

  const inputValue = isOpen ? valueInput : value.length === 0 ? '' : getTitle(value);

  const filteredOptions = options.filter(option =>
      option.value
          .toLowerCase()
          .includes(valueInput.toLowerCase())
  );

  // =========================
  // Render
  // =========================

  return (
      <div
          ref={dropdownRef}
          className={classNames(styles.multidropdown, className)}
          {...props}
      >
        <Input
            className={styles.multidropdown__input}
            placeholder={getTitle(value)}
            value={inputValue}
            disabled={disabled}
            afterSlot={<ArrowDownIcon color="secondary" />}
            onClick={handleInputClick}
            onChange={setValueInput}
        />

        {isOpen && (
            <div className={styles.multidropdown__options}>
              <div className={styles.multidropdown__items}>
                {filteredOptions.map(option => {
                  const isSelected = value.some(
                      item => item.key === option.key
                  );

                  return (
                      <div
                          key={option.key}
                          data-id={option.key}
                          className={classNames(
                              styles.multidropdown__item,
                              isSelected &&
                              styles['multidropdown__item_selected']
                          )}
                          onClick={handleOptionClick}
                      >
                        <Text
                            view="p-16"
                            color={isSelected ? 'accent' : 'primary'}
                        >
                          {option.value}
                        </Text>
                      </div>
                  );
                })}
              </div>
            </div>
        )}
      </div>
  );
};

export default MultiDropdown;

