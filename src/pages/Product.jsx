import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import axios from "axios";
import { PRODUCT_API } from "../router/ApiRoutes";
import ClipLoader from "react-spinners/ClipLoader";
import PriceComponent from "../util/PriceComponent";

export default function Product() {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [searchByName, setSearchByName] = useState("");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(PRODUCT_API);
        setProductData(response.data.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  useEffect(() => {
    if (productData.length > 0) {
      const max = Math.max(...productData.map((product) => product.price));
      setMaxPrice(max);
      setPriceRange([0, max]);
    }
  }, [productData]);

  const handlePriceRangeChange = (e) => {
    const newValue = parseInt(e.target.value);
    setPriceRange([0, newValue]);
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
      <div className="w-full px-5 py-8 md:flex md:content-center md:justify-center mt-4 pt-16">
        <div className="bg-slate-100 md:w-3/12 mb-10 mr-5 p-3 md:max-h-screen rounded-lg shadow-lg">
          <div className="md:h-[95vh] w-full bg-white rounded-lg shadow-lg max-h-screen">
            <div className="flex flex-col gap-4 p-4">
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
              <div>
                <label htmlFor="priceRange">Chọn phạm vi giá:</label>
                <input
                  type="range"
                  id="priceRange"
                  name="priceRange"
                  min="0"
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={handlePriceRangeChange}
                  className="range-slider mt-3"
                />
                <div className="flex justify-between mt-2">
                  <span>
                    <PriceComponent price={priceRange[0]} />
                  </span>
                  <span>
                    <PriceComponent price={priceRange[1]} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-9/12 w-full p-4 bg-slate-100 rounded-lg md:max-h-screen">
          <div className="w-full flex flex-wrap justify-center bg-white rounded-lg md:p-4 p-10 md:h-[95vh] overflow-auto custom-scrollbar">
            {loading ? (
              <div className="loader-container">
                <ClipLoader color="#36D7B7" loading={loading} size={50} />
              </div>
            ) : (
              productData
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
                    className="bg-white rounded-lg shadow-lg overflow-hidden w-full md:w-5/12 lg:w-1/5 mr-5 mb-5 h-[50vh] max-h-[50vh]"
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
                    <p className="p-4 h-[5vh]">
                      <PriceComponent price={product.price} />
                    </p>
                    <div className="bg-gray-100 py-2 px-4 h-[6vh]">
                      <button className="text-blue-500 font-semibold hover:text-blue-700 focus:outline-none">
                        Liên hệ
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
