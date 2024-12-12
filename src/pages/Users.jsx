import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

function Users() {
  let authContext = useAuthContext();
  const [users, setUsers] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(
      function (config) {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${authContext?.isAuth?.accessToken}`;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = instance.interceptors.response.use(
      function (response) {
        return response;
      },
      async function (error) {
        let prevRequest = error?.config;
        if (error?.response?.status == 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          let refreshToken = async () => {
            try {
              var res = await axios.get("http://localhost:3000/api/refresh", {
                withCredentials: true,
              });
              authContext.setIsAuth({
                loggedIn: true,
                accessToken: res?.data?.jwt_token,
              });
              return res?.data?.jwt_token;
            } catch (err) {
              navigate("/Login");
              console.log(err);
            }
          };
          let newAccessToken = await refreshToken();
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    instance
      .get("/userdata", {
        headers: {
          Authorization: `Bearer ${authContext?.isAuth?.accessToken}`,
        },
      })
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log("Error in retrieving users data: " + err);
      });

    return () => {
      instance.interceptors.response.eject(responseInterceptor);
      instance.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return (
    <div>
      {users.map((val, idx) => {
        return <h1 key={idx}>{val}</h1>;
      })}
    </div>
  );
}

export default Users;
