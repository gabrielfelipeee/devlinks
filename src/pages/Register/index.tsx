import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import InputField from "../../componenets/InputField";
import Button from "../../componenets/Button";
import { RegisterFormData, registerFormSchema, useCustomForm } from '../../hooks/useFormSchema';
import useRegister from '../../hooks/useRegister';
import { Controller } from 'react-hook-form';
import InputFieldPassword from '../../componenets/InputFieldPassword';

const Register = () => {
    const { registerUser } = useRegister();
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useCustomForm<RegisterFormData>(registerFormSchema);

    return (
        <section className={styles.container_login_register}>
            <div className={styles.box_login_register}>
                <h2>Bem-vindo de volta</h2>
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
                    <Button>Cadastrar</Button>
                </form>
            </div>
        </section>

    )
}
export default Register;
