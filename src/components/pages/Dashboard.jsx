import React, { useEffect, useState } from "react";
import PriceComponent from "../../util/PriceComponent";
import axios from "axios";
import { BILL_API } from "../../router/ApiRoutes";
import { format } from "date-fns";
import { CalculateTime } from "../../util/CalculateTime";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [invoiceData, setInvoiceData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [total, setTotal] = useState(0);
  const [billCount, setBillCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await axios.get(BILL_API);

        const invoices = response.data;
        setInvoiceData(invoices);

        // Tính số lượng hóa đơn
        const billCount = invoices.length;
        setBillCount(billCount);

        // Tính số lượng sản phẩm, dịch vụ và tổng số tiền từ tất cả các hóa đơn
        let productCount = 0;
        let serviceCount = 0;
        let total = 0;
        invoices.forEach((invoice) => {
          // Đếm số lượng sản phẩm từ mỗi hóa đơn
          productCount += invoice.billDetail.productOrders.length;

          // Đếm số lượng dịch vụ từ mỗi hóa đơn
          serviceCount += invoice.billDetail.services.length;

          // Tính tổng số tiền từ mỗi hóa đơn
          total += invoice.total;
        });
        setProductCount(productCount);
        setServiceCount(serviceCount);
        setTotal(total);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchInvoiceData();
  }, []);

  const handleRowClick = (invoiceId) => {
    const selectedInvoice = invoiceData.find(
      (invoice) => invoice.billId === invoiceId
    );

    setSelectedInvoice(selectedInvoice);
  };

  const convertTimestampToDate = (timestamp) => {
    return new Date(timestamp);
  };

  const handleFilter = async () => {
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      toast("Chọn ngày sai");
      return;
    }
    if ((!startDate && endDate) || (startDate && !endDate)) {
      toast("Chưa chọn ngày");
      return;
    }

    const res = await axios(
      `${BILL_API}date_range?start=${new Date(startDate)}&end=${new Date(
        endDate
      )}`
    );
    setProductCount(res.data.totalProducts);
    setServiceCount(res.data.totalServices);
    setTotal(res.data.total);
    setBillCount(res.data.bills.length);
    setInvoiceData(res.data.bills);
  };

  return (
    <div className="pt-6 px-5 w-full h-full bg-slate-100">
      <div className="mb-4 flex justify-between flex-wrap">
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Ngày bắt đầu
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Ngày kết thúc
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
          />
        </div>
        <div>
          <button
            onClick={handleFilter}
            className="bg-gradient-to-br from-blue-100 to-green-100 shadow-lg text-gray-700 hover:bg-blue-700  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Tìm kiếm
          </button>
        </div>
      </div>
      <div className="w-full md:flex md:justify-center">
        <div className="md:w-3/12 w-full h-40 mt-5 shadow-xl rounded-lg mr-5 bg-gradient-to-br from-yellow-100 to-red-100 text-gray-700 text-center p-3 content-center">
          <p className="text-2xl font-medium">Doanh Thu</p>
          <span>
            <PriceComponent price={total} />
          </span>
        </div>
        <div className="md:w-3/12 w-full mt-5 h-40 shadow-xl rounded-lg mr-5 bg-gradient-to-br from-red-100 to-yellow-100 text-gray-700 text-center p-3 content-center">
          <p className="text-2xl font-medium">Tổng hóa đơn</p>
          <span>{billCount} Hóa đơn</span>
        </div>
        <div className="md:w-3/12 w-full h-40 shadow-xl mt-5 rounded-lg mr-5 bg-gradient-to-br from-yellow-100 to-red-100 text-gray-700 text-center p-3 content-center">
          <p className="text-2xl font-medium">Tổng sản phẩm</p>
          <span>{productCount} Sản phẩm</span>
        </div>
        <div className="md:w-3/12 w-full mt-5 h-40 shadow-xl rounded-lg bg-gradient-to-br from-red-100 to-yellow-100 text-gray-700 text-center p-3 content-center">
          <p className="text-2xl font-medium">Tổng số dịch vụ</p>
          <span>{serviceCount} Dịch vụ</span>
        </div>
      </div>
      <div className="pt-11">
        <span className="text-xl">Danh sách hóa đơn</span>
        <div className="rounded-lg shadow-lg overflow-x-auto mb-10">
          <table className="min-w-full bg-white mt-3 rounded-lg text-left ">
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
              {invoiceData.slice(0, 7).map((invoice) => (
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
      {selectedInvoice && (
        <div className="pt-11">
          <span className="text-xl">Chi tiết hóa đơn</span>
          <div className="rounded-lg shadow-lg overflow-x-auto">
            <table className="min-w-full bg-white mt-3 rounded-lg text-left mb-10">
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
                          <PriceComponent price={productOrder.product.price} />
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
                                (service, idx) => (
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
                          (service, idx) => (
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
  );
}
