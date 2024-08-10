import styles from './index.module.scss';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className={styles.container_not_found}>
            <h1 className={styles.heading}>404 - Página Não Encontrada</h1>
            <p className={styles.text}>Desculpe, a página que você está procurando não existe.</p>
            <Link to="/" className={styles.button}>
                Voltar para a Página Inicial
            </Link>
        </div>
    );
};
export default NotFound;
