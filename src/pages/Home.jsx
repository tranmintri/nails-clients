import React from "react";
import logoBlackNails from "../assets/logo-black-nails.png";
import banner from "../assets/banner.png";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

import nail from "../assets/nail.png";
import nailPolish from "../assets/nail-polish.png";
import head from "../assets/head.png";
import facialMassage from "../assets/facial-massage.png";

import banner4 from "../assets/banner4.jpg";
import banner5 from "../assets/banner5.jpg";
import banner6 from "../assets/banner6.jpg";
import banner7 from "../assets/banner7.jpg";
import banner8 from "../assets/banner8.jpg";

import Navigation from "../components/Navigation";
import PriceComponent from "../util/PriceComponent";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-screen w-full">
      <div className="h-[13vh]">
        <Navigation />
      </div>
      <div className=" z-0 h-[87vh] w-full md:pt-10 pt-5">
        <div className="w-full flex justify-center items-center ">
          <img src={banner} alt="Logo" width={300} className="md:w-[600px]" />
        </div>
        <div className="w-full flex justify-center px-1">
          <div className="w-10/12 ">
            <div className="text-center w-full pt-5 md:pt-11">
              <span className="text-2xl md:text-5xl md:mb-5 md:px-28 block mb-2">
                Chúng tôi muốn làm cho mọi cô gái
              </span>
              <span className="text-2xl  md:text-5xl md:mb-5 md:px-28 block">
                xinh đẹp, hạnh phúc và được yêu thương!
              </span>
            </div>
            <Link to={"/product"}>
              <div className="w-full flex justify-center items-center mt-16 ">
                <div className=" text-center md:w-2/12 w-5/12 border border-black px-3 py-3 hover:bg-red-400 hover:border-white hover:text-white cursor-pointer">
                  Xem Sản Phẩm
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="w-full flex flex-wrap justify-center items-center ">
          <img
            src={banner1}
            alt="Logo"
            width={400}
            className="md:mr-10 mt-10 rounded-lg"
          />
          <img
            src={banner2}
            alt="Logo"
            width={550}
            className="md:mr-10 mt-10 rounded-lg"
          />
          <img
            src={banner3}
            alt="Logo"
            width={450}
            className="mt-10 rounded-lg"
          />
        </div>
        <div className="w-full flex flex-wrap justify-center items-center ">
          <div className="md:mr-10 mt-10 text-center w-full md:w-2/12">
            <div className="flex justify-center items-center">
              <img src={nail} width={80} alt="" className="mt-10" />
            </div>
            <div className="flex justify-center items-center">
              <span className="font-medium mt-3 text-xl">
                Chăm sóc móng tay
              </span>
            </div>
          </div>
          <div className="md:mr-10 mt-10 text-center w-full md:w-2/12">
            <div className="flex justify-center items-center">
              <img src={nailPolish} width={80} alt="" className="mt-10" />
            </div>
            <div className="flex justify-center items-center">
              <span className="font-medium mt-3 text-xl">
                Nghệ thuât móng tay
              </span>
            </div>
          </div>
          <div className="md:mr-10 mt-10 text-center w-full md:w-2/12">
            <div className="flex justify-center items-center">
              <img src={head} width={80} alt="" className="mt-10" />
            </div>
            <div className="flex justify-center items-center">
              <span className="font-medium mt-3 text-xl">Chăm sóc tóc</span>
            </div>
          </div>
          <div className="md:mr-10 mt-10 text-center w-2/12">
            <div className="flex justify-center items-center">
              <img src={facialMassage} width={80} alt="" className="mt-10" />
            </div>
            <div className="flex justify-center items-center">
              <span className="font-medium mt-3 text-xl">
                Phương pháp điều trị
              </span>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-wrap mt-10 justify-center items-center py-10">
          <div className="md:w-5/12 w-full mr-10 px-3 pl-7">
            <p className="text-xl text-gray-500">Thời gian biểu</p>
            <br />
            <p className="text-4xl">Giờ làm việc</p>
            <br />
            <p className="text-xl text-gray-500 text-justify ">
              Chúng tôi mở cửa hàng ngày từ thứ Hai đến Chủ nhật, đảm bảo rằng
              bạn có thể lựa chọn thời gian phù hợp nhất cho cuộc hẹn của mình.
              Thời gian làm việc linh hoạt, từ sáng sớm đến tối muộn, để phù hợp
              với lịch trình bận rộn của bạn.
            </p>
          </div>
          <div className="md:w-5/12 w-full mr-10 px-3 pl-4 mt-10">
            <table class="w-full">
              <tbody className="md:text-xl text-sm">
                <tr>
                  <td className="px-4 py-2 border-b border-black border-dashed">
                    Thứ 2 - Thứ 6
                  </td>
                  <td className="px-4 py-2 border-b border-black border-dashed">
                    -
                  </td>
                  <td className="px-4 py-2 border-b border-black border-dashed">
                    8:00 - 19:30
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-black border-dashed">
                    Thứ 7 - Chủ Nhật
                  </td>
                  <td className="px-4 py-2 border-b border-black border-dashed">
                    -
                  </td>
                  <td className="px-4 py-2 border-b border-black border-dashed">
                    8:00 - 21:30
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full pt-5 pb-5">
          <div className="w-full flex flex-wrap justify-center items-center">
            <span className="md:text-5xl text-4xl">Bảng dịch vụ</span>
          </div>
          <div className="w-full flex flex-wrap justify-center items-center pl-7 mt-10">
            <div className="md:w-5/12 w-full mr-10">
              <div className="mb-3">
                <div className="md:flex md:justify-between text-center items-center">
                  <p className="text-xl md:text-2xl font-semibold">
                    Cắt da tay chân
                  </p>

                  <p>Liên hệ</p>
                </div>
                <p className="text-center md:text-left text-gray-400">
                  Thời gian khoảng 25 phút
                </p>
              </div>
              <div className="mb-3">
                <div className="md:flex md:justify-between text-center items-center">
                  <p className="text-xl md:text-2xl font-semibold">Sơn Gel</p>
                  <p>Liên hệ</p>
                </div>
                <p className="text-center md:text-left text-gray-400">
                  Thời gian khoảng 25 phút
                </p>
              </div>
              <div className="mb-3">
                <div className="md:flex md:justify-between text-center items-center">
                  <p className="text-xl md:text-2xl font-semibold">
                    Chăm sóc da
                  </p>
                  <p>Liên hệ</p>
                </div>
                <p className="text-center md:text-left text-gray-400">
                  Thời gian khoảng 25 phút
                </p>
              </div>
              <div className="mb-3">
                <div className="md:flex md:justify-between text-center items-center">
                  <p className="text-xl md:text-2xl font-semibold">
                    Chăm sóc da mụn cơ bản
                  </p>
                  <p>Liên hệ</p>
                </div>
                <p className="text-center md:text-left text-gray-400">
                  Thời gian khoảng 25 phút
                </p>
              </div>
              <div className="mb-3">
                <div className="md:flex md:justify-between text-center items-center">
                  <p className="text-xl md:text-2xl font-semibold">
                    Gội đầu dưỡng sinh
                  </p>
                  <p>Liên hệ</p>
                </div>
                <p className="text-center md:text-left text-gray-400">
                  Thời gian khoảng 60 phút
                </p>
              </div>
            </div>
            <div className="md:w-5/12 w-full ">
              <div className="mb-3">
                <div className="md:flex md:justify-between text-center items-center">
                  <p className="text-xl md:text-2xl font-semibold">
                    Gội bồ kết
                  </p>
                  <p>Liên hệ</p>
                </div>
                <p className="text-center md:text-left text-gray-400">
                  Thời gian khoảng 40 phút
                </p>
              </div>
              <div className="mb-3">
                <div className="md:flex md:justify-between text-center items-center">
                  <p className="text-xl md:text-2xl font-semibold">
                    Massage Body
                  </p>
                  <p>Liên hệ</p>
                </div>
                <p className="text-center md:text-left text-gray-400">
                  Thời gian khoảng 25 phút
                </p>
              </div>
              <div className="mb-3">
                <div className="md:flex md:justify-between text-center items-center">
                  <p className="text-xl md:text-2xl font-semibold">
                    Massage cổ, vai gáy
                  </p>
                  <p>Liên hệ</p>
                </div>
                <p className="text-center md:text-left text-gray-400">
                  Thời gian khoảng 25 phút
                </p>
              </div>
              <div className="mb-3">
                <div className="md:flex md:justify-between text-center items-center">
                  <p className="text-xl md:text-2xl font-semibold">
                    Cấy tế bào gốc
                  </p>
                  <p>Liên hệ</p>
                </div>
                <p className="text-center md:text-left text-gray-400">
                  Thời gian khoảng 25 phút
                </p>
              </div>
              <div className="mb-3">
                <div className="md:flex md:justify-between text-center items-center">
                  <p className="text-xl md:text-2xl font-semibold">Gắn móng</p>
                  <p>Liên hệ</p>
                </div>
                <p className="text-center md:text-left text-gray-400">
                  Thời gian khoảng 25 phút
                </p>
              </div>
            </div>
          </div>
          <Link to={"/service"}>
            <div className="w-full flex justify-center items-center mt-16 ">
              <div className=" text-center md:w-2/12 w-5/12 border border-black px-3 py-3 hover:bg-red-400 hover:border-white hover:text-white cursor-pointer">
                Xem tất cả giá
              </div>
            </div>
          </Link>

          <div className="mt-10 md:flex md:justify-center items-center w-full">
            <img
              src={banner6}
              alt="Logo"
              className="md:mr-10 mt-10 md:w-52 rounded-lg"
            />
            <img
              src={banner4}
              alt="Logo"
              className="md:mr-10 mt-10 md:w-[400px] rounded-lg"
            />
            <div className="mr-10 pl-7">
              <img
                src={banner7}
                alt="Logo"
                className="mt-10 md:w-64 rounded-lg"
              />
              <img
                src={banner5}
                alt="Logo"
                className="mt-10 md:w-64 rounded-lg"
              />
            </div>
            <img
              src={banner8}
              alt="Logo"
              className="mt-10 md:w-52 rounded-lg"
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
