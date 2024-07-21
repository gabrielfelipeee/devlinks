import styles from './styles.module.scss';
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { GiPadlock } from "react-icons/gi";
import IInputField from '../../interfaces/IInputField';


const InputFieldPassword = (
    {
        placeholder,
        name,
        register,
        errorMessage,
        error
    }: IInputField
) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleInputType = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.container_input_field_password}>
            <label>
                <input
                    className={error ? (styles.input_error) : ""}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    {...register(name)}
                />
                <GiPadlock className={styles.icon} />
                <div
                    className={styles.box_icons_eye}
                    onClick={handleInputType}
                >
                    {
                        showPassword
                            ? <IoMdEye className={styles.icon} />
                            : <IoMdEyeOff className={styles.icon} />
                    }
                </div>
            </label>
            <span className={styles.input_error_message}>{errorMessage}</span>
        </div>
    )
};
export default InputFieldPassword;
