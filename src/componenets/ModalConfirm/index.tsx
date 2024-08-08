import styles from './styles.module.scss';
import { IoClose } from "react-icons/io5";


interface IModalConfirmProps {
  title: string,
  message: string,
  onCancel: () => void,
  onConfirm: () => void
}

const ModalConfirm = (
  {
    title,
    message,
    onCancel,
    onConfirm
  }: IModalConfirmProps
) => {
  return (
    <div className={styles.container_modal}>
      <div className={styles.box_head}>
        <h2 className={styles.h2}>{title}</h2>
        <IoClose className={styles.icon} onClick={onCancel}/>
      </div>
      <div className={styles.box_confirm}>
        <p className={styles.text}>{message}</p>
        <div className={styles.box_btn}>
          <button
            className={styles.btn_cancel}
            onClick={onCancel}
          >
            cancelar
          </button>
          <button
            className={styles.btn_delete}
            onClick={onConfirm}
          >
            apagar
          </button>
        </div>
      </div>
    </div>
  );
};
export default ModalConfirm;
