import apiClient from "../services/axiosInstance"
import { useMutation, useQueryClient } from "react-query"
import { ProfileFormData } from "./useFormSchema";

const useUserMutation = () => {
    const token = sessionStorage.getItem("token");
    const userIdAuthenticated = sessionStorage.getItem("userIdAuthenticated")!;

    const queryClient = useQueryClient();
    const mutationUpdateProfile = useMutation(
        (data: ProfileFormData) => apiClient.put('/users', { ...data, id: userIdAuthenticated }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['all-users']);
                queryClient.invalidateQueries(['user-authenticated']);
            },
            onError: (error) => {
                console.log("Erro ao atualizar usuário", error);
            }
        }
    );

    return {
        token,
        updateProfile: mutationUpdateProfile.mutate,
    }
}
export default useUserMutation;
