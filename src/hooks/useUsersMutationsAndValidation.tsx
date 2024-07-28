import { useForm } from "react-hook-form"
import { IFormData } from "../interfaces/IFormData"
import { zodResolver } from "@hookform/resolvers/zod"
import useFormSchema from "./useFormSchema"
import { useEffect, useState } from "react"
import defaultAvatar from '../assets/user.png';
import { useUsers } from "../context/UsersContext"
import apiClient from "../services/axiosInstance"
import { useMutation, useQueryClient } from "react-query"

const useUsersMutationsAndValidation = () => {
    const { profileFormSchema } = useFormSchema();
    const token = sessionStorage.getItem("token");
    const { users } = useUsers();

    const userIdAuthenticated = sessionStorage.getItem("userIdAuthenticated")!;
    const userAuthenticated = users?.find(item => item.id === userIdAuthenticated);
    const [imagePreview, setImagePreview] = useState<string>(defaultAvatar);

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        watch
    } = useForm<IFormData>({
        resolver: zodResolver(profileFormSchema),
    });
    const avatarWatch = watch('avatar');
    useEffect(() => {
        setValue('avatar', userAuthenticated?.avatar);
        setValue('name', userAuthenticated?.name);
        setValue('email', userAuthenticated?.email);
        setImagePreview((userAuthenticated?.avatar != null && userAuthenticated?.avatar.length > 0) ? userAuthenticated.avatar : defaultAvatar);
    }, [userAuthenticated, token]);
    useEffect(() => {
        avatarWatch && setImagePreview(avatarWatch);
    }, [avatarWatch]);

    const queryClient = useQueryClient();
    const mutationUpdateProfile = useMutation(
        ({ data, id }: { data: IFormData, id: string }) => apiClient.put('/users', { ...data, id }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['all-users']);
            },
            onError: (error) => {
                console.log("Erro ao atualizar usuário", error);
            }
        }
    );


    const onSubmit = (data: IFormData) => {
        mutationUpdateProfile.mutate({ data, id: userIdAuthenticated })
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        imagePreview
    }
}
export default useUsersMutationsAndValidation;
