import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { IToken } from '../../interfaces';
import { Loading } from '../../components';

export const PrivateRoute = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode<IToken>(token);
                const currentTime = Date.now() / 1000; // Hora atual em segundos

                if (decodedToken.exp > currentTime) {
                    setIsAuth(true);
                } else {
                    setIsAuth(false);
                    sessionStorage.removeItem("token"); // removendo o token expirado
                    sessionStorage.removeItem("userIdAuthenticated"); // removendo o id do usuário 'autenticado'
                }
            }
            catch (error) {
                console.error("Token inválido:", error);
                setIsAuth(false);
            }
        };
        setIsLoading(false);
    }, []);

    if (isLoading) return <Loading />

    return isAuth
        ? <Outlet />
        : <Navigate to='/login' replace={true} />
};
