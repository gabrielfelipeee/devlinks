import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { FaRegSun, FaRegMoon } from 'react-icons/fa';

export const ToggleTheme = () => {
    // A função é disparada ao renderizar o componente
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

    const changeTheme = () => {
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
    };

    useEffect(() => {
        localStorage.setItem("theme", theme);

        const body = document.body;
        body.classList.add(theme);

        return () => {
            body.classList.remove(theme);
        }
    }, [theme]);

    return (
        <>
            {
                theme === "dark"
                    ? <FaRegSun className={styles.icon_theme} onClick={changeTheme} />
                    : <FaRegMoon className={styles.icon_theme} onClick={changeTheme} />
            }
        </>
    )
};
