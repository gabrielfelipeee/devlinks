import { useForm } from 'react-hook-form';
import { IFormData } from '../interfaces/IFormData';
import { zodResolver } from '@hookform/resolvers/zod';
import useFormSchema from './useFormSchema';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/axiosInstance';
import { useMutation, useQueryClient } from 'react-query';

const useRegister = () => {
    const navigate = useNavigate();
    const { registerFormSchema } = useFormSchema();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormData>({
        resolver: zodResolver(registerFormSchema)
    });

    const queryClient = useQueryClient();
    const mutationRegister = useMutation(
        (data: IFormData) => apiClient.post('/users', data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['all-users']);
                navigate('/login');
            },
            onError: (error) => {
                console.error("Erro ao cadastrar usuário", error);
            }
        }
    );
    const onSubmit = (data: IFormData) => {
        mutationRegister.mutate(data);
    };

    return {
        register,
        errors,
        handleSubmit,
        onSubmit
    }
};
export default useRegister;
