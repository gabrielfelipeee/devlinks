import styles from './styles.module.scss';
import Card from '../../componenets/Card';
import { FiPlus } from "react-icons/fi";
import { useState } from 'react';

const Links = () => {
    const [counterLinks, setCounterLinks] = useState<number[]>([0]);
    const addLink = () => {
        setCounterLinks(prev => [...prev, prev.length])
    };
    const removeLink = () => {
        setCounterLinks(prev => prev.slice(0, -1));
    };

    return (
        <div className={styles.container_link}>
            <h1 className={styles.h1}>Adicione seus links</h1>
            <span className={styles.text}>Adicione seus links abaixo e compartilhe todos os seus perfis com o mundo!</span>
            <button
                className={styles.btn_add}
                onClick={addLink}
            >
                <FiPlus />
                Adicionar novo link
            </button>

            <div className={styles.box_cards}>
                {
                    counterLinks.map(item => (
                        (item > 0 && item < 6) && <Card key={item} indexLink={item} removeLink={removeLink} />
                    ))
                }
            </div>
        </div>
    )
};
export default Links;
