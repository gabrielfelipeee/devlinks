import { useLocation } from 'react-router-dom';
import CardLink from './CardLink';
import styles from './styles.module.scss';
import { useUsers } from '../../context/UsersContext';
import { useLinks } from '../../context/LinksContext';
import useUsersMutationsAndValidation from '../../hooks/useUsersMutationsAndValidation';


const Preview = () => {
    const { pathname } = useLocation();
    const { users, error, isLoading } = useUsers();
    const { imagePreview } = useUsersMutationsAndValidation();
    const { allLinks } = useLinks();

    const currentUser = users?.find(user => user.id === pathname.substring(1));
    const linksCurrentUser = allLinks?.filter(link => link.userId === pathname.substring(1));

    return (
        <div className={styles.container_preview}>
            <div className={styles.box_info}>
                <img src={imagePreview} alt="foto de perfil" className={styles.img} />
                <h2 className={styles.h2}>{currentUser?.name}</h2>
                <span className={styles.email}>{currentUser?.email}</span>
            </div>
            <div className={styles.cards}>
                {
                    linksCurrentUser?.map(link => (
                        <CardLink
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
export default Preview;
