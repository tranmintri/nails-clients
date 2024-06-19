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
  const [{ currentPage }, dispatch] = useStateProvider();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State để điều khiển modal
  const [{ userInfo }] = useStateProvider();
  const setChooseMenu = (num) => {
    dispatch({
      type: reducerCases.SET_CURRENT_ADMIN_PAGE,
      currentPage: num,
    });
  };

  const handleLogout = () => {
    setShowLogoutModal(true); // Hiển thị modal khi bấm đăng xuất
  };

  const confirmLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div className="w-full flex">
      <div className="hidden md:w-2/12 h-[90vh] md:border-r md:border-gray-300 md:block">
        <ul className="text-center">
          {userInfo?.role == "manager" && (
            <li
              className={`text-xl h-14 ${
                currentPage === 1 ? "bg-slate-200" : "bg-white"
              } content-center mt-10 cursor-pointer border-b border-gray-300 hover:bg-slate-200`}
              onClick={() => setChooseMenu(1)}
            >
              Trang chủ
            </li>
          )}

          <li
            className={`text-xl h-14 ${
              currentPage === 2 ? "bg-gray-200" : "bg-white"
            } content-center cursor-pointer  border-b border-gray-300 hover:bg-slate-200`}
            onClick={() => setChooseMenu(2)}
          >
            Bán hàng
          </li>
          {userInfo?.role == "manager" && (
            <li
              className={`text-xl h-14 ${
                currentPage === 3 ? "bg-gray-200" : "bg-white"
              } content-center cursor-pointer  border-b border-gray-300 hover:bg-slate-200`}
              onClick={() => setChooseMenu(3)}
            >
              Sản phẩm
            </li>
          )}
          {userInfo?.role == "manager" && (
            <li
              className={`text-xl h-14 ${
                currentPage === 4 ? "bg-gray-200" : "bg-white"
              } content-center cursor-pointer  border-b border-gray-300 hover:bg-slate-200`}
              onClick={() => setChooseMenu(4)}
            >
              Dịch vụ
            </li>
          )}

          <li
            className={`text-xl h-14 ${
              currentPage === 5 ? "bg-gray-200" : "bg-white"
            } content-center cursor-pointer  border-b border-gray-300 hover:bg-slate-200`}
            onClick={() => setChooseMenu(5)}
          >
            Hóa đơn
          </li>
          <li
            className={`text-xl h-14 content-center cursor-pointer  border-b border-gray-300 hover:bg-slate-200`}
            onClick={handleLogout} // Gọi hàm khi bấm vào nút Đăng xuất
          >
            Đăng xuất
          </li>
        </ul>
      </div>
      <div className="md:w-10/12 w-full ">
        {currentPage === 1 ? (
          <Dashboard />
        ) : currentPage === 3 ? (
          <Product />
        ) : currentPage === 4 ? (
          <Service />
        ) : currentPage === 5 ? (
          <Bill />
        ) : (
          <Sale />
        )}
      </div>
      {/* Modal confirm */}
      {showLogoutModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg">
            <p>Bạn có chắc chắn muốn đăng xuất?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={confirmLogout}
              >
                Đồng ý
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
                onClick={() => setShowLogoutModal(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
