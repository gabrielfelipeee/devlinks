import api from "./api";
import { IGetLink, IPostAndPutLink } from "../interfaces";

export const linkService = {
    getLinksByUserId: async (id: string): Promise<IGetLink[]> => {
        try {
            const response = await api.get(`/links/user/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar links pelo id do usuário:", error);
            throw error;
        }
    },

    getLinksUserAuthenticated: async (): Promise<IGetLink[]> => {
        try {
            var response = await api.get('/links/user/authenticated');
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar os links do usuário autenticado:", error);
            throw error;
        }
    },

    postLink: async (linkData: IPostAndPutLink) => {
        try {
            const response = await api.post('/links', linkData);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar link:", error);
            throw error;
        }
    },

    putLink: async (linkData: IPostAndPutLink) => {
        try {
            const response = await api.put('/links', linkData);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar link:", error);
            throw error;
        }
    },

    deleteLink: async (id: string) => {
        try {
            const response = await api.delete(`/links/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao excluir link:", error);
            throw error;
        }
    },
};
