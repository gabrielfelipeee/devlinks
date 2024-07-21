import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./componenets/Header";
import PrivateRoute from "./componenets/PrivateRoute";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<PrivateRoute />}>
            <Route index element={<Home />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
export default App
