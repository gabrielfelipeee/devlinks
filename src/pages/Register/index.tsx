import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

import InputField from "../../componenets/InputField";
import InputFieldPassword from "../../componenets/InputFieldPassword";
import Button from "../../componenets/Button";

import useRegister from '../../hooks/useRegister';

const Register = () => {
    const {
        register,
        errors,
        handleSubmit,
        onSubmit
    } = useRegister();

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
                        noValidate // Impede as validações padrões
                        onSubmit={handleSubmit(onSubmit)} // High-order-function -> passando uma função para outra função
                    >
                        <InputField
                            key="name"
                            placeholder="nome"
                            name="name"
                            register={register}
                            errorMessage={errors?.name?.message}
                            error={!!errors?.name}
                        />
                        <InputField
                            key="email"
                            type="email"
                            placeholder="email"
                            name="email"
                            register={register}
                            errorMessage={errors?.email?.message}
                            error={!!errors?.email}
                        />
                        <InputFieldPassword
                            key="password"
                            placeholder="Senha"
                            name="password"
                            register={register}
                            errorMessage={errors?.password?.message}
                            error={!!errors?.password}
                        />
                        <Button>Cadastrar</Button>
                    </form>
                </div>
            </section>
        
    )
}
export default Register;
