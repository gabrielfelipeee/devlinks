import styles from './styles.module.scss';
import { IoClose } from "react-icons/io5";
import { Controller } from 'react-hook-form';
import { Button, InputControllerField, ModalConfirm, ModalMessage, } from '../../components';
import { ListDropDown } from './components/ListDropDown';
import { useCardRegisterLinks } from '../../hooks';
import { IGetLink } from '../../interfaces';
import { LINK_STATUS_MESSAGES } from '../../data';

interface ICardRegisterLinksProps {
    idCurrentLink: string,
    indexLink: number,
    currentLink: IGetLink
};

export const CardRegisterLinks = ({
    indexLink,
    idCurrentLink,
    currentLink
}: ICardRegisterLinksProps) => {

    const {
        control,
        errors,
        handleSubmit,
        onSubmit,

        handleRemove,
        disabledButton,
        isModalOpen,
        setIsModalOpen,

        isSuccessCreateLink,
        isErrorCreateLink,
        isSuccessUpdateLink,
        isErrorUpdateLink
    } = useCardRegisterLinks({
        idLink: idCurrentLink,
        currentLink: currentLink
    });

    return (
        <>
            {
                isSuccessCreateLink && <ModalMessage {...LINK_STATUS_MESSAGES.CREATE_SUCCESS} />
            }
            {
                isErrorCreateLink && <ModalMessage {...LINK_STATUS_MESSAGES.CREATE_ERROR} />
            }
            {
                isSuccessUpdateLink && <ModalMessage {...LINK_STATUS_MESSAGES.UPDATE_SUCCESS} />
            }
            {
                isErrorUpdateLink && <ModalMessage {...LINK_STATUS_MESSAGES.UPDATE_ERROR} />
            }
            {
                isModalOpen && <ModalConfirm
                    title="Confirmação"
                    message="Você realmente deseja excluir o link?"
                    onCancel={() => setIsModalOpen(false)}
                    onConfirm={handleRemove}
                />
            }
            <div className={styles.container_card}>
                <div className={styles.box_text}>
                    <div className={styles.index_link}>
                        = Link #<span>{indexLink}
                        </span>
                    </div>
                    <IoClose
                        className={styles.btn_remove}
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>
                <form
                    onSubmit={handleSubmit((data) => onSubmit(data, idCurrentLink))}
                    className={styles.form}
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
                    <InputControllerField
                        name="link"
                        control={control}
                        errors={errors}
                        placeholder="Insira seu Link"
                    />
                    <Button disabled={disabledButton}>
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
