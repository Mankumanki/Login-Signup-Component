import "../../public/css/LoginPageCSS/login.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import animated_bg from "../../public/img/SignUp_bg.webm";
import { useAuthContext } from "../Context/AuthContext";

function SignUpTemp() {
  const [pswLabel, setPswLabel] = useState(false);
  const [emailLabel, setEmailLabel] = useState(false);
  const [pswdValue, setPswValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const navigate = useNavigate();
  const authContext = useAuthContext();

  function signUpAPI(evt) {
    evt.preventDefault();
    let bodyData = {
      email: emailValue,
      password: pswdValue,
    };
    axios
      .post("http://localhost:3000/api/SignUp", bodyData, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 201) {
          authContext.setIsAuth({
            loggedIn: true,
            accessToken: res.data.jwt_token,
          });
          navigate("/");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log("Error in calling SignUp API: " + err);
      });
  }
  return (
    <>
      <div className="flex flex-row min-h-screen bg-image-signUp">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign Up
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              onSubmit={(evt) => {
                signUpAPI(evt);
              }}
            >
              <div>
                <label
                  htmlFor="email"
                  className={
                    emailLabel
                      ? "block text-sm/6 font-medium text-gray-900 transition-transform"
                      : "block text-sm/6 font-medium text-gray-900 translate-y-3 transition-transform"
                  }
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full border-x-0 border-t-0 border-b-2 border-violet-950 py-1.5 px-3 text-gray-900  placeholder:text-gray-400 focus:outline-none focus:border-violet-300 bg-transparent"
                    onFocus={() => {
                      setEmailLabel(true);
                    }}
                    onBlur={() => {
                      setEmailLabel(false);
                    }}
                    value={emailValue}
                    onChange={(evt) => {
                      setEmailValue(evt.target.value);
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className={
                      pswLabel
                        ? "block text-sm/6 font-medium text-gray-900 transition-transform"
                        : "block text-sm/6 font-medium text-gray-900 translate-y-3 transition-transform"
                    }
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full border-x-0 border-t-0 border-b-2 border-violet-950 py-1.5 px-3 text-gray-900  placeholder:text-gray-400 focus:outline-none focus:border-violet-300 bg-transparent"
                    onFocus={() => {
                      setPswLabel(true);
                    }}
                    onBlur={() => {
                      setPswLabel(false);
                    }}
                    value={pswdValue}
                    onChange={(evt) => {
                      setPswValue(evt.target.value);
                    }}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
          <div className="flex justify-center m-3">
            <p className="text-center">
              Already have an account?{" "}
              <Link
                to="/Login"
                className="underline underline-offset-2 text-blue-600"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
        <div className="w-1/2 h-screen max-[768px]:hidden">
          <video className="object-cover h-full" autoPlay muted loop>
            <source src={animated_bg} type="video/webm" />
          </video>
        </div>
      </div>
    </>
  );
}

export default SignUpTemp;
