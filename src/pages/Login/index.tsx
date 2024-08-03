import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import InputField from "../../componenets/InputField";
import InputFieldPassword from "../../componenets/InputFieldPassword";
import Button from "../../componenets/Button";
import useLogin from '../../hooks/useLogin';
import ModalMessage from '../../componenets/ModalMessage';
import { LoginFormData, loginFormSchema, useCustomForm } from '../../hooks/useFormSchema';
import { Controller } from 'react-hook-form';

const Login = () => {
    const {
        loginData,
        showModal,
        login
    } = useLogin();
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useCustomForm<LoginFormData>(loginFormSchema);


    return (
        <>
            {
                showModal && <ModalMessage message={loginData?.message!} typeMessage='error' />
            }
            <section className={styles.container_login_register}>
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
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <InputField
                                    placeholder="email"
                                    field={field}
                                    error={!!errors?.email}
                                    errorMessage={errors?.email?.message}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <InputFieldPassword
                                    placeholder="senha"
                                    field={field}
                                    error={!!errors?.password}
                                    errorMessage={errors?.password?.message}
                                />
                            )}
                        />
                        <Button>Entrar</Button>
                    </form>
                </div>
            </section>
        </>
    )
}
export default Login;
