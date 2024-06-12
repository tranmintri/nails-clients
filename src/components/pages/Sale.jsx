import React, { useState } from "react";
import PriceComponent from "../../util/PriceComponent";

export default function CheckoutForm() {
  const [customerName, setCustomerName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);

  const productData = [
    { productId: 1, name: "Kem body", amount: 200000 },
    { productId: 2, name: "Serum", amount: 300000 },
  ];

  const serviceData = [
    { serviceId: 1, name: "Gội đầu", amount: 50000 },
    { serviceId: 2, name: "Cắt móng", amount: 30000 },
    { serviceId: 3, name: "Tỉa da", amount: 20000 },
  ];

  const handleProductChange = (e) => {
    const selected = productData.find((p) => p.name === e.target.value);
    setSelectedProduct(e.target.value);
    if (selected) setPrice(selected.amount);
  };

  const handleServiceChange = (e) => {
    const value = e.target.value;
    setSelectedServices((prev) =>
      prev.includes(value)
        ? prev.filter((service) => service !== value)
        : [...prev, value]
    );
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setQuantity(value);
    }
  };

  const handleCheckout = () => {
    setTotal(quantity * price);
    // Handle checkout logic here
  };

  return (
    <div className="pt-6 px-5 w-full h-full bg-slate-100">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-3/4 mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tên khách hàng
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tên sản phẩm
          </label>
          <select
            value={selectedProduct}
            onChange={handleProductChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Chọn sản phẩm</option>
            {productData.map((product) => (
              <option key={product.productId} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Số lượng
          </label>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="0"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Dịch vụ
          </label>
          {serviceData.map((service) => (
            <div key={service.serviceId} className="flex items-center">
              <input
                type="checkbox"
                value={service.name}
                onChange={handleServiceChange}
                className="mr-2 leading-tight"
              />
              <label className="text-gray-700">{service.name}</label>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Giá tiền
          </label>
          <PriceComponent price={price} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tổng tiền
          </label>
          <PriceComponent price={total} />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleCheckout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Tạo hóa đơn
          </button>
        </div>
      </form>
    </div>
  );
}
