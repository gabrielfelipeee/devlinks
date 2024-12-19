import styles from './styles.module.scss';
import { useProfile, useUsersService, useLinksService } from '../../hooks';
import { CardViewLink } from '..';


export const Preview = () => {
    const { imagePreview } = useProfile();
    const { linksUserAuthenticated } = useLinksService();
    const { userAuthenticated } = useUsersService();

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
