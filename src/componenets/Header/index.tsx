import styles from './styles.module.scss';
import { IoInfinite, IoEyeOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FaEye } from "react-icons/fa";

import ToggleTheme from "../ToggleTheme";
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const { pathname } = useLocation();

    const navLinks = [
        { to: '/links', icon: FaLink, text: 'Links' },
        { to: '/profile', icon: CgProfile, text: 'Profile' },
        { to: '/preview', icon: FaEye, text: 'Preview' }
    ];
    const isNavVisible = !['/login', '/cadastro'].includes(pathname);

    return (
        <header className={styles.header}>
            <div className={styles.box_header}>
                <div className={styles.box_logo}>
                    <IoInfinite className={styles.icon_logo} />
                    <span className={styles.text_logo}>devlinks</span>
                </div>
                {
                    isNavVisible && <nav className={styles.nav}>
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
            </div>
        </header>
    )
}
export default Header;
