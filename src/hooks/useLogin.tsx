import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IFormData } from '../interfaces/IFormData';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/axiosInstance';
import { useMutation, useQueryClient } from 'react-query';
import { jwtDecode } from 'jwt-decode';
import { IToken } from '../interfaces/IToken';
import { ILoginData } from '../interfaces/ILoginData';
import { loginFormSchema } from './useFormSchema';

const useLogin = () => {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState<ILoginData>();
    const [showModal, setShowModal] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormData>({
        resolver: zodResolver(loginFormSchema)
    });

    const queryClient = useQueryClient();
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
                queryClient.invalidateQueries(['all-links']);
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
        showModal,
        login: mutationLogin.mutate
    };
};

export default useLogin;
