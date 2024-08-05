import { Controller } from 'react-hook-form';
import Button from '../../componenets/Button';
import InputField from '../../componenets/InputField';
import styles from './index.module.scss';
import useUserMutation from '../../hooks/useUserMutation';
import useProfile from '../../hooks/useProfile';
import Preview from '../../componenets/Preview';
import ModalMessage from '../../componenets/ModalMessage';
import { useEffect, useState } from 'react';


const Profile = () => {
    const [customErrorMessage, setCustomErrorMessage] = useState({
        email: "",
        slug: ""
    });
    const {
        updateProfile,
        isSuccess,
        error
    } = useUserMutation();
    const {
        control,
        errors,
        handleSubmit,
        imagePreview,
        disabledButton,
        slugWatch,
        emailWatch
    } = useProfile();

    useEffect(() => {
        if (error?.response?.status === 409) {
            const message = error.response.data;
            if (message.includes("SLUG")) {
                setCustomErrorMessage({ slug: message, email: "" })
            } else if (message.includes("EMAIL")) {
                setCustomErrorMessage({ slug: "", email: message })
            }
        };
    }, [error]);
    useEffect(() => {
        setCustomErrorMessage({ email: "", slug: "" });
    }, [emailWatch, slugWatch]);



    return (
        <>
            {
                (error?.response?.status === 409) && <ModalMessage message={error?.response?.data} typeMessage='alert' />
            }
            {
                isSuccess && <ModalMessage message="Perfil atualizado com sucesso" typeMessage='success' />
            }
            <div className={styles.container_profile}>
                <div className={styles.box_profile}>
                    <div className={styles.box_info}>
                        <h1 className={styles.h1}>Detalhes do perfil</h1>
                        <span className={styles.text}>Adicione detalhes ao seu perfil</span>
                    </div>
                    <form
                        onSubmit={handleSubmit((data) => updateProfile(data))}
                        className={styles.form}
                    >
                        {imagePreview && (
                            <div className={styles.preview_img}>
                                <img className={styles.img} src={imagePreview} alt="Foto de perfil" />
                            </div>
                        )}
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            shouldUnregister={false}
                            render={({ field }) => (
                                <InputField
                                    placeholder="insira seu nome"
                                    field={field}
                                    error={!!errors?.name}
                                    errorMessage={errors?.name?.message}
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            shouldUnregister={false}
                            render={({ field }) => (
                                <InputField
                                    placeholder="insira seu email"
                                    field={field}
                                    error={!!errors?.email || !!customErrorMessage.email}
                                    errorMessage={errors?.email?.message || customErrorMessage?.email}
                                />
                            )}
                        />
                        <Controller
                            name="avatar"
                            control={control}
                            defaultValue=""
                            shouldUnregister={false}
                            render={({ field }) => (
                                <InputField
                                    placeholder="insira sua foto de perfil"
                                    field={field}
                                    error={!!errors?.avatar}
                                    errorMessage={errors?.avatar?.message}
                                />
                            )}
                        />
                        <Controller
                            name="slug"
                            control={control}
                            defaultValue=""
                            shouldUnregister={false}
                            render={({ field }) => (
                                <InputField
                                    placeholder="crie seu slug"
                                    field={field}
                                    error={!!errors?.slug || !!customErrorMessage.slug}
                                    errorMessage={errors?.slug?.message || customErrorMessage?.slug}
                                />
                            )}
                        />
                        <Button disabled={disabledButton}>Salvar</Button>
                    </form>
                </div>
                <div className={styles.preview}>
                    <Preview />
                </div>
            </div>
        </>
    )
};
export default Profile;
