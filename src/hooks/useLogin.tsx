import { useForm } from 'react-hook-form';
import { IFormData } from '../interfaces/IFormData';
import { zodResolver } from '@hookform/resolvers/zod';
import useFormSchema from './useFormSchema';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const URL_LOGIN = "http://localhost:5287/api/Login";

const useLogin = () => {
    const navigate = useNavigate();
    const { loginFormSchema } = useFormSchema();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormData>({
        resolver: zodResolver(loginFormSchema)
    });

    const onSubmit = async (data: IFormData) => {
        let email = { email: data.email };
        try {
            const response = await axios.post(URL_LOGIN, email, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.data;
            localStorage.setItem("token", data.acessToken);
       
            navigate('/');
        }
        catch (error) {
            console.error(error)
        }
    }

    return {
        register,
        handleSubmit,
        errors,
        onSubmit
    }
};
export default useLogin;
