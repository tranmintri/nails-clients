import React, { useEffect, useState } from "react";
import PriceComponent from "../../util/PriceComponent";
import axios from "axios";
import { BILL_API } from "../../router/ApiRoutes";
import { CalculateTime } from "../../util/CalculateTime";
import logoBlackNails from "../../assets/logo1.png";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import PriceComponentBill from "../../util/PriceComponentBill";

export default function Bill() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoiceData, setInvoiceData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await axios.get(BILL_API);
        console.log(response.data);
        setInvoiceData(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchInvoiceData();
  }, []);

  const handleRowClick = (billId) => {
    const selectedInvoice = invoiceData.find(
      (invoice) => invoice.billId === billId
    );
    console.log(selectedInvoice);
    setSelectedInvoice(selectedInvoice);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handlePrint = () => {
    const node = document.getElementById("modal-content");
    const printButton = document.getElementById("print-button");
    const closeButton = document.getElementById("close-button");
    // Tạm thời ẩn nút in
    printButton.style.display = "none";
    closeButton.style.display = "none";

    html2canvas(node, { scale: 4 }).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, `${Date.now()}.png`);
      });

      // Hiện lại nút in sau khi chụp ảnh
      printButton.style.display = "block";
      closeButton.style.display = "block";
      setShowModal(false);
    });
  };

  const handlePrintClick = (invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
  };

  return (
    <div className="max-h-screen overflow-y-auto custom-scrollbar h-[90vh]">
      <div className="w-full px-5 pt-6 bg-slate-100 max-h-[45vh]">
        <span className="text-xl">Danh sách hóa đơn</span>
        <div className="rounded-lg shadow-lg overflow-auto max-h-[40vh]">
          <table className="min-w-full bg-white mt-3 rounded-lg text-left">
            <thead className="bg-gradient-to-br from-pink-200 to-purple-200 text-gray-700">
              <tr>
                <th className="w-1/4 px-4 py-2">Tên khách hàng</th>
                <th className="w-1/4 px-4 py-2">Tên nhân viên</th>
                <th className="w-1/4 px-4 py-2">Ngày</th>
                <th className="w-1/4 px-4 py-2">Phương thức thanh toán</th>
                <th className="w-1/4 px-4 py-2">Thành tiền</th>
                <th className="w-1/4 px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {invoiceData.map((invoice) => (
                <tr
                  key={invoice.billId}
                  className={`cursor-pointer hover:bg-slate-200`}
                  onClick={() => handleRowClick(invoice.billId)}
                >
                  <td className="border px-4 py-2">{invoice.customerName}</td>
                  <td className="border px-4 py-2">{invoice.seller}</td>
                  <td className="border px-4 py-2">
                    {CalculateTime(invoice.date)}
                  </td>
                  <td className="border px-4 py-2">{invoice.paymentMethod}</td>
                  <td className="border px-4 py-2">
                    <PriceComponent price={invoice.total} />
                  </td>
                  <td
                    className="py-2 px-4 border-b shadow-lg"
                    onClick={() => handlePrintClick(invoice)}
                  >
                    <button className="shadow-lg bg-gradient-to-br from-green-100 to-green-200 rounded-lg px-4 py-2">
                      In
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full px-5 bg-slate-100 max-h-[45vh]">
        {selectedInvoice && (
          <div className="mt-10">
            <span className="text-xl">Chi tiết hóa đơn</span>
            <div className="rounded-lg shadow-lg overflow-auto max-h-[40vh] mb-5">
              <table className="min-w-full bg-white mt-3 rounded-lg text-left">
                <thead className="bg-gradient-to-br from-pink-200 to-purple-200 text-gray-700">
                  <tr>
                    <th className="w-1/6 px-4 py-2">Sản Phẩm</th>
                    <th className="w-1/6 px-4 py-2">Số lượng</th>
                    <th className="w-1/4 px-4 py-2">Giá tiền/sản phẩm</th>
                    <th className="w-1/2 px-4 py-2">Dịch vụ - Giá</th>
                    <th className="w-1/6 px-4 py-2">Tổng tiền</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {selectedInvoice.billDetail.productOrders.length > 0 ? (
                    selectedInvoice.billDetail.productOrders.map(
                      (productOrder, index) => (
                        <tr key={productOrder.product.productId}>
                          <td className="border px-4 py-2">
                            {productOrder.product.productName}
                          </td>
                          <td className="border px-4 py-2">
                            {productOrder.quantity}
                          </td>
                          <td className="border px-4 py-2">
                            <PriceComponent
                              price={productOrder.product.price}
                            />
                          </td>
                          {index === 0 && (
                            <td
                              className="border px-4 py-2"
                              rowSpan={
                                selectedInvoice.billDetail.productOrders.length
                              }
                            >
                              <ul className="">
                                {selectedInvoice.billDetail.services.map(
                                  (service) => (
                                    <li
                                      key={service.serviceDetailsId}
                                      className=""
                                    >
                                      {service.serviceDetailsName} -{" "}
                                      <PriceComponent price={service.price} />
                                    </li>
                                  )
                                )}
                              </ul>
                            </td>
                          )}
                          {index === 0 && (
                            <td
                              className="border px-4 py-2"
                              rowSpan={
                                selectedInvoice.billDetail.productOrders.length
                              }
                            >
                              <PriceComponent price={selectedInvoice.total} />
                            </td>
                          )}
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td colSpan="3" className="border px-4 py-2">
                        Không có sản phẩm
                      </td>
                      <td className="border px-4 py-2">
                        <ul className="">
                          {selectedInvoice.billDetail.services.map(
                            (service) => (
                              <li key={service.serviceDetailsId} className="">
                                {service.serviceDetailsName} -{" "}
                                <PriceComponent price={service.price} />
                              </li>
                            )
                          )}
                        </ul>
                      </td>
                      <td className="border px-4 py-2">
                        <PriceComponent price={selectedInvoice.total} />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center pt-20 justify-center h-screen bg-black bg-opacity-50 ">
          <div
            className=" bg-white rounded-lg px-3 py-2 w-56 "
            id="modal-content "
          >
            <div className="flex justify-between w-full mb-1 items-center">
              <div className=" ">
                <p className="mb-1 text-[8px]">9/2A Hẻm 855</p>
                <p className="mb-1 text-[8px]">Nguyễn Bình Nhơn Đức,</p>
                <p className="mb-1 text-[8px]">Nhà Bè TPHCM</p>
              </div>
              <div className="2">
                <img
                  src={logoBlackNails}
                  alt="Logo"
                  width={50}
                  className="md:w-16"
                />
              </div>
            </div>
            <div>
              <p className="mb-1 text-[15px] flex justify-center w-full">
                Phương Nails & Spa
              </p>
              <p className="mb-1 text-[10px]">
                Ngày: {new Date(selectedInvoice.date).toLocaleDateString()}
              </p>
              <p className="mb-1 text-[10px]">
                Khách hàng: {selectedInvoice.customerName}
              </p>
            </div>

            {/* Display product orders in a table */}
            <div>
              <h3 className="text-[10px] font-bold mt-1 mb-1 flex justify-center">
                Sản phẩm
              </h3>
              <table className="text-[8px] w-full border-collapse border border-gray-400">
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-2 py-1">Tên</th>
                    <th className="border border-gray-400 px-2 py-1">
                      Số lượng
                    </th>
                    <th className="border border-gray-400 px-2 py-1">Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.billDetail.productOrders.map(
                    (productOrder, index) => (
                      <tr key={index}>
                        <td className="text-[8px] border border-gray-400 px-2 py-1">
                          {productOrder.product.productName}
                        </td>
                        <td className="border border-gray-400 px-2 py-1">
                          {productOrder.quantity}
                        </td>
                        <td className="border border-gray-400 px-2 py-1">
                          <PriceComponentBill
                            price={productOrder.product.price}
                          />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* Display services in a list */}
            <h3 className="text-[10px] font-bold mt-1 mb-1 flex justify-center">
              Dịch vụ
            </h3>
            <div className="flex justify-center">
              <table className="text-[8px] border-collapse border border-gray-400">
                <thead>
                  <tr>
                    <th className="text-[8px] border border-gray-400 px-4 py-1 font-bold text-left">
                      Tên dịch vụ
                    </th>
                    <th className="text-[8px] border border-gray-400 px-4 py-1   font-bold text-left">
                      Giá
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.billDetail.services.map((service, index) => (
                    <tr key={index}>
                      <td className="border text-[8px] border-gray-400 px-2 py-1">
                        {service.serviceDetailsName}
                      </td>
                      <td className="border text-[8px] border-gray-400 px-2 py-1">
                        <PriceComponentBill price={service.price} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mb-1 text-[10px] flex justify-end mt-3">
              Phương thức thanh toán:{" "}
              <span className="ml-3">{selectedInvoice.paymentMethod}</span>
            </p>
            <div className="text-[10px] mb-1 mt-1 font-bold flex justify-end">
              <div className="text-[10px]">
                Tổng cộng:{" "}
                <span className="ml-3 text-[10px]">
                  <PriceComponentBill price={selectedInvoice.total} />
                </span>
              </div>
            </div>

            <button
              id="print-button"
              onClick={handlePrint}
              className="bg-green-500  text-white py-1 px-4 rounded mt-2 mr-3 text-[10px]"
            >
              In
            </button>
            <button
              id="close-button"
              onClick={handleClose}
              className="bg-red-500 text-white py-1 px-4 rounded mt-2 text-[10px]"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
