
import { permittedRoutes } from "./routes";

import { ToastContainer } from "react-toastify";
import { Navigate, useRoutes } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/Register";
import 'react-quill/dist/quill.snow.css';


export const App = () => {



  const mainRoutes = { 
    path: "/",
    element: "",
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      { path: "/", element: <Login /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  };

  const routing = useRoutes([mainRoutes, ...permittedRoutes()]);
  
  return (
    <>
      {routing}
      <ToastContainer />
    </>
  );
}


