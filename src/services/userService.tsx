import { IGetUser, IPostUser, IPutUser } from '../interfaces';
import api from './api';

export const userService = {
    getUserById: async (id: string): Promise<IGetUser> => {
        try {
            const response = await api.get(`/users/by-id/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar usuário pelo id:", error);
            throw error;
        }
    },
    getUserBySlug: async (slug: string): Promise<IGetUser> => {
        try {
            const response = await api.get(`/users/by-slug/${slug}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar usuário pelo slug:", error);
            throw error;
        }
    },

    getUserAuthenticated: async (): Promise<IGetUser> => {
        try {
            const response = await api.get('/users/authenticated');
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar o usuário autenticado:", error);
            throw error;
        }
    },

    postUser: async (userData: IPostUser) => {
        try {
            const response = await api.post('/users', userData);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            throw error;
        }
    },

    putUser: async (id: string, userData: IPutUser) => {
        try {
            const response = await api.put(`/users/${id}`, userData);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            throw error;  // O erro é lançado novamente para o React Query poder capturá-lo
        }
    }
}
