import * as React from 'react';
import classNames from "classnames";
import styles from '@components/Text/Text.module.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({className, view, tag: Tag = 'p', weight, children,  color, maxLines, ...restProps}) => {
  let viewStyle: string[] = [];
  let style ;

  if (view !== undefined) {
    viewStyle = view.split('-');

    if (viewStyle.length === 2) {
      if (maxLines) {
        style = {fontSize: `${Number(viewStyle[1])}px`,WebkitLineClamp: maxLines};
      } else {
        style = {fontSize: `${Number(viewStyle[1])}px`}
      }

    }
  }

  if (style === undefined && maxLines) {
    style = {WebkitLineClamp: maxLines}
  }


  return (
    <Tag className={classNames(styles.text,
        maxLines && styles["text_clamp"],
        color && styles[`text_color-${color}`],
        view && (viewStyle.length === 1) && styles[`text_view-${viewStyle[0]}`],
        weight && styles[`text_weight-${weight}`],
      className
    )}  style = {style} {...restProps}>
      {children}
    </Tag>
  );
};

export default Text;
