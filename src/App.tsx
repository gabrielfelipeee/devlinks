import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./componenets/Header";
import PrivateRoute from "./componenets/PrivateRoute";
import Links from "./pages/Links";
import Profile from "./pages/Profile";
import Preview from "./pages/Preview";
import UsersProvider from "./context/UsersContext";
import LinksProvider from "./context/LinksContext";

function App() {
  return (
    <BrowserRouter>
      <UsersProvider>
        <LinksProvider>

          <Header />
          <main>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/cadastro' element={<Register />} />

              <Route path='/' element={<PrivateRoute />}>
                <Route index element={<Links />} />
              </Route>

              <Route path='/perfil' element={<PrivateRoute />}>
                <Route index element={<Profile />} />
              </Route>

              <Route path='/:id' element={<Preview />} />
            </Routes>
          </main>

        </LinksProvider>
      </UsersProvider>

    </BrowserRouter>
  )
}
export default App
