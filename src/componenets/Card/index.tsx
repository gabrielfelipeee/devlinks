import styles from './styles.module.scss';
import { IoClose } from "react-icons/io5";

import useCard from '../../hooks/useCard';
import Button from '../Button';
import InputField from '../InputField';
import ListDropDown from './components/ListDropDown';

interface ICard {
    indexLink: number,
    removeLink : () => void
}

const Card = ({ indexLink, removeLink }: ICard) => {
    const {
        errors,
        handleSubmit,
        register,
        onSubmit
    } = useCard();

    return (
        <div className={styles.container_card}>
            <div className={styles.box_text}>
                <div className={styles.index_link}>
                    = Link #<span>{indexLink}
                    </span>
                </div>
                <IoClose
                    className={styles.btn_remove}
                    onClick={removeLink}
                />
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.form}
            >
                <ListDropDown
                    name="platform"
                    register={register}
                    error={!!errors?.platform}
                    errorMessage={errors?.platform?.message}
                />
                <InputField
                    name="link"
                    placeholder="Insira seu Link"
                    register={register}
                    error={!!errors?.link}
                    errorMessage={errors?.link?.message}
                />
                <Button>Salvar</Button>
            </form>
        </div>
    )
};
export default Card;
