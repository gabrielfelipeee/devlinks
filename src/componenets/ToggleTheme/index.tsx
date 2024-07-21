import styles from './styles.module.scss';
import { useEffect, useState } from "react";
import { FaRegSun, FaRegMoon } from "react-icons/fa";

const ToggleTheme = () => {
    // A função é disparada ao renderizar o component
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

    useEffect(() => {
        localStorage.setItem("theme", theme);

        const body = document.body;
        body.classList.add(theme);

        return () => {
            body.classList.remove(theme);
        }
    }, [theme]);

    const changeTheme = () => {
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
    };

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
export default ToggleTheme;
