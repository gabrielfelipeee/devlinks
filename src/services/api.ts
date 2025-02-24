import axios from "axios";

const API_URL = 'https://devlinks-b6gzceg5eygdbafp.canadacentral-01.azurewebsites.net/api';

const api = axios.create({
    baseURL: API_URL
});


// Um interceptador permite modificar ou verificar as configurações de uma requisição antes que ela seja enviada.
api.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem("token");

        // Rotas que não precisam de token
        const noAuthRoutes = [
            { url: '/users', method: 'post' }, // postUser
            { url: '/login', method: 'post' } // Login
        ];

        // Verifica se a rota/método exige autenticação
        const requiresAuth = !noAuthRoutes.some(route =>
            config.url === route.url &&
            config.method === route.method
        );

        // Adiciona o token apenas se for uma rota que exige autenticação
        if (requiresAuth && token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },

    //Caso ocorra um erro ao configurar a requisição, ele é rejeitado para que possa ser tratado posteriormente.
    error => {
        return Promise.reject(error);
    }
);
export default api;
