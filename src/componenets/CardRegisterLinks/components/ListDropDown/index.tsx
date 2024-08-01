import styles from './styles.module.scss';
import IInputField from "../../../../interfaces/IInputField";
import platforms from '../../../../data/platforms';

const ListDropDown = (
    {
        field,
        errorMessage,
        error
    }: IInputField
) => {

    
    const SelectedIcon = platforms.find(platform => platform.name === field.value)?.icon;

    return (
        <div className={styles.container_list_drop}>
            <div className={styles.box_select}>
                {SelectedIcon && <SelectedIcon className={styles.icon} />}
                <select
                    className={`${styles.select} ${error ? styles.input_error : ""}`}
                   {...field}
                >
                    <option value="" hidden>Selecione uma plataforma</option>
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
