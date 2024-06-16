import React, { useEffect, useState } from "react";
import PriceComponent from "../../util/PriceComponent";
import axios from "axios";
import { BILL_API, PRODUCT_API, SERVICE_API } from "../../router/ApiRoutes";
import { useStateProvider } from "./../../context/StateContext";
import { toast } from "react-toastify";
export default function Sale() {
  const [customerName, setCustomerName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedProductsList, setSelectedProductsList] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("Tiền mặt");
  const [total, setTotal] = useState(0); // Add state for total amount
  const [{ userInfo }] = useStateProvider();
  const [serviceData, setServiceData] = useState([]);
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    const fetcheData = async () => {
      try {
        const responseService = await axios.get(SERVICE_API);
        const responseProduct = await axios.get(PRODUCT_API);
        setServiceData(responseService.data.data);
        setProductData(responseProduct.data.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetcheData();
  }, []);

  const handleServiceChange = (e) => {
    const value = e.target.value;
    let selectedService = null; // Khởi tạo biến selectedService

    serviceData.forEach((service) => {
      const foundServiceDetail = service.serviceDetails.find(
        (detail) => detail.serviceDetailsName === value
      );
      if (foundServiceDetail) {
        selectedService = foundServiceDetail; // Gán selectedService nếu tìm thấy
      }
    });

    if (e.target.checked) {
      setSelectedServices((prev) => [...prev, value]);
      if (selectedService) {
        console.log(selectedService);
        setTotal((prevTotal) => prevTotal + selectedService.price); // Update total amount
      }
    } else {
      setSelectedServices((prev) =>
        prev.filter((service) => service !== value)
      );
      if (selectedService) {
        setTotal((prevTotal) => prevTotal - selectedService.price); // Update total amount
      }
    }
  };

  const handleProductChange = (e) => {
    const selected = productData.find((p) => p.productName === e.target.value); // Change to productName
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
          name: selectedProduct.productName,
          quantity: selectedQuantity,
          price: selectedProduct.price,
          image: selectedProduct.image,
        };
        setSelectedProductsList([...selectedProductsList, newItem]);
      }
      setTotal(
        (prevTotal) => prevTotal + selectedProduct.price * selectedQuantity
      ); // Update total amount
      setSelectedProduct(null);
      setSelectedQuantity(1);
    }
  };

  const handleRemoveProduct = (productId) => {
    const product = selectedProductsList.find(
      (item) => item.productId === productId
    );
    const updatedList = selectedProductsList.filter(
      (item) => item.productId !== productId
    );
    setSelectedProductsList(updatedList);
    setTotal((prevTotal) => prevTotal - product.price * product.quantity); // Update total amount
  };

  const handleCheckout = async () => {
    const newInvoice = {
      date: new Date().toLocaleDateString("vi-VN"),
      seller: userInfo?.username,
      total: total, // Use the total amount from state
      services: selectedServices.map((serviceName) => {
        let selectedService = null;

        serviceData.forEach((service) => {
          const foundServiceDetail = service.serviceDetails.find(
            (detail) => detail.serviceDetailsName === serviceName
          );
          if (foundServiceDetail) {
            selectedService = foundServiceDetail;
          }
        });

        return {
          serviceDetailsId: selectedService.serviceDetailId,
          serviceDetailsName: selectedService.serviceDetailsName,
          price: selectedService.price,
        };
      }),
      productOrders: selectedProductsList.map((product) => ({
        product: {
          productId: product.productId,
          productName: product.name,
          price: product.price,
        },
        quantity: product.quantity,
      })),
      paymentMethod: paymentMethod,
      customerName: customerName,
    };

    console.log(newInvoice);
    await axios.post(`${BILL_API}`, newInvoice);

    setCustomerName("");
    setSelectedProductsList([]);
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setSelectedServices([]);
    setTotal(0);
    toast("Thanh toán thành công");
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
            value={selectedProduct ? selectedProduct.productName : ""} // Change to productName
            onChange={handleProductChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Chọn sản phẩm</option>
            {productData.map((product) => (
              <option key={product.productId} value={product.productName}>
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.productName} // Change to productName
                    className="w-8 h-8 mr-2"
                  />
                  {product.productName}
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
                    {product.name} {/* Change to name */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <PriceComponent price={product.price} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      type="button"
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
        <label className="block text-gray-700 text-sm font-bold mb-4">
          Chọn dịch vụ
        </label>
        <div className="overflow-auto max-h-96 mb-4">
          <table className="min-w-full bg-white mt-3 rounded-lg text-left border">
            <thead className="bg-black border border-white ">
              <tr>
                {serviceData.map((service) => (
                  <th
                    key={service.serviceId}
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider border-b"
                  >
                    {service.serviceName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              <tr>
                {serviceData.map((service) => (
                  <td key={service.serviceId} className="px-6 py-4 border">
                    <ul>
                      {service.serviceDetails.map((serviceDetail) => (
                        <li
                          key={serviceDetail.serviceDetailId}
                          className="flex items-center py-1"
                        >
                          <input
                            type="checkbox"
                            value={serviceDetail.serviceDetailsName}
                            onChange={handleServiceChange}
                            className="mr-2 md:leading-tight "
                          />
                          <label className="text-gray-700">
                            {serviceDetail.serviceDetailsName}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Phương thức thanh toán
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="tiền mặt">Tiền mặt</option>
            <option value="chuyển khoản">Chuyển khoản</option>
          </select>
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
