import * as React from 'react';
import  { IconProps } from '../Icon';
import classNames from "classnames";
import styles from "../icons.module.scss";

const ArrowDownIcon: React.FC<IconProps> = ({className, color, width=24, height=24, ...restProps}) => {

    return (
        <svg
            className={classNames(styles.icon,color && styles[`icon_color-${color}`],className)}
            width={width}
            height={height}
            viewBox="0 0 20 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...restProps}>
            <path fillRule="evenodd" clipRule="evenodd" d="M0 1.49482L1.32873 0L9.66436 7.40945L18 0L19.3287 1.49482L9.66436 10.0854L0 1.49482Z" fill="currentColor"/>
        </svg>

    );
};



export default ArrowDownIcon;
