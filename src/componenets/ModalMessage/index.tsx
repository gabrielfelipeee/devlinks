import styles from './styles.module.scss';
import { IoAlertCircle, IoCloseCircle, IoCheckmarkCircle } from "react-icons/io5";

type MessageType = 'alert' | 'error' | 'success';

interface IModalProps {
    message: string,
    typeMessage: MessageType
};

const ModalMessage = (
    {
        message,
        typeMessage
    }: IModalProps
) => {
    const iconMap = {
        alert: <IoAlertCircle className={styles.icon} />,
        error: <IoCloseCircle className={styles.icon} />,
        success: <IoCheckmarkCircle className={styles.icon} />,
    };

    return (
        <div
            className={`${styles.container_modal} ${typeMessage === 'error' ? styles.error : typeMessage === 'success' ? styles.success : styles.alert}`}
        >
            {iconMap[typeMessage]}
            {message}
        </div>
    );
};
export default ModalMessage;
