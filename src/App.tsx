import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./componenets/Header";
import PrivateRoute from "./componenets/PrivateRoute";
import Home from "./pages/Home";
import Links from "./pages/Links";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/' element={<PrivateRoute />}>
            <Route index element={<Home />} />
          </Route>
          <Route path='/links' element={<PrivateRoute />}>
            <Route index element={<Links />} />
          </Route>


        </Routes>
      </main>
    </BrowserRouter>
  )
}
export default App
