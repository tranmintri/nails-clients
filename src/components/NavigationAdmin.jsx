import React, { useState } from "react";
import logoBlackNails from "../assets/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";

// ModalConfirm Component
const ModalConfirm = ({ message, onConfirm, onCancel }) => (
  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-4 rounded-lg">
      <p className="mb-4">{message}</p>
      <div className="flex justify-end">
        <button
          onClick={onConfirm}
          className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-md"
        >
          Đồng ý
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded-md"
        >
          Hủy
        </button>
      </div>
    </div>
  </div>
);

export default function NavigationAdmin() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [{ currentPage }, dispatch] = useStateProvider();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // State for modal

  const setChooseMenu = (num) => {
    dispatch({
      type: reducerCases.SET_CURRENT_ADMIN_PAGE,
      currentPage: num,
    });
    setIsMenuOpen(!isMenuOpen);
  };

  const navHandle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClearLocalStorage = () => {
    setShowModal(true); // Show the modal
  };

  const confirmLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div className="w-full fixed top-0 left-0 bg-white z-50 shadow-lg rounded-b-lg">
      <div className="w-full mx-auto  flex justify-between items-center">
        <div className="w-2/12  border-r border-gray-300">
          <div className="my-3 flex justify-center items-center">
            <img
              src={logoBlackNails}
              alt="Logo"
              width={60}
              className="md:w-16"
            />
          </div>
        </div>
        <div className="absolute right-3 ">
          <CiMenuFries
            className="block md:hidden text-xl"
            onClick={navHandle}
          />
        </div>
        <div className="w-8/12 flex justify-start items-center pl-4 ">
          <CiSearch className="text-2xl cursor-pointer mr-4" />
          <input
            type="text"
            className="w-10/12 bg-slate-200 h-10 pl-4 rounded-lg"
            placeholder="Tìm kiếm"
          />
        </div>
        <div className="w-2/12 flex justify-start items-center pl-4 "></div>
      </div>
      {isMenuOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10 "
          onClick={navHandle}
        ></div>
      )}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 w-8/12 h-full  z-50 shadow-lg rounded-s-lg ">
          <div onClick={navHandle} className="h-[5vh]  ">
            <IoIosCloseCircleOutline className=" text-3xl text-white" />
          </div>
          <ul className="bg-white h-[95vh] rounded-s-lg">
            <li
              className={`${
                currentPage == 1 ? "bg-slate-200" : "bg-white"
              } block py-4 px-6 text-lg hover:bg-gray-100`}
              onClick={() => setChooseMenu(1)}
            >
              Trang chủ
            </li>
            <li
              className={`${
                currentPage == 2 ? "bg-slate-200" : "bg-white"
              } block py-4 px-6 text-lg hover:bg-gray-100`}
              onClick={() => setChooseMenu(2)}
            >
              Bán hàng
            </li>
            <li
              className={`${
                currentPage == 3 ? "bg-slate-200" : "bg-white"
              } block py-4 px-6 text-lg hover:bg-gray-100`}
              onClick={() => setChooseMenu(3)}
            >
              Sản phẩm
            </li>
            <li
              className={`${
                currentPage == 4 ? "bg-slate-200" : "bg-white"
              } block py-4 px-6 text-lg hover:bg-gray-100`}
              onClick={() => setChooseMenu(4)}
            >
              Dịch vụ
            </li>
            <li
              className={`${
                currentPage == 5 ? "bg-slate-200" : "bg-white"
              } block py-4 px-6 text-lg hover:bg-gray-100`}
              onClick={() => setChooseMenu(5)}
            >
              Hóa đơn
            </li>
            <li
              className="block py-4 px-6 text-lg hover:bg-gray-100"
              onClick={handleClearLocalStorage}
            >
              Đăng xuất
            </li>
          </ul>
        </div>
      )}
      {showModal && (
        <ModalConfirm
          message="Bạn có chắc chắn muốn đăng xuất?"
          onConfirm={confirmLogout}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
