import { useMutation, useQuery, useQueryClient } from 'react-query';
import { linkService } from '../../services'

export const useLinksService = () => {
    const queryClient = useQueryClient();
    const isUserAuthenticated = sessionStorage.getItem("userIdAuthenticated") !== null;

    // Busca links pelo id do usuário
    const getLinksByUserId = (userId: string) => {
        return useQuery(
            ["links-userId", userId],
            () => linkService.getLinksByUserId(userId),
            {
                enabled: !!userId, // Só executa se o userId existir
            }
        );
    };

    // Busca os Links do usuário autenticado
    const queryLinksUserAuthenticated = useQuery("links-userAuthenticated", linkService.getLinksUserAuthenticated, {
        enabled: isUserAuthenticated
    });


    const createLinkMutation = useMutation(linkService.postLink, {
        onSuccess: () => {
            queryClient.invalidateQueries('links-userAuthenticated')
        }
    });

    const updateLinkMutation = useMutation(linkService.putLink, {
        onSuccess: () => {
            queryClient.invalidateQueries('links-userAuthenticated')
        }
    });

    const deleteLinkMutation = useMutation(linkService.deleteLink, {
        onSuccess: () => {
            queryClient.invalidateQueries('links-userAuthenticated')
        }
    });

    return {
        getLinksByUserId,

        linksUserAuthenticated: queryLinksUserAuthenticated.data,
        isLoadinglinkAuthenticated: queryLinksUserAuthenticated.isLoading,

        createLink: createLinkMutation.mutate,
        isSuccessCreateLink: createLinkMutation.isSuccess,
        isErrorCreateLink: createLinkMutation.isError,

        updateLink: updateLinkMutation.mutate,
        isErrorUpdateLink: updateLinkMutation.isError,
        isSuccessUpdateLink: updateLinkMutation.isSuccess,

        deleteLink: deleteLinkMutation.mutate
    }
};
