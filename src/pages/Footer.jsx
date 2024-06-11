import React from "react";
import facebook from "../assets/facebook.png";
import twitter from "../assets/twitter.png";
import instagram from "../assets/instagram.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="w-full bg-gray-100 min-h-24 md:flex md:justify-between items-center md:px-56 md:pb-10">
      <div className="text-center mt-14">
        <span className="text-3xl font-medium ">Địa chỉ</span>
        <p className="text-gray-500 mb-2 mt-3 text-xl">Phương Nail - Spa</p>
        <p className="text-gray-500 mb-2 text-xl">9/2A Hẻm 855 Nguyễn Bình</p>
        <p className="text-gray-500 text-xl">Nhơn Đức, Nhà Bè TPHCM</p>
      </div>
      <div className="text-center mt-14">
        <span className="text-3xl font-medium ">Liên lạc</span>
        <p className="text-gray-500 mb-2 mt-3 text-xl">(+84)123456789</p>
        <p className="text-gray-500 mb-2 text-xl">example@gmail.com</p>
        <div className="flex justify-center items-center">
          <Link to="/">
            <img src={facebook} alt="" width={30} className="mr-4" />
          </Link>
          <Link to="/">
            <img src={twitter} alt="" width={30} className="mr-4" />
          </Link>
          <Link to="/">
            <img src={instagram} alt="" width={30} />
          </Link>
        </div>
      </div>
      <div className="text-center mt-14">
        <span className="text-3xl font-medium ">Giờ làm việc</span>
        <p className="text-gray-500 mb-2 mt-3 text-xl">
          Thứ 2 - 6 : 8:00 - 19:30
        </p>
        <p className="text-gray-500 mb-2 text-xl">
          Thứ 7 - Chủ Nhật : 8:00 - 21:30
        </p>
        <br />
      </div>
    </div>
  );
}
