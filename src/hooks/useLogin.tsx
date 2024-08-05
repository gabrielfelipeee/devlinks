import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/axiosInstance';
import { useMutation, useQueryClient } from 'react-query';
import { jwtDecode } from 'jwt-decode';
import { IToken } from '../interfaces/IToken';
import { ILoginData } from '../interfaces/ILoginData';
import { LoginFormData } from './useFormSchema';

const useLogin = () => {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState<ILoginData>();
    const [showModal, setShowModal] = useState(false);


    const queryClient = useQueryClient();
    const mutationLogin = useMutation(
        (data: LoginFormData) => apiClient.post('/login', data, {
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
                    queryClient.invalidateQueries(['all-links']);
                    queryClient.refetchQueries('user-authenticated');
                    navigate('/');
                };
                setLoginData(responseData);
            },
            onError: (error) => {
                console.error("Erro ao fazer login", error);
            }
        }
    );

    // Mostrar modal de erro
    useEffect(() => {
        if (loginData?.authenticated === false) {
            setShowModal(true);
        }
        const timer = setTimeout(() => {
            setLoginData(undefined);
            setShowModal(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, [loginData, setLoginData]);

    return {
        loginData,
        showModal,
        login: mutationLogin.mutate
    };
};
export default useLogin;
