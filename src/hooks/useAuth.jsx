import axios from "axios";
import { useEffect, useState } from "react";
function useAuth(url, token) {
  const [isAuth, setIsAuth] = useState(null);
  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.status == 200) {
          setIsAuth(true);
        } else if (response.status == 201) {
          console.log("refreshed");
          sessionStorage.setItem("_uid", response.data.jwt_token);
          setIsAuth(true);
        } else {
          sessionStorage.removeItem("_uid");
          setIsAuth(false);
        }
      })
      .catch((err) => {
        sessionStorage.removeItem("_uid");
        console.log("Error in calling Authentication API: " + err);
        setIsAuth(false);
      });
  }, []);

  return isAuth;
}

export default useAuth;
