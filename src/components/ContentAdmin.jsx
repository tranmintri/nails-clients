import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import Service from "./pages/Service";
import Bill from "./pages/Bill";

export default function ContentAdmin() {
  const [choose, setChoose] = useState(1);

  const setChooseMenu = (num) => {
    setChoose(num);
  };

  return (
    <div className="w-full flex">
      <div className="hidden md:w-2/12 h-[90vh] md:border-r md:border-gray-300 md:block">
        <ul className="text-center">
          <li
            className={`text-xl h-14 ${
              choose == 1 ? "bg-slate-200" : "bg-white"
            } content-center mt-10 cursor-pointer border-b border-gray-300 hover:bg-slate-200`}
            onClick={() => setChooseMenu(1)}
          >
            Trang chủ
          </li>
          <li
            className={`text-xl h-14 ${
              choose == 2 ? "bg-gray-200" : "bg-white"
            } content-center cursor-pointer  border-b border-gray-300 hover:bg-slate-200`}
            onClick={() => setChooseMenu(2)}
          >
            Sản phẩm
          </li>
          <li
            className={`text-xl h-14 ${
              choose == 3 ? "bg-gray-200" : "bg-white"
            } content-center cursor-pointer  border-b border-gray-300 hover:bg-slate-200`}
            onClick={() => setChooseMenu(3)}
          >
            Dịch vụ
          </li>
          <li
            className={`text-xl h-14 ${
              choose == 4 ? "bg-gray-200" : "bg-white"
            } content-center cursor-pointer  border-b border-gray-300 hover:bg-slate-200`}
            onClick={() => setChooseMenu(4)}
          >
            Hóa đơn
          </li>
        </ul>
      </div>
      <div className="md:w-10/12 w-full ">
        {choose == 1 ? (
          <Dashboard />
        ) : choose == 2 ? (
          <Product />
        ) : choose == 3 ? (
          <Service />
        ) : (
          <Bill />
        )}
      </div>
    </div>
  );
}
