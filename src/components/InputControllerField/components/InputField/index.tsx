import styles from './styles.module.scss';
import { IInputField } from '../../../../interfaces';
import { inputFieldsTypes } from '../../../../data';

export const InputField = (
    {
        placeholder,
        field,
        errorMessage,
        error,
        type = "text",
    }: IInputField
) => {
    const Icon = inputFieldsTypes.find(item => item.name === field.name)?.icon;

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
            {error && <span className={styles.input_error_message}>{errorMessage}</span>}
        </div>
    )
};
