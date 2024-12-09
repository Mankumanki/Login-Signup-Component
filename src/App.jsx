import React from "react";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/mainPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<LoginPage />}></Route>
          <Route path="/SignUp" element={<SignUpPage />}></Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<MainPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
