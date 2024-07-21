import { useForm } from 'react-hook-form';
import { IFormData } from '../interfaces/IFormData';
import { zodResolver } from '@hookform/resolvers/zod';
import useFormSchema from './useFormSchema';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const URL_REGISTER = "http://localhost:5287/api/Users";

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

    const onSubmit = async (data: IFormData) => {
        const user = {
            name: data.name,
            email: data.email
        };

        try {
            const responde = await axios.post(URL_REGISTER, user, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const data = await responde.data;
            console.log(data);
            navigate('/login');
        }
        catch (error) {
            console.error("Erro ao adicionar user:", error);
        }
    };

    return {
        register,
        errors,
        handleSubmit,
        onSubmit
    }
};
export default useRegister;
