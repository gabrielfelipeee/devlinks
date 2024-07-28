import styles from './styles.module.scss';
import { IoClose } from "react-icons/io5";

import Button from '../Button';
import InputField from '../InputField';
import ListDropDown from './components/ListDropDown';
import { useEffect } from 'react';
import ILink from '../../interfaces/ILink';
import useLinkMutationsAndValidation from '../../hooks/useLinkMutationsAndValidation';

interface ICard {
    id: string,
    indexLink: number;
    removeCard: () => void;
    dataLink: ILink,
};

const Card = ({
    indexLink,
    dataLink,
    removeCard,
    id
}: ICard) => {
    const {
        errors,
        handleSubmit,
        register,
        onSubmit,
        setValue,
        removeLink
    } = useLinkMutationsAndValidation();

    useEffect(() => {
        setValue('platform', dataLink?.platform);
        setValue('link', dataLink?.link);
        
    }, [dataLink, setValue]);


    return (
        <div className={styles.container_card}>
            <div className={styles.box_text}>
                <div className={styles.index_link}>
                    = Link #<span>{indexLink}
                    </span>
                </div>
                <IoClose
                    className={styles.btn_remove}
                    onClick={() => {
                        removeCard();
                        id && removeLink(id);
                    }}
                />
            </div>
            <form
                onSubmit={handleSubmit((data) => onSubmit(data, id))}
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
                <Button>
                    {
                        dataLink && (dataLink.link || dataLink.platform) ? "atualizar" : "salvar"
                    }
                </Button>
            </form>
        </div>
    )
};
export default Card;
