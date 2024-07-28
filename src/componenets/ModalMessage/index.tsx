import styles from './styles.module.scss';

interface IModalProps {
    message: string
};

const ModalMessage = (
    {
        message
    }: IModalProps
) => {
    return (
        <div className={styles.container_modal}>
            <span className={styles.title}>Erro</span>
            <span className={styles.message}>{message}</span>
        </div>
    );
};
export default ModalMessage;
