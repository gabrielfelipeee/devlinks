import { useForm } from "react-hook-form"
import { IFormData } from "../interfaces/IFormData"
import { zodResolver } from "@hookform/resolvers/zod"
import useFormSchema from "./useFormSchema"
import apiClient from "../services/axiosInstance"
import { useMutation, useQueryClient } from "react-query"

// Adicionar um link
const addLink = async (data: IFormData, token: string) => {

    const response = await apiClient.post('/links', data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

// Atualizar um link
const updateLink = async (data: IFormData, id: string, token: string) => {
    const link = { id, platform: data.platform, link: data.link }
    const response = await apiClient.put(`/links`, link, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return response.data;
};

const useLinkMutationsAndValidation = () => {
    const queryClient = useQueryClient();
    const token = sessionStorage.getItem("token");
    const { cardFormSchema } = useFormSchema();
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue
    } = useForm<IFormData>({
        resolver: zodResolver(cardFormSchema),
    });

    const mutationAddLink = useMutation(
        (data: IFormData) => addLink(data, token!),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['authenticated-links']);
                queryClient.invalidateQueries(['all-links']);
            },
            onError: () => {
                console.error("Erro ao adicionar link");
            }
        }
    );
    const mutationUpdateLink = useMutation(
        ({ data, id }: { data: IFormData, id: string }) => updateLink(data, id, token!),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['authenticated-links']);
                queryClient.invalidateQueries(['all-links']);
            },
            onError: () => {
                console.error("Erro ao atualizar link");
            }
        }
    );
    const mutationRemoveLink = useMutation(
        (id: string) => apiClient.delete(`\links/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['authenticated-links']);
                queryClient.invalidateQueries(['all-links']);
            },
            onError: (error) => {
                console.error("Erro ao remover link", error);
            }
        }
    );

    const onSubmit = async (data: IFormData, id: string) => {
        if (id?.length > 0) {
            mutationUpdateLink.mutate({ data, id });
        } else {
            mutationAddLink.mutate(data);
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        setValue,

        removeLink: mutationRemoveLink.mutate,

        isLoadingAdd: mutationAddLink.isLoading,
        errorAdd: mutationAddLink.error,
        isLoadingUpdate: mutationUpdateLink.isLoading,
        errorUpdate: mutationUpdateLink.error,
        isLoadingRemove: mutationRemoveLink.isLoading,
        errorRemove: mutationRemoveLink.error
    }
}
export default useLinkMutationsAndValidation;
