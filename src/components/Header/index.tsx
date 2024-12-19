import styles from './styles.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { IoInfinite } from 'react-icons/io5';
import { FaLink } from 'react-icons/fa6';
import { CgProfile } from 'react-icons/cg';
import { FaEye } from 'react-icons/fa';
import { ToggleTheme } from '../';
import { useUsersService } from '../../hooks';

export const Header = () => {
    const { pathname } = useLocation();
    const { userAuthenticated } = useUsersService();

    const token = sessionStorage.getItem("token");

    const navLinks = [
        { to: '/', icon: FaLink, text: 'Links' },
        { to: '/perfil', icon: CgProfile, text: 'Perfil' },
        { to: `/${userAuthenticated?.slug || userAuthenticated?.id}`, icon: FaEye, text: 'Preview' }
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
