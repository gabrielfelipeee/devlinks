import styles from './styles.module.scss';
import { FiPlus } from 'react-icons/fi';
import { useRegisterLinks } from '../../hooks';
import { Preview, CardRegisterLinks, Loading, ModalMessage } from '../../components';
import { LINK_STATUS_MESSAGES } from '../../data';

export const RegisterLinks = () => {
    const {
        handleSaveOrUpdateLink,
        handleDeleteLink,
        addCard,
        counterLinks,

        linksUserAuthenticated = [],
        isLoadinglinkAuthenticated,
        isSuccessCreateLink,
        isErrorCreateLink,
        isErrorUpdateLink,
        isSuccessUpdateLink
    } = useRegisterLinks();

    return (
        <>
            {
                isSuccessCreateLink && <ModalMessage {...LINK_STATUS_MESSAGES.CREATE_SUCCESS} />
            }
            {
                isErrorCreateLink && <ModalMessage {...LINK_STATUS_MESSAGES.CREATE_ERROR} />
            }
            {
                isSuccessUpdateLink && <ModalMessage {...LINK_STATUS_MESSAGES.UPDATE_SUCCESS} />
            }
            {
                isErrorUpdateLink && <ModalMessage {...LINK_STATUS_MESSAGES.UPDATE_ERROR} />
            }
            {
                isLoadinglinkAuthenticated
                    ? <Loading />
                    : <div className={styles.container_register_links}>
                        <div className={styles.box_links}>
                            <div className={styles.box_add_links}>
                                <h1 className={styles.h1}>Adicione seus links</h1>
                                <span className={styles.text}>Adicione seus links abaixo e compartilhe todos os seus perfis com o mundo!</span>
                                <button
                                    disabled={counterLinks.length >= 5 || counterLinks.length >= linksUserAuthenticated.length + 1}
                                    className={styles.btn_add}
                                    onClick={addCard}
                                >
                                    {
                                        counterLinks.length >= 5
                                            ? "Você pode ter até 5 links"
                                            : <>
                                                <FiPlus />
                                                Adicionar novo link
                                            </>
                                    }
                                </button>
                            </div>

                            <div className={styles.box_cards}>
                                {
                                    counterLinks.map((numberLink, index) => (
                                        <CardRegisterLinks
                                            key={index}
                                            currentLink={linksUserAuthenticated[index]}
                                            numberLink={numberLink}
                                            onSubmit={handleSaveOrUpdateLink}
                                            deleteLink={handleDeleteLink}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                        <div className={styles.preview}>
                            <Preview />
                        </div>
                    </div>
            }
        </>
    )
};
