import React, { useState } from "react";
import PriceComponent from "../../util/PriceComponent";
import hero51 from "../../assets/hero-5-1.jpg";

export default function Sale() {
  const [customerName, setCustomerName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedProductsList, setSelectedProductsList] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const serviceData = [
    { serviceId: 1, name: "Gội đầu", amount: 50000 },
    { serviceId: 2, name: "Cắt móng", amount: 30000 },
    { serviceId: 3, name: "Tỉa da", amount: 20000 },
  ];

  const handleServiceChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedServices((prev) => [...prev, value]);
    } else {
      setSelectedServices((prev) =>
        prev.filter((service) => service !== value)
      );
    }
  };

  const productData = [
    {
      productId: 1,
      name: "Kem body",
      amount: 200000,
      image: "../../assets/hero-5-1.jpg",
    },
    { productId: 2, name: "Serum", amount: 300000, image: hero51 },
  ];

  const handleProductChange = (e) => {
    const selected = productData.find((p) => p.name === e.target.value);
    setSelectedProduct(selected);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setSelectedQuantity(value >= 0 ? value : 0);
  };

  const handleAddProduct = () => {
    if (selectedProduct) {
      const index = selectedProductsList.findIndex(
        (item) => item.productId === selectedProduct.productId
      );
      if (index !== -1) {
        const updatedList = [...selectedProductsList];
        updatedList[index].quantity += selectedQuantity;
        setSelectedProductsList(updatedList);
      } else {
        const newItem = {
          productId: selectedProduct.productId,
          name: selectedProduct.name,
          quantity: selectedQuantity,
          price: selectedProduct.amount,
          image: selectedProduct.image,
        };
        setSelectedProductsList([...selectedProductsList, newItem]);
      }
      setSelectedProduct(null);
      setSelectedQuantity(1);
    }
  };

  const handleRemoveProduct = (productId) => {
    const updatedList = selectedProductsList.filter(
      (item) => item.productId !== productId
    );
    setSelectedProductsList(updatedList);
  };

  const handleCheckout = () => {
    // Calculate total here
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
            Chọn sản phẩm
          </label>
          <select
            value={selectedProduct ? selectedProduct.name : ""}
            onChange={handleProductChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Chọn sản phẩm</option>
            {productData.map((product) => (
              <option key={product.productId} value={product.name}>
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-8 h-8 mr-2"
                  />
                  {product.name}
                </div>
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
            value={selectedQuantity}
            onChange={handleQuantityChange}
            min="0"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <button
            type="button"
            onClick={handleAddProduct}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Thêm sản phẩm
          </button>
        </div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Danh sách sản phẩm
        </label>
        <div className="mb-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tên sản phẩm
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Số lượng
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Đơn giá
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 ">
              {selectedProductsList.map((product) => (
                <tr key={product.productId}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <PriceComponent price={product.price} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleRemoveProduct(product.productId)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Chọn dịch vụ
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
