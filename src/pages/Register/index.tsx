import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import InputField from "../../componenets/InputField";
import Button from "../../componenets/Button";
import { RegisterFormData, registerFormSchema, useCustomForm } from '../../hooks/useFormSchema';
import useRegister from '../../hooks/useRegister';
import { Controller } from 'react-hook-form';
import InputFieldPassword from '../../componenets/InputFieldPassword';
import ModalMessage from '../../componenets/ModalMessage';
import { useEffect, useState } from 'react';

const Register = () => {
    const {
        registerUser,
        isSuccess,
        isError,
        error
    } = useRegister();
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch
    } = useCustomForm<RegisterFormData>(registerFormSchema);
    const watchEmail = watch('email');

    // Mensagem de erro (se já existir uma conta com o email)
    const [customErrorMessageEmail, setCustomErrorMessageEmail] = useState<string | null>(null);
    useEffect(() => {
        if (error?.response?.status === 409) {
            setCustomErrorMessageEmail(error?.response?.data);
        }
    }, [error]);
    useEffect(() => {
        if (customErrorMessageEmail) {
            setCustomErrorMessageEmail(null);
        }
    }, [watchEmail]);

    return (
        <>
            {
                isSuccess && <ModalMessage message="Usuário cadastrado com sucesso" typeMessage='success' />
            }
            {
                isError && (error?.response?.status === 409)
                    ? <ModalMessage message={error.response.data} typeMessage='alert' />
                    : isError && <ModalMessage message="Ocorreu um erro ao cadastrar usuário" typeMessage='error' />
            }
            <section className={styles.container_login_register}>
                <div className={styles.box_login_register}>
                    <h2>Já tem uma conta?</h2>
                    <p>Acesse sua conta agora</p>
                    <Link to='/login'>Entrar</Link>
                </div>
                <div className={styles.box_form}>
                    <h1>Crie sua conta</h1>

                    <form
                        noValidate
                        onSubmit={handleSubmit((data) => registerUser(data))}
                    >
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            shouldUnregister={false}
                            render={({ field }) => (
                                <InputField
                                    placeholder="nome"
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
                                    placeholder="email"
                                    field={field}
                                    error={!!errors?.email || !!customErrorMessageEmail}
                                    errorMessage={errors?.email?.message || customErrorMessageEmail!}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            shouldUnregister={false}
                            render={({ field }) => (
                                <InputFieldPassword
                                    placeholder="senha"
                                    field={field}
                                    error={!!errors?.password}
                                    errorMessage={errors?.password?.message}
                                />
                            )}
                        />
                        <Button>Cadastrar</Button>
                    </form>
                </div>
            </section>
        </>

    )
}
export default Register;
