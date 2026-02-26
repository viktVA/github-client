import * as React from 'react';
import  { IconProps } from '../Icon';
import classNames from "classnames";
import styles from "../icons.module.scss";

const CheckIcon: React.FC<IconProps> = ({className, color, width=24, height=24, ...restProps}) => {

    return (
        <svg
            className={classNames(styles.icon,color && styles[`icon_color-${color}`], className)}
            width={width}
            height={height}
            viewBox="0 0 18 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...restProps}>
            <path d="M0.73584 5.29005L6.61339 11.6771L16.7358 0.677147" stroke="currentColor" strokeWidth="2"/>
        </svg>

    );
};



export default CheckIcon;
