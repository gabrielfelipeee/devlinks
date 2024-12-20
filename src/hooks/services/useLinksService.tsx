import { useMutation, useQuery, useQueryClient } from 'react-query';
import { linkService } from '../../services'
import { IPostAndPutLink } from '../../interfaces';

export const useLinksService = () => {
    const queryClient = useQueryClient();
    const isUserAuthenticated = sessionStorage.getItem("userIdAuthenticated") !== null;

    // Busca links pelo id do usuário
    const queryLinksByUserId = (userId: string) => {
        return useQuery(
            ["links-userId", userId],
            () => linkService.getLinksByUserId(userId),
            {
                enabled: !!userId, // Só executa se o userId existir
            }
        );
    };

    // Busca os Links do usuário autenticado
    const queryLinksUserAuthenticated = useQuery("links-userAuthenticated", linkService.getLinksUserAuthenticated,
        {
            enabled: isUserAuthenticated
        }
    );

    const createLinkMutation = useMutation(linkService.postLink, {
        onSuccess: () => {
            queryClient.invalidateQueries('links-userAuthenticated')
        }
    });

    const updateLinkMutation = useMutation(
        ({ id, linkData }: { id: string, linkData: IPostAndPutLink }) => linkService.putLink(id, linkData),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('links-userAuthenticated')
            }
        }
    );

    const deleteLinkMutation = useMutation(linkService.deleteLink, {
        onSuccess: () => {
            queryClient.invalidateQueries('links-userAuthenticated')
        }
    });

    return {
        queryLinksByUserId,

        linksUserAuthenticated: queryLinksUserAuthenticated.data,
        isLoadinglinkAuthenticated: queryLinksUserAuthenticated.isLoading,

        createLink: createLinkMutation.mutate,
        isSuccessCreateLink: createLinkMutation.isSuccess,
        isErrorCreateLink: createLinkMutation.isError,

        updateLink: updateLinkMutation.mutate,
        isSuccessUpdateLink: updateLinkMutation.isSuccess,
        isErrorUpdateLink: updateLinkMutation.isError,

        deleteLink: deleteLinkMutation.mutate
    }
};
