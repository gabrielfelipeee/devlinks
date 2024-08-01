import { useLinks } from '../../context/LinksContext';
import { useUsers } from '../../context/UsersContext';
import useProfileForm from '../../hooks/useProfileForm';
import CardViewLink from '../CardViewLink';
import styles from './styles.module.scss';

const Preview = () => {
    const { imagePreview } = useProfileForm();
    const { linksUserAuthenticated } = useLinks();
    const { userAuthenticated } = useUsers();

    return (
        <div className={styles.container_preview}>
            <div className={styles.box_info}>
                <img className={styles.img} src={imagePreview} alt="logo do usuário" />
                <h2 className={styles.h2}>{userAuthenticated?.name}</h2>
                <span className={styles.email}>{userAuthenticated?.email}</span>
            </div>
            <div className={styles.box_cards}>
                {
                    linksUserAuthenticated?.map((link, index) => (
                        <CardViewLink
                            key={index}
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
