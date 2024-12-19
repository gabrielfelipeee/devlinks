import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { postUserSchema } from '../../schemas';
import { useCustomForm, useUsersService } from '../../hooks';
import { Button, InputControllerField, Loading, ModalMessage } from '../../components';
import { useEmailAndSlugConflictErrorHandling } from '../../hooks';
import { USER_STATUS_MESSAGES } from '../../data';

export const Register = () => {
    const {
        createUser,
        errorCreateUser,
        isSuccessCreateUser,
        isErrorCreateUser,
        isLoadingCreateUser
    } = useUsersService();
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch
    } = useCustomForm({ schema: postUserSchema });
    const {
        customErrorMessage
    } = useEmailAndSlugConflictErrorHandling({ watchEmail: watch("email"), error: errorCreateUser });


    return (
        <>
            {
                isErrorCreateUser && (errorCreateUser?.response?.data?.status === 409) // Conflito
                    ? <ModalMessage message={errorCreateUser.response.data?.detail!} status='alert' />
                    : isErrorCreateUser && <ModalMessage {...USER_STATUS_MESSAGES.LOGIN_ERROR} />
            }
            {
                isSuccessCreateUser && <ModalMessage {...USER_STATUS_MESSAGES.CREATE_SUCCESS} />
            }
            {
                isLoadingCreateUser
                    ? <Loading />
                    : <section className={styles.container_login_register}>
                        <div className={styles.box_login_register}>
                            <h2>Já tem uma conta?</h2>
                            <p>Acesse sua conta agora</p>
                            <Link to='/login'>Entrar</Link>
                        </div>
                        <div className={styles.box_form}>
                            <h1>Crie sua conta</h1>

                            <form
                                noValidate
                                onSubmit={handleSubmit((data) => createUser(data))}
                            >
                                <InputControllerField
                                    name="name"
                                    control={control}
                                    errors={errors}
                                    placeholder="nome"
                                />
                                <InputControllerField
                                    name="email"
                                    control={control}
                                    errors={errors}
                                    customErrorMessage={customErrorMessage.email}
                                />
                                <InputControllerField
                                    name="password"
                                    control={control}
                                    errors={errors}
                                    placeholder="senha"
                                    isPasswordField
                                />
                                <Button>Cadastrar</Button>
                            </form>
                        </div>
                    </section>
            }
        </>
    )
}
