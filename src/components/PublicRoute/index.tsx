import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Loading } from '../../components';

export const PublicRoute = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            try {
                setIsAuth(true);
            }
            catch {
                setIsAuth(false);
            }
        } else {
            setIsAuth(false);
        }
        setIsLoading(false);
    }, []);
    if (isLoading) <Loading />

    return isAuth
        ? <Navigate to='/' replace={true} />
        : <Outlet />;
};
