import React, { useState } from "react";
import logoBlackNails from "../assets/logo1.png";
import { Link } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navHandle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full fixed top-0 left-0 bg-white z-50 shadow-lg rounded-b-lg">
      <div className="w-10/12 mx-auto py-4 flex justify-between items-center">
        <img src={logoBlackNails} alt="Logo" width={60} className="md:w-20" />
        <div className="absolute right-14 ">
          <CiMenuFries
            className="block md:hidden text-xl"
            onClick={navHandle}
          />
        </div>

        <nav className="hidden md:block">
          <ul className="flex">
            <li>
              <Link className="hover:text-gray-400 text-xl mr-11" to="/">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-400 text-xl mr-11" to="/product">
                Sản Phẩm
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-400 text-xl mr-11" to="/service">
                Dịch vụ
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <Link
            className="hover:text-gray-400 text-xl hidden md:block"
            to="/login"
          >
            Đăng nhập
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
            <li onClick={navHandle}>
              <Link
                className="block py-4 px-6 text-lg hover:bg-gray-100 rounded-ss-lg"
                to="/"
              >
                Trang Chủ
              </Link>
            </li>
            <li onClick={navHandle}>
              <Link
                className="block py-4 px-6 text-lg hover:bg-gray-100"
                to="/product"
                // onClick={toggleMenu}
              >
                Sản Phẩm
              </Link>
            </li>
            <li onClick={navHandle}>
              <Link
                className="block py-4 px-6 text-lg hover:bg-gray-100"
                to="/service"
                // onClick={toggleMenu}
              >
                Dịch vụ
              </Link>
            </li>

            <li onClick={navHandle}>
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
