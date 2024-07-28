import { createContext, ReactNode, useContext } from "react";
import ILink from "../interfaces/ILink";
import apiClient from "../services/axiosInstance";
import { useQuery } from "react-query";

export interface ILinksContext {
    allLinks: ILink[];
    linksUserAuthenticated: ILink[];
    isLoadingAllLinks: boolean;
    isLoadingLinksUserAuthenticated: boolean;
    errorAllLinks: any;
    errorLinksUserAuthenticated: any;
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

    return (
        <LinksContext.Provider value={{
            allLinks,
            linksUserAuthenticated,
            isLoadingAllLinks,
            isLoadingLinksUserAuthenticated,
            errorAllLinks,
            errorLinksUserAuthenticated
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
