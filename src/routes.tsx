import { Routes, Route } from 'react-router-dom';
import { Links, Login, NotFound, Profile, Register, RegisterLinks } from './pages';
import { PrivateRoute, PublicRoute } from './components';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<PublicRoute />}>
                <Route index element={<Login />} />
            </Route>

            <Route path='/cadastro' element={<PublicRoute />}>
                <Route index element={<Register />} />
            </Route>


            <Route path='/' element={<PrivateRoute />}>
                <Route index element={<RegisterLinks />} />
            </Route>

            <Route path='/perfil' element={<PrivateRoute />}>
                <Route index element={<Profile />} />
            </Route>

            <Route path='/:slug' element={<Links />} />
            
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
};
