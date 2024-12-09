import { Outlet, Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

function ProtectedRoutes() {
  const isAuth = useAuth(
    "http://localhost:3000/api/auth",
    sessionStorage.getItem("_uid")
  );

  if (isAuth === null) {
    return null;
  }
  return isAuth ? <Outlet /> : <Navigate to="/Login" />;
}

export default ProtectedRoutes;
