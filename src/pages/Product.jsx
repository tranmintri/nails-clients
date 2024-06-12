import React, { useState } from "react";
import hero51 from "../assets/hero-5-1.jpg";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import PriceComponent from "../util/PriceComponent";

export default function Product() {
  const productData = [
    {
      productId: 1,
      name: "Kem body",
      amount: 200000,
      image: hero51,
    },
    {
      productId: 2,
      name: "Serum",
      amount: 300000,
      image: hero51,
    },
    {
      productId: 1,
      name: "Kem body",
      amount: 200000,
      image: hero51,
    },
    {
      productId: 2,
      name: "Serum",
      amount: 300000,
      image: hero51,
    },
    {
      productId: 1,
      name: "Kem body",
      amount: 200000,
      image: hero51,
    },
    {
      productId: 2,
      name: "Serum",
      amount: 300000,
      image: hero51,
    },
    {
      productId: 1,
      name: "Kem body",
      amount: 200000,
      image: hero51,
    },
    {
      productId: 2,
      name: "Serum",
      amount: 300000,
      image: hero51,
    },
    {
      productId: 1,
      name: "Kem body",
      amount: 200000,
      image: hero51,
    },
    {
      productId: 2,
      name: "Serum",
      amount: 300000,
      image: hero51,
    },
    // Add more products as needed
  ];

  const [maxPrice, setMaxPrice] = useState(
    Math.max(...productData.map((product) => product.amount))
  ); // Giá trị tối đa của thanh trượt giá

  const [priceRange, setPriceRange] = useState([0, maxPrice]); // Giá trị mặc định của phạm vi giá
  const [searchCriteria, setSearchCriteria] = useState(""); // Tiêu chí tìm kiếm
  const [searchByName, setSearchByName] = useState(""); // Tên sản phẩm để tìm kiếm

  const rangeValue = priceRange[1] - priceRange[0];

  // Hàm xử lý sự kiện khi người dùng thay đổi giá trị thanh trượt
  const handlePriceRangeChange = (e) => {
    // Lấy giá trị mới từ thanh trượt
    const newValue = parseInt(e.target.value);

    // Cập nhật giá trị thanh trượt
    setPriceRange([priceRange[0], priceRange[0] + newValue]);
  };

  const handleSearchCriteriaChange = (e) => {
    setSearchCriteria(e.target.value);
  };

  const handleSearchByNameChange = (e) => {
    setSearchByName(e.target.value);
  };

  return (
    <div className="w-full pt-10 px-5 pb-5">
      <Navigation />
      <div className="w-full  px-5 py-8 flex content-center justify-center mt-4">
        <div className="bg-slate-100 md:w-3/12 md:block hidden mr-5 p-5 ">
          <div className="h-full w-full bg-white rounded-lg shadow-lg">
            <div className="flex flex-col gap-4 p-4">
              <div>
                <label htmlFor="priceRange">Phạm vi giá:</label>
                <input
                  type="range"
                  id="priceRange"
                  name="priceRange"
                  min="0"
                  max={maxPrice} // Đảm bảo giá trị max là khoảng cách giữa max và min
                  value={rangeValue} // Sử dụng giá trị đã tính toán
                  onChange={handlePriceRangeChange}
                  className="w-full"
                />
                <div className="flex justify-between">
                  <span>{priceRange[0]}</span>
                  <span>{priceRange[1]}</span>
                </div>
              </div>

              <div>
                <label htmlFor="searchByName">Tìm kiếm theo tên:</label>
                <input
                  type="text"
                  id="searchByName"
                  name="searchByName"
                  value={searchByName}
                  onChange={handleSearchByNameChange}
                  className="w-full h-8 bg-slate-200 rounded-lg mt-3 pl-3 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="content-center w-10/12 md:w-9/12 bg-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-lg shadow-lg h-full">
          {productData
            .filter(
              (product) =>
                product.amount >= priceRange[0] &&
                product.amount <= priceRange[1] &&
                product.name
                  .toLowerCase()
                  .includes(searchCriteria.toLowerCase()) &&
                product.name.toLowerCase().includes(searchByName.toLowerCase())
            )
            .map((product) => (
              <div
                key={product.productId}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-gray-600">
                    Giá: <PriceComponent price={product.amount} />
                  </p>
                </div>
                <div className="bg-gray-100 py-2 px-4">
                  <button className="text-blue-500 font-semibold hover:text-blue-700 focus:outline-none">
                    Liên hệ
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
