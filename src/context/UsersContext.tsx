import { createContext, ReactNode, useContext } from "react";
import { useQuery } from "react-query";
import apiClient from "../services/axiosInstance";
import { IUser } from "../interfaces/IUser";

import { IToken } from "../interfaces/IToken";
import { jwtDecode } from "jwt-decode";

export interface IUsersContext {
    users: IUser[],
    isLoadingUsers: boolean,
    errorUsers: any,
    userAuthenticated: IUser | undefined,
    userIdAuthenticated: string | null,
    isLoadingUserAuthenticated: boolean,
    errorUserAuthenticated: any
}

interface IUsersProviderProps {
    children: ReactNode;
}

export const UsersContext = createContext<IUsersContext | undefined>(undefined);
UsersContext.displayName = "Users";

// Busca todos os usuários
const fetchAllUsers = async () => {
    const response = await apiClient.get('/users', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return response.data;
};

// Busca o usuário autenticado
const fetchUserAuthenticated = async (token: string, id: string) => {
    const response = await apiClient.get(`/users/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return response.data;
};

const UsersProvider = ({ children }: IUsersProviderProps) => {
    const token = sessionStorage.getItem("token");
    const userIdAuthenticated = token ? jwtDecode<IToken>(token)?.nameid : null;

    const {
        data: users,
        isLoading: isLoadingUsers,
        error: errorUsers,
    } = useQuery('all-users', fetchAllUsers);

    const {
        data: userAuthenticated,
        isLoading: isLoadingUserAuthenticated,
        error: errorUserAuthenticated
    } = useQuery({
        queryKey: ['user-authenticated'],
        queryFn: () => fetchUserAuthenticated(token!, userIdAuthenticated!),
        enabled: !!token && !!userIdAuthenticated
    });

    return (
        <UsersContext.Provider value={{
            users,
            isLoadingUsers,
            errorUsers,
            userIdAuthenticated,
            userAuthenticated,
            isLoadingUserAuthenticated,
            errorUserAuthenticated
        }}>
            {children}
        </UsersContext.Provider>
    );
};

export const useUsers = () => {
    const context = useContext(UsersContext);
    if (context === undefined) {
        throw new Error('useUsers deve ser usado dentro de um UsersProvider');
    }
    return context;
};

export default UsersProvider;
