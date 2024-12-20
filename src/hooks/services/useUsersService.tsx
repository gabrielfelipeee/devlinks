import { useMutation, useQuery, useQueryClient } from 'react-query';
import { userService } from '../../services'
import { IError, IPutUser } from '../../interfaces';
import { useNavigate } from 'react-router-dom';

export const useUsersService = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const isUserAuthenticated = sessionStorage.getItem("userIdAuthenticated") !== null;

    // Busca o usuário pelo id
    const queryUserById = (id: string) => {
        return useQuery(
            ["user-by-id", id],
            () => userService.getUserById(id), {
            enabled: !!id
        }
        )
    };

    // Busca o usuário pelo slug
    const queryUserBySlug = (slug: string) => {
        return useQuery(
            ["user-by-slug", slug],
            () => userService.getUserBySlug(slug), {
            enabled: !!slug
        }
        )
    };

    // Busca o usuário autenticado
    const getUserAuthenticated = useQuery("user-authenticated", userService.getUserAuthenticated, {
        enabled: isUserAuthenticated// A query só é executada se o usuário estiver autenticado
    });

    const createUserMutation = useMutation(userService.postUser, {
        onSuccess: () => {
            setTimeout(() => {
                navigate('/login');
            }, 2800)
        }
    });

    const updateUserMutation = useMutation(
        ({ id, userData }: { id: string, userData: IPutUser }) => userService.putUser(id, userData),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('user-authenticated');
            }
        }
    );

    return {
        queryUserById,
        queryUserBySlug,

        userAuthenticated: getUserAuthenticated.data,
        isLoadingUserAuthenticated: getUserAuthenticated.isLoading,

        createUser: createUserMutation.mutate,
        errorCreateUser: createUserMutation.error as IError,
        isSuccessCreateUser: createUserMutation.isSuccess,
        isErrorCreateUser: createUserMutation.isError,
        isLoadingCreateUser: createUserMutation.isLoading,

        updateUser: updateUserMutation.mutate,
        errorUpdateUser: updateUserMutation.error as IError,
        isSuccessUpdateUser: updateUserMutation.isSuccess,
        isErrorUpdateUser: updateUserMutation.isError,
    }
};
