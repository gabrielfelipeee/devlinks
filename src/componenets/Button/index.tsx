import styles from './styles.module.scss';

import { ReactNode } from "react";

const Button = (
    {
        children,
    }: {
        children: ReactNode,
    }) => {
    return (
        <button
            className={styles.container_button}
        >
            {children}
        </button>
    )
}
export default Button;
