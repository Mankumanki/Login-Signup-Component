import "../../public/css/LoginPageCSS/login.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import animated_bg from "../../public/img/login_bg.webm";

function LoginPage() {
  const [avatar, setAvatar] = useState("");
  const [pswLabel, setPswLabel] = useState(false);
  const [emailLabel, setEmailLabel] = useState(false);
  const [pswdValue, setPswValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const navigate = useNavigate();

  function loginAPI(evt) {
    evt.preventDefault();
    let bodyData = {
      email: emailValue,
      password: pswdValue,
    };
    axios
      .post("http://localhost:3000/api/Login", bodyData, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem("_uid", res.data.jwt_token);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("Error in calling Login API: " + err);
      });
  }

  useEffect(() => {
    const res = axios.get(import.meta.env.VITE_URL, {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
      },
    });
    res
      .then((response) => {
        setAvatar(response.data.avatar_url);
      })
      .catch((err) => {
        console.log("Failed to fetch avatar of github: " + err);
      });
  }, []);
  return (
    <>
      <div className="flex flex-row min-h-screen bg-image">
        <div className="w-1/2 h-screen max-[768px]:hidden">
          <video className="object-cover h-full" autoPlay muted loop>
            <source src={animated_bg} type="video/webm" />
          </video>
        </div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Github Profile"
              src={avatar}
              className="mx-auto h-16 w-auto rounded-full"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              onSubmit={(evt) => {
                loginAPI(evt);
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
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
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
                  Sign in
                </button>
              </div>
            </form>
          </div>
          <div className="flex justify-center m-3">
            <p className="text-center">
              Don't have an account?{" "}
              <Link
                to="/SignUp"
                className="underline underline-offset-2 text-blue-600"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
