import styles from './styles.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import defaultAvatar from '../../assets/user.png';
import { CardViewLink, Loading } from '../../components';
import { useLinksService, useUsersService } from '../../hooks';

const isGuid = (value: string) => {
    const guidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return guidRegex.test(value);
};

export const Links = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const identifier = pathname.substring(1);
    const token = sessionStorage.getItem("token");

    const { queryUserById, queryUserBySlug } = useUsersService();
    const { queryLinksByUserId } = useLinksService();

    const {
        data: currentUser,
        isLoading: isLoadingQueryCurrentUser,
        isError: isErrorQueryCurrentUser
    } = isGuid(identifier) ? queryUserById(identifier) : queryUserBySlug(identifier);

    const {
        data: linksCurrentUser,
        isLoading: isLoadingLinksCurrentUser
    } = queryLinksByUserId(currentUser?.id!);

    isErrorQueryCurrentUser && navigate('*');
    return (
        <>
            {
                isLoadingQueryCurrentUser || isLoadingLinksCurrentUser
                    ? <Loading />
                    : <div className={styles.container_links}>
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
            }
        </>
    )
};

