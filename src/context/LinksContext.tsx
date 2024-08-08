import { createContext, ReactNode, useContext } from "react";
import ILink from "../interfaces/ILink";
import apiClient from "../services/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CardFormData } from "../hooks/useFormSchema";

export interface ILinksContext {
    allLinks: ILink[];
    linksUserAuthenticated: ILink[];
    isLoadingAllLinks: boolean;
    isLoadingLinksUserAuthenticated: boolean;
    errorAllLinks: any;
    errorLinksUserAuthenticated: any;

    addLink: (data: CardFormData) => void;
    isSuccessAddLink: boolean;
    isErrorAddLink: boolean;
    updateLink: (data: { data: CardFormData; id: string }) => void;
    isSuccessUpdateLink: boolean;
    isErrorUpdateLink: boolean;
    removeLink: (id: string) => void;
};
interface ILinksProviderProps {
    children: ReactNode;
};

export const LinksContext = createContext<ILinksContext | undefined>(undefined);
LinksContext.displayName = "Links";

// Busca todos os links
const fetchAllLinks = async () => {
    const response = await apiClient.get('/links/all', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return response.data;
};

// Busca somente os links do usuário autenticado
const fetchLinksUserAuthenticated = async (token: string) => {
    const response = await apiClient.get('/links/authenticated', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return response.data;
};

export const LinksProvider = ({ children }: ILinksProviderProps) => {
    const token = sessionStorage.getItem("token");
    const queryClient = useQueryClient();

    const {
        data: allLinks,
        isLoading: isLoadingAllLinks,
        error: errorAllLinks
    } = useQuery('all-links', fetchAllLinks);

    const {
        data: linksUserAuthenticated,
        isLoading: isLoadingLinksUserAuthenticated,
        error: errorLinksUserAuthenticated
    } = useQuery(
        ['authenticated-links', token],
        () => fetchLinksUserAuthenticated(token!), // token! -> garante que token não seja nulo
        { enabled: !!token } // Só será executada se o token estiver presente
    );

    // Adiciona um link
    const mutationAddLink = useMutation(
        (data: CardFormData) => apiClient.post('links/', data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }),
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

    // Atualiza um link
    const mutationUpdateLink = useMutation(
        ({ data, id }: { data: CardFormData; id: string }) => apiClient.put('/links/', { ...data, id }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }),
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

    // Remove um link
    const mutationRemoveLink = useMutation(
        (id: string) => apiClient.delete(`/links/${id}`, {
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

    return (
        <LinksContext.Provider value={{
            allLinks,
            linksUserAuthenticated,
            isLoadingAllLinks,
            isLoadingLinksUserAuthenticated,
            errorAllLinks,
            errorLinksUserAuthenticated,

            addLink: mutationAddLink.mutate,
            isSuccessAddLink: mutationAddLink.isSuccess,
            isErrorAddLink: mutationAddLink.isError,
            updateLink: mutationUpdateLink.mutate,
            isSuccessUpdateLink: mutationUpdateLink.isSuccess,
            isErrorUpdateLink: mutationUpdateLink.isError,
            removeLink: mutationRemoveLink.mutate,
        }}>
            {children}
        </LinksContext.Provider>
    );
};

export const useLinks = () => {
    const context = useContext(LinksContext);
    if (context === undefined) {
        throw new Error('useLinks deve ser usado dentro de um LinksProvider');
    }
    return context;
};
export default LinksProvider;
