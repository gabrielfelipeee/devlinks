import api from './api';
import { ILogin } from '../interfaces';

export const loginService = {
    postLogin: async (loginData: ILogin) => {
        try {
            const response = await api.post('/login', loginData);
            return response.data;
        } catch (error) {
            console.error("Erro ao fazer Login:", error);
            throw error; 
        }
    }
};
