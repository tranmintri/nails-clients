import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import PriceComponent from "../util/PriceComponent";
import axios from "axios";
import { PRODUCT_API } from "../router/ApiRoutes";

export default function Product() {
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(PRODUCT_API);
        console.log(response.data.data);
        setProductData(response.data.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);

  const [maxPrice, setMaxPrice] = useState(0); // Cập nhật maxPrice khi có dữ liệu sản phẩm
  const [priceRange, setPriceRange] = useState([0, 0]); // Mặc định không chọn bất kỳ phạm vi giá nào
  const [searchCriteria, setSearchCriteria] = useState(""); // Tiêu chí tìm kiếm
  const [searchByName, setSearchByName] = useState(""); // Tên sản phẩm để tìm kiếm

  useEffect(() => {
    if (productData.length > 0) {
      const max = Math.max(...productData.map((product) => product.price));
      setMaxPrice(max);
      setPriceRange([0, max]); // Mặc định chọn tất cả phạm vi giá
    }
  }, [productData]);

  const rangeValue = priceRange[1] - priceRange[0];

  const handlePriceRangeChange = (e) => {
    const newValue = parseInt(e.target.value);
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
      <div className="w-full  px-5 py-8 flex content-center justify-center mt-4 pt-16">
        {/* Phần lọc */}
        <div className="bg-slate-100 md:w-3/12 md:block hidden mr-5 p-5 max-h-screen rounded-lg shadow-lg">
          <div className="h-[95vh] w-full bg-white rounded-lg shadow-lg max-h-screen">
            <div className="flex flex-col gap-4 p-4">
              <div>
                <label htmlFor="priceRange">Phạm vi giá:</label>
                <input
                  type="range"
                  id="priceRange"
                  name="priceRange"
                  min="0"
                  max={maxPrice}
                  value={rangeValue}
                  onChange={handlePriceRangeChange}
                  className="w-full"
                />
                <div className="flex justify-between">
                  <span>
                    <PriceComponent price={priceRange[0]} />
                  </span>
                  <span>
                    <PriceComponent price={priceRange[1]} />
                  </span>
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

        {/* Hiển thị sản phẩm */}
        <div className="justify-center content-center  w-10/12 md:w-9/12 bg-slate-100 flex flex-wrap gap-4 pt-24 pl-5 rounded-lg shadow-lg h-full overflow-auto min-h-screen max-h-screen ">
          {productData
            .filter(
              (product) =>
                product.price >= priceRange[0] &&
                product.price <= priceRange[1] &&
                product.status === "Đang kinh doanh" &&
                product.productName
                  .toLowerCase()
                  .includes(searchCriteria.toLowerCase()) &&
                product.productName
                  .toLowerCase()
                  .includes(searchByName.toLowerCase())
            )
            .map((product) => (
              <div
                key={product.productId}
                className="bg-white rounded-lg shadow-md overflow-hidden w-full md:w-5/12 lg:w-1/5 mr-5 mb-5 h-[50vh] max-h-[50vh]"
              >
                <img
                  src={product.image}
                  alt={product.productName}
                  className="w-full h-[23vh] object-cover"
                />
                <div className="p-4 h-[16vh]">
                  <h3 className="text-xl font-semibold">
                    {product.productName}
                  </h3>
                </div>
                <p className="text-gray-600 h-[5vh] pl-4">
                  Giá: <PriceComponent price={product.price} />
                </p>
                <div className="bg-gray-100 py-2 px-4 h-[6vh]">
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
