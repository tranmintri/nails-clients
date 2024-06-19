import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";
import bannerMain from "../assets/bannerMain.png";
import axios from "axios";
import { SERVER_LOGIN_HOST, USER_API } from "../router/ApiRoutes";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [{ userInfo }, dispatch] = useStateProvider();
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy thông tin người dùng từ sessionStorage
    const userInfoString = localStorage.getItem("userInfo");
    // Kiểm tra xem giá trị có tồn tại không
    if (userInfoString) {
      navigate("/");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
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
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen flex-col gap-6 shadow-xl overflow-hidden bg-slate-200">
      <div className="flex justify-center items-center gap-2 mb-2">
        <img src={bannerMain} alt="" className="md:w-[500px]" width={350} />
      </div>
      <form
        className="w-full h-fit items-center justify-center px-6"
        onSubmit={handleLogin}
      >
        <div className="mb-6 w-full text-center">
          <label htmlFor="email" className="block mb-2 text-xl font-medium">
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
          <label htmlFor="password" className="block mb-2 text-xl font-medium">
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

        <div className="text-center ">
          <Link to="/">
            <button
              type="submit"
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
  );
}

export default Login;
