import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";

let instance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

function PersistentLogin() {
  const [waiting, setWaiting] = useState(true);
  let authContext = useAuthContext();
  let navigate = useNavigate();
  useEffect(() => {
    let refreshToken = async () => {
      try {
        var res = await instance.get("/refresh");
        setWaiting(false);
        authContext.setIsAuth({
          loggedIn: true,
          accessToken: res?.data?.jwt_token,
        });
      } catch (err) {
        navigate("/Login");
        console.log(err);
      }
    };
    authContext?.isAuth?.accessToken ? setWaiting(false) : refreshToken();
  }, []);

  return waiting ? <h1>Loading...</h1> : <Outlet />;
}

export default PersistentLogin;
