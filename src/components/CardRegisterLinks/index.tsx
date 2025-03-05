import styles from './styles.module.scss';
import { IoClose } from "react-icons/io5";
import { Controller } from 'react-hook-form';
import { Button, InputControllerField, ModalConfirm } from '../../components';
import { ListDropDown } from './components/ListDropDown';
import { useCustomForm } from '../../hooks';
import { IGetLink, IPostAndPutLink } from '../../interfaces';
import { postAndPutLinkSchema } from '../../schemas';
import { useEffect, useState } from 'react';

interface ICardRegisterLinksProps {
    currentLink: IGetLink,
    numberLink: number,
    onSubmit: (id: string, dataLink: IPostAndPutLink) => void,
    deleteLink: (id: string) => void
};

export const CardRegisterLinks = ({
    numberLink,
    currentLink,
    onSubmit,
    deleteLink
}: ICardRegisterLinksProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useCustomForm({ schema: postAndPutLinkSchema });

    useEffect(() => {
        if (currentLink) {
            reset({
                link: currentLink.link || "",
                platform: currentLink.platform || ""
            });
        }
    }, [currentLink, reset]);

    useEffect(() => {
        if (currentLink?.link === watch("link") && currentLink?.platform === watch("platform")) {
            setIsButtonDisabled(true);
        } else {
            setIsButtonDisabled(false);
        }
    }, [currentLink, watch("link"), watch("platform")])

    return (
        <>
            {
                isModalOpen && <ModalConfirm
                    title="Confirmação"
                    message="Você realmente deseja excluir o link?"
                    onCancel={() => setIsModalOpen(false)}
                    onConfirm={() => {
                        deleteLink(currentLink?.id);
                        setIsModalOpen(false);
                    }}
                />
            }
            <div className={styles.container_card}>
                <div className={styles.box_text}>
                    <div className={styles.index_link}>
                        = Link #<span>{numberLink}
                        </span>
                    </div>
                    <IoClose
                        className={styles.btn_remove}
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>
                <form
                    onSubmit={handleSubmit((data) => onSubmit(currentLink?.id, data))}
                    className={styles.form}
                >
                    <Controller
                        name="platform"
                        control={control}
                        shouldUnregister={false}
                        render={({ field }) => (
                            <ListDropDown
                                field={field}
                                error={!!errors?.platform}
                                errorMessage={errors?.platform?.message}
                            />
                        )}
                    />
                    <InputControllerField
                        name="link"
                        control={control}
                        errors={errors}
                        placeholder="Insira seu Link"
                    />
                    <Button disabled={isButtonDisabled}>
                        {
                            currentLink ? "atualizar" : "adicionar"
                        }
                    </Button>
                </form>
            </div>
        </>
    )
};
export default CardRegisterLinks;
