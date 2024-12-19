import styles from './styles.module.scss';
import { IoAlertCircle, IoCloseCircle, IoCheckmarkCircle } from "react-icons/io5";

type status = 'alert' | 'error' | 'success';

interface IModalProps {
    message: string,
    status: status
};

export const ModalMessage = (
    {
        message,
        status
    }: IModalProps
) => {
    const iconMap = {
        alert: <IoAlertCircle className={styles.icon} />,
        error: <IoCloseCircle className={styles.icon} />,
        success: <IoCheckmarkCircle className={styles.icon} />,
    };

    return (
        <div
            className={`${styles.container_modal} ${status === 'error' ? styles.error : status === 'success' ? styles.success : styles.alert}`}
        >
            {iconMap[status]}
            {message}
        </div>
    );
};
