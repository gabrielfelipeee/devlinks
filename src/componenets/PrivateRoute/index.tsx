import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface IDecodedToken {
    unique_name: string[],
    jti: string,
    nbf: number,
    exp: number,
    iat: number,
    iss: string,
    aud: string
};

const PrivateRoute = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode<IDecodedToken>(token);
                const currentTime = Date.now() / 1000; // Hora atual em segundos

                if (decodedToken.exp > currentTime) {
                    setIsAuth(true);
                } else {
                    setIsAuth(false);
                    localStorage.removeItem("token"); // removendo o token expirado
                }
            }
            catch (error) {
                console.log("Token inválido:", error);
                setIsAuth(false);
            }
        };
        setIsLoading(false);
    }, []);
    if (isLoading) {
        return <div>Carregando...</div>
    };

    return isAuth
        ? <Outlet />
        : <Navigate to='/login' replace={true} />
};
export default PrivateRoute;
