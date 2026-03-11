import * as React from 'react';
import classNames from "classnames";
import styles from '../icons.module.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({className, color, width=24, height=24, children,...restProps}) => {
    return (
        <svg
            className={classNames(styles.icon,color && styles[`icon_color-${color}`],className)}
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...restProps}>
            {children}
        </svg>
    );

};

export default Icon;
