import React, { useEffect, useState } from "react";
import PriceComponent from "../../util/PriceComponent";
import axios from "axios";
import { BILL_API } from "../../router/ApiRoutes";
import { CalculateTime } from "../../util/CalculateTime";

export default function Bill() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoiceData, setInvoiceData] = useState([]);

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

  return (
    <div className="max-h-screen overflow-y-auto custom-scrollbar h-[90vh]">
      <div className="w-full px-5 pt-6 bg-slate-100 max-h-[45vh] ">
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
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {invoiceData.map((invoice) => (
                <tr
                  key={invoice.billId}
                  className={`cursor-pointer hover:bg-slate-200 `}
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
              <table className="min-w-full bg-white mt-3 rounded-lg text-left ">
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
    </div>
  );
}
