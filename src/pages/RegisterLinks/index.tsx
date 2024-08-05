import styles from './styles.module.scss';
import { FiPlus } from "react-icons/fi";
import { useLinks } from '../../context/LinksContext';
import Preview from '../../componenets/Preview';
import CardRegisterLinks from '../../componenets/CardRegisterLinks';
import useRegisterLinks from '../../hooks/useRegisterLinks';
import ModalMessage from '../../componenets/ModalMessage';

const RegisterLinks = () => {
    const { linksUserAuthenticated = [] } = useLinks();
    const {
        counterLinks,
        addCard,
        removeCard,
    } = useRegisterLinks();

    const {
        isSuccessAddLink,
        isErrorAddLink,
        isSuccessUpdateLink,
        isErrorUpdateLink
    } = useLinks();

    return (
        <>
            {
                isSuccessAddLink && <ModalMessage message="Link adicionado com sucesso" typeMessage="success" />
            }
            {
                isErrorAddLink && <ModalMessage message="Erro ao adicionar Link" typeMessage="error" />
            }
            {
                isSuccessUpdateLink && <ModalMessage message="Link atualizado com sucesso" typeMessage="success" />
            }
            {
                isErrorUpdateLink && <ModalMessage message="Erro ao atualizar Link" typeMessage="error" />
            }
            <div className={styles.container_register_links}>
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
                                (item < 5) &&
                                <CardRegisterLinks
                                    key={index}
                                    id={linksUserAuthenticated[index]?.id!}
                                    indexLink={item + 1}
                                    removeCard={removeCard}
                                    dataLink={linksUserAuthenticated[index]}
                                />
                            ))
                        }
                    </div>
                </div>
                <div className={styles.preview}>
                    <Preview />
                </div>
            </div>
        </>
    )
};
export default RegisterLinks;
