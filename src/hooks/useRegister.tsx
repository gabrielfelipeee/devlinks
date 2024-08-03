import { useNavigate } from 'react-router-dom';
import apiClient from '../services/axiosInstance';
import { useMutation, useQueryClient } from 'react-query';
import { RegisterFormData } from './useFormSchema';

const useRegister = () => {
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const mutationRegister = useMutation(
        (data: RegisterFormData) => apiClient.post('/users', data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['all-users']);
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            },
            onError: (error) => {
                console.error("Erro ao cadastrar usuário", error);
            }
        }
    );

    return {
        registerUser: mutationRegister.mutate,
        isSuccessRegister: mutationRegister.isSuccess
    }
};
export default useRegister;
