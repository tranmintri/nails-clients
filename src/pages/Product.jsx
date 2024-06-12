import React from "react";
import hero51 from "../assets/hero-5-1.jpg";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

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
  ];
  return (
    <div className="w-full pt-10">
      <Navigation />
      <div className="w-full  px-5 py-8 flex content-center justify-center mt-4">
        <div className="bg-slate-100 md:w-3/12 md:block hidden mr-5 pt-5">
          a
        </div>
        <div className="content-center w-10/12 md:w-9/12 bg-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
          {productData.map((product) => (
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
                <p className="text-gray-600">Giá: {product.amount} VND</p>
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
