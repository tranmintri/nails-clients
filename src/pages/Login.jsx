import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";
import bannerMain from "../assets/bannerMain.png";
import axios from "axios";
import { USER_API } from "../router/ApiRoutes";
import ClipLoader from "react-spinners/ClipLoader";
import Loading from "../context/Loading";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [{ userInfo }, dispatch] = useStateProvider();
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userInfoString = localStorage.getItem("userInfo");
      if (userInfoString) {
        const userInfoObj = JSON.parse(userInfoString);
        try {
          const res = await axios.post(
            USER_API + "checktoken",
            {}, // Empty body for POST request
            {
              headers: {
                Authorization: `Bearer ${userInfoObj.refreshToken}`,
              },
            }
          );
          if (res.data.status) {
            navigate("/");
          }
        } catch (error) {
          console.error("Error checking login status:", error);
        }
      }
    };

    checkLoginStatus();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const res = await axios.post(USER_API + "login", {
        username: username,
        password: password,
      });

      if (res.data.status) {
        dispatch({
          type: reducerCases.SET_USER_INFO,
          userInfo: res.data.token,
        });
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            refreshToken: res.data.token.refreshToken,
            accessToken: res.data.token.accessToken,
          })
        );
        navigate("/");
      } else {
        toast.error("Đăng nhập thất bại");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Có lỗi xảy ra khi đăng nhập");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen flex-col gap-6 shadow-xl overflow-hidden bg-slate-200">
      {loading ? (
        <div className="loader-container">
          {/* <ClipLoader color="#36D7B7" loading={loading} size={50} /> */}
          <Loading />
        </div>
      ) : (
        <div className="w-full">
          <div className="flex justify-center items-center gap-2 mb-2">
            <img src={bannerMain} alt="" className="md:w-[500px]" width={350} />
          </div>
          <form
            className="w-full h-fit items-center justify-center px-6"
            onSubmit={handleLogin}
          >
            <div className="mb-6 w-full text-center">
              <label
                htmlFor="username"
                className="block mb-2 text-xl font-medium"
              >
                Tên đăng nhập
              </label>
              <input
                type="text"
                id="username"
                className="h-10 pl-4 w-full md:w-4/12 rounded-lg"
                required
                placeholder="Tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6 text-center mt-6">
              <label
                htmlFor="password"
                className="block mb-2 text-xl font-medium"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                className="h-10 pl-4 w-full md:w-4/12 rounded-lg"
                placeholder="•••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="text-center">
              <Link to="/">
                <button
                  type="button"
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-700 mr-5"
                >
                  Trở về trang chủ
                </button>
              </Link>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
