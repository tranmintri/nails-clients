import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import Service from "./pages/Service";
import Bill from "./pages/Bill";
import { Link, useNavigate } from "react-router-dom";
import Sale from "./pages/Sale";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";

export default function ContentAdmin() {
  const [choose, setChoose] = useState(1);
  const [{ currentPage }, dispatch] = useStateProvider();
  const navigate = useNavigate();

  const setChooseMenu = (num) => {
    dispatch({
      type: reducerCases.SET_CURRENT_ADMIN_PAGE,
      currentPage: num,
    });
  };
  const handleClearLocalStorage = () => {
    alert("a");
    const userInfoString = localStorage.getItem("userInfo");
    // Kiểm tra xem giá trị có tồn tại không
    if (userInfoString) {
      localStorage.clear();
    }
    navigate("/login", { replace: true });
  };
  return (
    <div className="w-full flex">
      <div className="hidden md:w-2/12 h-[90vh] md:border-r md:border-gray-300 md:block">
        <ul className="text-center">
          <li
            className={`text-xl h-14 ${
              currentPage == 1 ? "bg-slate-200" : "bg-white"
            } content-center mt-10 cursor-pointer border-b border-gray-300 hover:bg-slate-200`}
            onClick={() => setChooseMenu(1)}
          >
            Trang chủ
          </li>
          <li
            className={`text-xl h-14 ${
              currentPage == 2 ? "bg-gray-200" : "bg-white"
            } content-center cursor-pointer  border-b border-gray-300 hover:bg-slate-200`}
            onClick={() => setChooseMenu(2)}
          >
            Bán hàng
          </li>
          <li
            className={`text-xl h-14 ${
              currentPage == 3 ? "bg-gray-200" : "bg-white"
            } content-center cursor-pointer  border-b border-gray-300 hover:bg-slate-200`}
            onClick={() => setChooseMenu(3)}
          >
            Sản phẩm
          </li>
          <li
            className={`text-xl h-14 ${
              currentPage == 4 ? "bg-gray-200" : "bg-white"
            } content-center cursor-pointer  border-b border-gray-300 hover:bg-slate-200`}
            onClick={() => setChooseMenu(4)}
          >
            Dịch vụ
          </li>
          <li
            className={`text-xl h-14 ${
              currentPage == 5 ? "bg-gray-200" : "bg-white"
            } content-center cursor-pointer  border-b border-gray-300 hover:bg-slate-200`}
            onClick={() => setChooseMenu(5)}
          >
            Hóa đơn
          </li>
          <li
            className={`text-xl h-14 content-center cursor-pointer  border-b border-gray-300 hover:bg-slate-200`}
            onClick={() => handleClearLocalStorage()}
          >
            Đăng xuất
          </li>
        </ul>
      </div>
      <div className="md:w-10/12 w-full ">
        {currentPage == 1 ? (
          <Dashboard />
        ) : currentPage == 3 ? (
          <Product />
        ) : currentPage == 4 ? (
          <Service />
        ) : currentPage == 5 ? (
          <Bill />
        ) : (
          <Sale />
        )}
      </div>
    </div>
  );
}
