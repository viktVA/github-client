import React from 'react';
import classNames from "classnames";
import styles from '@components/Button/Button.module.scss';
import Loader from "@components/Loader";
import Text from "@components/Text";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({loading, className, children,disabled, ...allProps}) => {

  return (
      <button  className={classNames(
          styles.button,
          className,
          loading && !disabled && styles['button__loading_color'],
          loading && styles['button__loading'])}

               disabled={disabled || loading}
               {...allProps} >
          {loading && <Loader size={'s'} color={"#fff"}/>}
         <Text view={'button'} tag={'span'}>{children}</Text>
      </button>
  );

};

export default Button;
