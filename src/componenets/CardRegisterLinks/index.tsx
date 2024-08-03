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
import ModalMessage from '../ModalMessage';

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
        removeLink,
        isSuccessAddLink,
        isSuccessUpdateLink
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
        <>
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
                            dataLink ? "atualizar" : "adicionar"
                        }
                    </Button>
                </form>
            </div>
            {isSuccessAddLink && <ModalMessage message="Link adicionado com sucesso" typeMessage="success" />}
            {isSuccessUpdateLink && <ModalMessage message="Link atualizado com sucesso" typeMessage="success" />}
        </>
    )
};
export default CardRegisterLinks;
