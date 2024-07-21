import styles from './styles.module.scss';
import { MdOutlineEmail, MdPersonAddAlt1 } from "react-icons/md";
import IInputField from '../../interfaces/IInputField';

const InputField = (
    {
        placeholder,
        name,
        register,
        errorMessage,
        error,
        type = "text"
    }: IInputField
) => {
    return (
        <div className={styles.container_input_field}>
            <label>
                <input
                    className={error ? styles.input_error : ""}
                    type={type}
                    placeholder={placeholder}
                    {...register(name)}
                />
                {
                    type?.toLocaleLowerCase() === "email"
                        ? <MdOutlineEmail className={styles.icon} />
                        : <MdPersonAddAlt1 className={styles.icon} />
                }
            </label>
            {<span className={styles.input_error_message}>{errorMessage}</span>}
        </div>
    )
};
export default InputField;
