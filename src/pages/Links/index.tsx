import { Link, useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
import { useUsers } from '../../context/UsersContext';
import { useLinks } from '../../context/LinksContext';
import CardViewLink from '../../componenets/CardViewLink';
import defaultAvatar from '../../assets/user.png';

const Links = () => {
    const { pathname } = useLocation();
    const token = sessionStorage.getItem("token");
    const { users } = useUsers();
    const { allLinks } = useLinks();
    const currentUser = users?.find(user => (user.slug || user.id) === pathname.substring(1));
    const linksCurrentUser = allLinks?.filter(link => link.userId === currentUser?.id);


    return (
        <div className={styles.container_links}>
            <div className={styles.box_links}>
                <div className={styles.box_info}>
                    <img src={currentUser?.avatar || defaultAvatar} alt="foto de perfil" className={styles.img} />
                    <h2 className={styles.h2}>{currentUser?.name}</h2>
                    <span className={styles.email}>{currentUser?.email}</span>
                </div>
                <div className={styles.cards}>
                    {
                        linksCurrentUser?.map(link => (
                            <CardViewLink
                                key={link.id}
                                link={link.link}
                                platform={link.platform}
                            />
                        ))
                    }
                </div>
            </div>
            {
                !token && <Link to='/cadastro' className={styles.to_register}>Crie sua conta</Link>
            }
        </div>
    )
};
export default Links;
