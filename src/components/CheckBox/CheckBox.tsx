import React from 'react';
import classNames from "classnames";
import styles from './Checkbox.module.scss';
import CheckIcon from "../icons/CheckIcon";


export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
    className,
    onChange,
    checked,
    ...props
    }) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
        onChange(event.target.checked);
    };

    return (
        <label className={classNames(styles.checkBox,className, props.disabled && styles.checkBox_disabled )}>
            <input
                type={'checkbox'}
                className={styles.checkBox__input}
                onChange={handleChange}
                checked={checked}
                {...props}/>
                <CheckIcon className={classNames(styles.checkBox__icon,props.disabled && styles.checkBox__icon_disabled)} width={24} height={24} />


        </label>
    );
};

export default CheckBox;
