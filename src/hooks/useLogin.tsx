import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IFormData } from '../interfaces/IFormData';
import { zodResolver } from '@hookform/resolvers/zod';
import useFormSchema from './useFormSchema';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/axiosInstance';
import { useMutation } from 'react-query';
import { jwtDecode } from 'jwt-decode';
import { IToken } from '../interfaces/IToken';
import { ILoginData } from '../interfaces/ILoginData';

const useLogin = () => {
    const navigate = useNavigate();
    const { loginFormSchema } = useFormSchema();

    const [loginData, setLoginData] = useState<ILoginData>();
    const [showModal, setShowModal] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormData>({
        resolver: zodResolver(loginFormSchema)
    });

    const mutationLogin = useMutation(
        (data: IFormData) => apiClient.post('/login', data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }),
        {
            onSuccess: (response) => {
                const responseData = response.data;
                if (responseData.authenticated) {
                    sessionStorage.setItem("token", responseData.acessToken);
                    const decodedToken = jwtDecode<IToken>(responseData.acessToken!);
                    sessionStorage.setItem("userIdAuthenticated", decodedToken.nameid);
                    navigate('/');
                };
                setLoginData(responseData);
            },
            onError: (error) => {
                console.error("Erro ao fazer login", error);
            }
        }
    );
    const onSubmit = (data: IFormData) => {
        mutationLogin.mutate(data);
    };

    // Mostrar modal de erro
    useEffect(() => {
        if (loginData?.authenticated === false) {
            setShowModal(true);
        }
        const timer = setTimeout(() => {
            setLoginData(undefined);
            setShowModal(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, [loginData, setLoginData]);

    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
        loginData,
        showModal
    };
};

export default useLogin;
