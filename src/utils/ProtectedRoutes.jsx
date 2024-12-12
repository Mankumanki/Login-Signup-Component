import { Outlet, Navigate } from "react-router";
//import useAuth from "../hooks/useAuth";
import { useAuthContext } from "../Context/AuthContext";

function ProtectedRoutes() {
  let authContext = useAuthContext();

  /*const isAuth = useAuth(
    "http://localhost:3000/api/auth",
    sessionStorage.getItem("_uid")
  );*/

  return authContext?.isAuth?.loggedIn ? <Outlet /> : <Navigate to="/Login" />;
}

export default ProtectedRoutes;
