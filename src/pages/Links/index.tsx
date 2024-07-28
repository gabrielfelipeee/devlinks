import styles from './styles.module.scss';
import Card from '../../componenets/Card';
import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from 'react';
import { useLinks } from '../../context/LinksContext';

const Links = () => {
    const { linksUserAuthenticated = [] } = useLinks();
    const [counterLinks, setCounterLinks] = useState<number[]>([]);
    useEffect(() => {
        if (linksUserAuthenticated?.length > 0) {
            setCounterLinks(linksUserAuthenticated.map((_, index) => index));
        }
    }, [linksUserAuthenticated]);

    const addCard = () => {
        setCounterLinks(prev => [...prev, prev.length]);
    };
    const removeCard = () => {
        setCounterLinks(prev => prev.slice(0, -1));
    };

    return (
        <div className={styles.container_link}>
            <h1 className={styles.h1}>Adicione seus links</h1>
            <span className={styles.text}>Adicione seus links abaixo e compartilhe todos os seus perfis com o mundo!</span>
            <button
                className={styles.btn_add}
                onClick={addCard}
            >
                <FiPlus />
                Adicionar novo link
            </button>

            <div className={styles.box_cards}>
                {
                    counterLinks.map((item, index) => (
                        (item < 5) &&
                        <Card
                            key={linksUserAuthenticated[index]?.id || index}
                            id={linksUserAuthenticated[index]?.id!}
                            indexLink={item + 1}
                            removeCard={removeCard}
                            dataLink={linksUserAuthenticated[index]}
                        />
                    ))
                }
            </div>
        </div>
    )
};
export default Links;
