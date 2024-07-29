import styles from './styles.module.scss';
import { MdOutlineEmail, MdPersonAddAlt1, MdOutlineAddLink } from "react-icons/md";
import IInputField from '../../interfaces/IInputField';

const InputField = (
    {
        placeholder,
        field,
        errorMessage,
        error,
        type = "text",
    }: IInputField
) => {
    const icons = [
        { name: "email", icon: MdOutlineEmail },
        { name: "name", icon: MdPersonAddAlt1 },
        { name: "link", icon: MdOutlineAddLink }
    ];
    const Icon = icons.find(item => item.name === field.name)?.icon;

    return (
        <div className={styles.container_input_field}>
            <label>
                <input
                    className={error ? styles.input_error : ""}
                    type={type}
                    placeholder={placeholder}
                    {...field}
                    value={field.value || ""}
                />
                {Icon && <Icon className={styles.icon} />}
            </label>
            {<span className={styles.input_error_message}>{errorMessage}</span>}
        </div>
    )
};
export default InputField;
