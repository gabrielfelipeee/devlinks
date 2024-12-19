import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { loginSchema } from '../../schemas';
import { useLoginService, useCustomForm } from '../../hooks';
import { ModalMessage, Button, InputControllerField, Loading } from '../../components';
import { USER_STATUS_MESSAGES } from '../../data';

export const Login = () => {
    const {
        login,
        errorLogin,
        isErrorLogin,
        isLoadingLogin
    } = useLoginService();
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useCustomForm({ schema: loginSchema });

    return (
        <>
            {
                (isErrorLogin && errorLogin?.response?.data?.authenticated === false) // Email ou senha incorretos
                    ? <ModalMessage message={errorLogin.response?.data?.message!} status='error' />
                    : isErrorLogin && <ModalMessage {...USER_STATUS_MESSAGES.LOGIN_ERROR} />
            }
            {
                isLoadingLogin
                    ? <Loading />
                    : <section className={styles.container_login_register}>
                        <div className={styles.box_login_register}>
                            <h2>Ainda não tem conta?</h2>
                            <p>Cadastre-se agora</p>
                            <Link to="/cadastro">Criar conta</Link>
                        </div>
                        <div className={styles.box_form}>
                            <h1>Entre na sua conta</h1>
                            <form
                                noValidate
                                onSubmit={handleSubmit((data) => login(data))}
                            >
                                <InputControllerField
                                    name="email"
                                    control={control}
                                    errors={errors}
                                />
                                <InputControllerField
                                    name="password"
                                    control={control}
                                    errors={errors}
                                    placeholder="senha"
                                    isPasswordField
                                />
                                <Button>Entrar</Button>
                            </form>
                        </div>
                    </section>
            }
        </>
    )
}
