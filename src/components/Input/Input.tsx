import React from 'react';
import classNames from "classnames";
import styles from './Input.module.scss';
export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
  className?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(({value, onChange, afterSlot,className,disabled,placeholder="Текст", ...restProps}, ref) => {
    const padding = afterSlot ? "14px" : "16px";
    const widthInput = afterSlot ? "81.33%" : "92%";
  const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>):void => {
          onChange(event.target.value);
      },
      [onChange]
  );
  return (
      <div className={classNames(styles.input,className)} style={{paddingBlock: padding}}>
          <div style={{width: widthInput}}>
              <input ref={ref} type={'text'} value={value} {...restProps} onChange={handleChange} disabled={disabled} placeholder={placeholder}/>
          </div>

          {afterSlot && <div className={styles.afterSlot}>{afterSlot}</div>}
      </div>
  );
});

export default Input;
