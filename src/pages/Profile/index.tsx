import styles from './index.module.scss';
import { ModalMessage, Preview, Button, InputControllerField, Loading } from '../../components';
import { useEmailAndSlugConflictErrorHandling, useProfile, useUsersService } from '../../hooks';
import { USER_STATUS_MESSAGES } from '../../data';

export const Profile = () => {
    const token = sessionStorage.getItem("userIdAuthenticated");
    const {
        control,
        errors,
        handleSubmit,
        imagePreview,
        disabledButton,
        slugWatch,
        emailWatch
    } = useProfile();
    const {
        updateUser,
        errorUpdateUser,
        isSuccessUpdateUser,
        isErrorUpdateUser,
        isLoadingUserAuthenticated
    } = useUsersService();
    const {
        customErrorMessage
    } = useEmailAndSlugConflictErrorHandling({
        error: errorUpdateUser,
        watchSlug: slugWatch,
        watchEmail: emailWatch
    });

    return (
        <>
            {
                isErrorUpdateUser && (errorUpdateUser?.response?.data?.status === 409) // Conflito
                    ? <ModalMessage message={errorUpdateUser.response.data?.detail!} status='alert' />
                    : isErrorUpdateUser && <ModalMessage {...USER_STATUS_MESSAGES.UPDATE_ERROR} />
            }
            {
                isSuccessUpdateUser && <ModalMessage {...USER_STATUS_MESSAGES.UPDATE_SUCCESS} />
            }
            {
                isLoadingUserAuthenticated
                    ? <Loading />
                    : <div className={styles.container_profile}>
                        <div className={styles.box_profile}>
                            <div className={styles.box_info}>
                                <h1 className={styles.h1}>Detalhes do perfil</h1>
                                <span className={styles.text}>Adicione detalhes ao seu perfil</span>
                            </div>
                            <form
                                onSubmit={handleSubmit((data) => updateUser({ ...data, id: token! }))}
                                className={styles.form}
                            >
                                {imagePreview && (
                                    <div className={styles.preview_img}>
                                        <img className={styles.img} src={imagePreview} alt="Foto de perfil" />
                                    </div>
                                )}
                                <InputControllerField
                                    name="name"
                                    control={control}
                                    errors={errors}
                                    placeholder="insira seu nome"
                                />
                                <InputControllerField
                                    name="email"
                                    control={control}
                                    errors={errors}
                                    placeholder="insira seu email"
                                    customErrorMessage={customErrorMessage.email.toUpperCase()}
                                />
                                <InputControllerField
                                    name="avatar"
                                    control={control}
                                    errors={errors}
                                    placeholder="insira sua foto de perfil"
                                />
                                <InputControllerField
                                    name="slug"
                                    control={control}
                                    errors={errors}
                                    placeholder="crie seu slug"
                                    customErrorMessage={customErrorMessage.slug.toUpperCase()}
                                />
                                <Button disabled={disabledButton}>Salvar</Button>
                            </form>
                        </div>
                        <div className={styles.preview}>
                            <Preview />
                        </div>
                    </div>
            }
        </>
    )
};
