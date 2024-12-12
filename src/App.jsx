import React from "react";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/mainPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthContextProvider } from "./Context/AuthContext";
import PersistentLogin from "./utils/PersistentLogin";
import Users from "./pages/Users";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/Login" element={<LoginPage />}></Route>
            <Route path="/SignUp" element={<SignUpPage />}></Route>

            <Route element={<PersistentLogin />}>
              <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/Users" element={<Users />}></Route>
              </Route>
            </Route>
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
