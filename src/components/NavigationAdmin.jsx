import React, { useState } from "react";
import logoBlackNails from "../assets/logo.jpg";
import { Link } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

export default function NavigationAdmin() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navHandle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full fixed top-0 left-0 bg-white z-50 shadow-lg rounded-b-lg">
      <div className="w-full mx-auto  flex justify-between items-center">
        <div className="w-2/12  border-r border-gray-300">
          <div className="my-3">
            <img
              src={logoBlackNails}
              alt="Logo"
              width={100}
              className="md:w-28"
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

        <div className="w-2/12 flex justify-end">
          <Link
            className="hover:text-gray-400 text-xl hidden md:block mr-10"
            to="/login"
          >
            Đăng xuất
          </Link>
        </div>
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
            <li>
              <Link
                className="block py-4 px-6 text-lg hover:bg-gray-100 rounded-ss-lg"
                to="/"
              >
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link
                className="block py-4 px-6 text-lg hover:bg-gray-100"
                to="/"
                // onClick={toggleMenu}
              >
                Dịch vụ
              </Link>
            </li>
            <li>
              <Link
                className="block py-4 px-6 text-lg hover:bg-gray-100"
                to="/"
                // onClick={toggleMenu}
              >
                Về chúng tôi
              </Link>
            </li>
            <li>
              <Link
                className="block py-4 px-6 text-lg hover:bg-gray-100"
                to="/login"
                // onClick={toggleMenu}
              >
                Đăng nhập
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
