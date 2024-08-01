import { useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
import { useUsers } from '../../context/UsersContext';
import { useLinks } from '../../context/LinksContext';
import useProfileForm from '../../hooks/useProfileForm';
import CardViewLink from '../../componenets/CardViewLink';

const Links = () => {
    const { pathname } = useLocation();
    const { users, } = useUsers();
    const { imagePreview } = useProfileForm();
    const { allLinks } = useLinks();

    const currentUser = users?.find(user => user.id === pathname.substring(1));
    const linksCurrentUser = allLinks?.filter(link => link.userId === pathname.substring(1));

    return (
        <div className={styles.container_links}>
            <div className={styles.box_info}>
                <img src={imagePreview} alt="foto de perfil" className={styles.img} />
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
    )
};
export default Links;
