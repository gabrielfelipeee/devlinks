import styles from './styles.module.scss';

import { ReactNode } from "react";

const Button = (
    {
        children,
        disabled = false
    }: {
        children: ReactNode,
        disabled?: boolean
    }) => {
    return (
        <button
            disabled={disabled}
            className={`${styles.container_button} ${disabled && styles.disabled}`}
        >
            {children}
        </button>
    )
}
export default Button;
