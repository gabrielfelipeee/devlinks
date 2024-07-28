import styles from './styles.module.scss';
import { IoInfinite } from "react-icons/io5";
import { FaLink } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FaEye } from "react-icons/fa";
import ToggleTheme from "../ToggleTheme";
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const { pathname } = useLocation();
    const userIdAuthenticated = sessionStorage.getItem("userIdAuthenticated");

    const token = sessionStorage.getItem("token");
    const navLinks = [
        { to: '/', icon: FaLink, text: 'Links' },
        { to: '/perfil', icon: CgProfile, text: 'Profile' },
        { to: `/${userIdAuthenticated}`, icon: FaEye, text: 'Preview' }
    ];
    const isNavVisible = !['/login', '/cadastro'].includes(pathname);

    return (
        <header className={styles.header}>
            <div className={styles.box_logo}>
                <IoInfinite className={styles.icon_logo} />
                <span className={styles.text_logo}>devlinks</span>
            </div>
            {
                (isNavVisible && token) && <nav className={styles.nav}>
                    {
                        navLinks.map(({ to, text, icon: Icon }) =>
                            <Link
                                key={to}
                                to={to}
                                className={`${styles.link} ${pathname == to ? styles.active : ""}`}
                            >
                                <Icon className={styles.icon} />
                                <span className={styles.text_icon_nav}>{text}</span>
                            </Link>
                        )
                    }
                </nav>
            }
            <ToggleTheme />
        </header>
    )
}
export default Header;
