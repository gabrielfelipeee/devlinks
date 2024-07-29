import styles from './styles.module.scss';
import { IoClose } from "react-icons/io5";
import Button from '../Button';
import ListDropDown from './components/ListDropDown';
import { useEffect } from 'react';
import ILink from '../../interfaces/ILink';
import { Controller } from 'react-hook-form';
import { CardFormData, cardFormSchema, useCustomForm } from '../../hooks/useFormSchema';
import InputField from '../InputField';
import useLinksMutations from '../../hooks/useLinksMutations';

interface ICardProps {
    id: string,
    indexLink: number;
    removeCard: () => void;
    dataLink: ILink
};

const Card = ({
    indexLink,
    dataLink,
    removeCard,
    id
}: ICardProps) => {
    const {
        addLink,
        updateLink,
        removeLink,
    } = useLinksMutations();
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue
    } = useCustomForm<CardFormData>(cardFormSchema);
    useEffect(() => {
        setValue('platform', dataLink?.platform);
        setValue('link', dataLink?.link);
    }, [dataLink, setValue]);
    const onSubmit = (data: CardFormData, id: string) => {
        if (id?.length > 0) {
            updateLink({ data, id });
        } else {
            addLink(data);
        }
    };

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
                noValidate
            >
                <Controller
                    name="platform"
                    control={control}
                    render={({ field }) => (
                        <ListDropDown
                            field={field}
                            error={!!errors?.platform}
                            errorMessage={errors?.platform?.message}
                        />
                    )}
                />
                <Controller
                    name="link"
                    control={control}
                    render={({ field }) => (
                        <InputField
                            placeholder="Insira seu Link"
                            field={field}
                            error={!!errors?.link}
                            errorMessage={errors?.link?.message}
                        />
                    )}
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
