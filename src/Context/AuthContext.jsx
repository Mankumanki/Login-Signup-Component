import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

function useAuthContext() {
  return useContext(AuthContext);
}

function AuthContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState({});
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export { useAuthContext, AuthContextProvider };
