import styles from './styles.module.scss';
import { Link, useNavigate } from 'react-router-dom';

import InputField from "../../componenets/InputField";
import InputFieldPassword from "../../componenets/InputFieldPassword";
import Button from "../../componenets/Button";
import useLogin from '../../hooks/useLogin';
import ModalMessage from '../../componenets/ModalMessage';
import { useEffect, useState } from 'react';


const Login = () => {
    const {
        register,
        errors,
        handleSubmit,
        onSubmit,
        loginData,
        showModal
    } = useLogin();

    return (
        <>
            {showModal && <ModalMessage message={loginData?.message!} />}
            <section className={styles.container_login_register}>
                <div className={styles.box_login_register}>
                    <h2>Cadastre-se</h2>
                    <p>Cadastre-se agora</p>
                    <Link to="/cadastro">Cadastrar</Link>
                </div>
                <div className={styles.box_form}>
                    <h1>Entre na sua conta </h1>
                    <form
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <InputField
                            type="email"
                            name="email"
                            placeholder="email"
                            register={register}
                            error={!!errors?.email}
                            errorMessage={errors?.email?.message}
                        />
                        <InputFieldPassword
                            name="password"
                            placeholder="senha"
                            register={register}
                            error={!!errors?.password}
                            errorMessage={errors?.password?.message}
                        />
                        <Button>Entrar</Button>
                    </form>

                </div>

            </section>
        </>
    )
}
export default Login;
