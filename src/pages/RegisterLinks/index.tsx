import styles from './styles.module.scss';
import { FiPlus } from 'react-icons/fi';
import { useRegisterLinks } from '../../hooks';
import { Preview, CardRegisterLinks, Loading } from '../../components';

export const RegisterLinks = () => {
    const {
        counterLinks,
        addCard,
        linksUserAuthenticated = [],
        isLoadinglinkAuthenticated
    } = useRegisterLinks();

    return (
        <>
            {
                isLoadinglinkAuthenticated
                    ? <Loading />
                    : <div className={styles.container_register_links}>
                        <div className={styles.box_links}>
                            <div className={styles.box_add_links}>
                                <h1 className={styles.h1}>Adicione seus links</h1>
                                <span className={styles.text}>Adicione seus links abaixo e compartilhe todos os seus perfis com o mundo!</span>
                                <button
                                    className={styles.btn_add}
                                    onClick={addCard}
                                >
                                    <FiPlus />
                                    Adicionar novo link
                                </button>
                            </div>

                            <div className={styles.box_cards}>
                                {
                                    counterLinks.map((item, index) => (
                                        <CardRegisterLinks
                                            key={index}
                                            idCurrentLink={linksUserAuthenticated[index]?.id!}
                                            indexLink={item}
                                            currentLink={linksUserAuthenticated[index]}
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
