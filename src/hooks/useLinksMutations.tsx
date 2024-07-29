import apiClient from "../services/axiosInstance"
import { useMutation, useQueryClient } from "react-query"
import { CardFormData } from "./useFormSchema"

// Adicionar um link
const addLink = async (data: CardFormData, token: string) => {

    const response = await apiClient.post('/links', data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

// Atualizar um link
const updateLink = async (data: CardFormData, id: string, token: string) => {
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

const useLinksMutations = () => {
    const queryClient = useQueryClient();
    const token = sessionStorage.getItem("token");

    const mutationAddLink = useMutation(
        (data: CardFormData) => addLink(data, token!),
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
        ({ data, id }: { data: CardFormData, id: string }) => updateLink(data, id, token!),
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

    return {
        addLink: mutationAddLink.mutate,
        updateLink: mutationUpdateLink.mutate,
        removeLink: mutationRemoveLink.mutate,
        isLoadingAdd: mutationAddLink.isLoading,
        errorAdd: mutationAddLink.error,
        isLoadingUpdate: mutationUpdateLink.isLoading,
        errorUpdate: mutationUpdateLink.error,
        isLoadingRemove: mutationRemoveLink.isLoading,
        errorRemove: mutationRemoveLink.error
    }
}
export default useLinksMutations;
