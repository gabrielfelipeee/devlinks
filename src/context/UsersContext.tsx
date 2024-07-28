import { createContext, ReactNode, useContext } from "react";
import { useQuery } from "react-query";
import apiClient from "../services/axiosInstance";
import { IUser } from "../interfaces/IUser";
import { jwtDecode } from "jwt-decode";
import { IToken } from "../interfaces/IToken";

export interface IUsersContext {
    users: IUser[],
    isLoading: boolean,
    error: any,
    userIdAuthenticated: string | null
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

const UsersProvider = ({ children }: IUsersProviderProps) => {
    const token = sessionStorage.getItem("token");

    const userIdAuthenticated = token ? jwtDecode<IToken>(token)?.nameid : null;
    const {
        data: users,
        isLoading,
        error
    } = useQuery('all-users', fetchAllUsers);

    return (
        <UsersContext.Provider value={{
            users,
            isLoading,
            error,
            userIdAuthenticated
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