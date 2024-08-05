import styles from './styles.module.scss';
import { IoClose } from "react-icons/io5";
import Button from '../Button';
import ListDropDown from './components/ListDropDown';
import { useEffect, useState } from 'react';
import ILink from '../../interfaces/ILink';
import { Controller } from 'react-hook-form';
import InputField from '../InputField';
import { CardFormData, cardFormSchema, useCustomForm } from '../../hooks/useFormSchema';
import { useLinks } from '../../context/LinksContext';


interface ICardProps {
    id: string,
    indexLink: number;
    removeCard: () => void;
    dataLink: ILink
};

const CardRegisterLinks = ({
    indexLink,
    dataLink,
    removeCard,
    id
}: ICardProps) => {
    const {
        addLink,
        updateLink,
        removeLink
    } = useLinks();
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useCustomForm<CardFormData>(cardFormSchema);
    useEffect(() => {
        reset({
            'platform': dataLink?.platform || "",
            'link': dataLink?.link || ""
        })
    }, [dataLink, reset]);
    const watchLink: string = watch('link');
    const watchPlatform: string = watch('platform');

    const [disabled, setDisabled] = useState<boolean>(false);
    useEffect(() => {
        if (
            (watchLink === dataLink?.link && watchPlatform === dataLink?.platform)
        ) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [watchLink, watchPlatform, dataLink]);

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
                        let isRemove = confirm("Você deseja excluir o link?");
                        if (isRemove) {
                            removeCard();
                            id && removeLink(id);
                        };
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
                    defaultValue=""
                    shouldUnregister={false}
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
                    defaultValue=""
                    render={({ field }) => (
                        <InputField
                            placeholder="Insira seu Link"
                            field={field}
                            error={!!errors?.link}
                            errorMessage={errors?.link?.message}
                        />
                    )}
                />
                <Button disabled={disabled}>
                    {
                        dataLink ? "atualizar" : "adicionar"
                    }
                </Button>
            </form>
        </div>
    )
};
export default CardRegisterLinks;
