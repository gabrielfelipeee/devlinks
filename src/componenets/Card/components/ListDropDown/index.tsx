import styles from './styles.module.scss';
import IInputField from "../../../../interfaces/IInputField";
import { FaGithub, FaFacebook, FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useState } from 'react';

const ListDropDown = (
    {
        name,
        register,
        errorMessage,
        error,
    }: IInputField
) => {
    const [selectedPlatform, setSelectedPlatform] = useState("");
    const platforms = [
        { icon: FaYoutube, name: "YouTube" },
        { icon: FaFacebook, name: "Facebook" },
        { icon: FaGithub, name: "GitHub" },
        { icon: FaInstagram, name: "Instagram" },
        { icon: FaLinkedin, name: "Linkedin" }
    ];
    const SelectedIcon = platforms.find(platform => platform.name === selectedPlatform)?.icon;

    return (
        <div className={styles.container_list_drop}>
            <div className={styles.box_select}>
                {SelectedIcon && <SelectedIcon className={styles.icon} />}
                <select
                    className={`${styles.select} ${error ? styles.input_error : ""}`}
                    {...register(name)}
                    onChange={({ target: { value } }) => setSelectedPlatform(value)}
                >
                    <option value="" disabled hidden>Selecione uma plataforma</option>
                    {
                        platforms.map(({ name }, index) =>
                            <option key={index} value={name}>
                                {name}
                            </option>
                        )}
                </select>
            </div>
            {error && <p className={styles.input_error_message}>{errorMessage}</p>}
        </div>
    )
};
export default ListDropDown;
