import React, { useState } from "react";
import PriceComponent from "../../util/PriceComponent";

export default function Dashboard() {
  const invoiceData = [
    {
      invoiceId: 1,
      name: "Đào Thị Phương Thảo",
      date: "2024-06-12",
      amount: 100000,
    },
    { invoiceId: 2, name: "Jane Smith", date: "2024-06-11", amount: 200000 },
    { invoiceId: 3, name: "Sam Johnson", date: "2024-06-10", amount: 300000 },
  ];

  const invoiceDetailData = [
    {
      invoiceId: 1,
      productName: "Kem body",
      quantity: 3,
      services: ["Gội đầu", "Cắt móng", "Tỉa da"],
      total: 100000,
    },
    {
      invoiceId: 2,
      productName: "Serum",
      quantity: 3,
      services: ["Cắt móng", "Tỉa da"],
      total: 100000,
    },
    {
      invoiceId: 3,
      productName: "Kem body",
      quantity: 3,
      services: ["Gội đầu", "Tỉa da"],
      total: 100000,
    },
  ];

  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

  const handleRowClick = (invoiceId) => {
    setSelectedInvoiceId(invoiceId);
  };

  const selectedInvoiceDetails = invoiceDetailData.filter(
    (detail) => detail.invoiceId === selectedInvoiceId
  );

  return (
    <div className="pt-6 px-5 w-full h-full bg-slate-100">
      <div className="w-full md:flex md:justify-center">
        <div className="md:w-3/12 w-full h-40 mt-5 shadow-xl rounded-lg mr-5 bg-white text-center p-3 content-center">
          <p className="text-2xl font-medium">Doanh Thu</p>
          <span>
            <PriceComponent price={100000000} />
          </span>
        </div>
        <div className="md:w-3/12 w-full mt-5 h-40 shadow-xl rounded-lg mr-5 bg-white text-center p-3 content-center">
          <p className="text-2xl font-medium">Tổng hóa đơn</p>
          <span>{30} Hóa đơn</span>
        </div>
        <div className="md:w-3/12 w-full h-40 shadow-xl mt-5 rounded-lg mr-5 bg-white text-center p-3 content-center">
          <p className="text-2xl font-medium">Tổng sản phẩm</p>
          <span>{30} Sản phẩm</span>
        </div>
        <div className="md:w-3/12 w-full mt-5 h-40 shadow-xl rounded-lg bg-white text-center p-3 content-center">
          <p className="text-2xl font-medium">Tổng số dịch vụ</p>
          <span>{30} Dịch vụ</span>
        </div>
      </div>
      <div className="pt-11">
        <span className="text-xl">Danh sách hóa đơn</span>
        <div className="rounded-lg shadow-lg overflow-x-auto">
          <table className="min-w-full bg-white mt-3 rounded-lg ">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/4 px-4 py-2">#</th>
                <th className="w-1/4 px-4 py-2">Tên</th>
                <th className="w-1/4 px-4 py-2">Ngày</th>
                <th className="w-1/4 px-4 py-2">Thành tiền</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {invoiceData.map((invoice) => (
                <tr
                  key={invoice.invoiceId}
                  className={`cursor-pointer hover:bg-slate-200 `}
                  onClick={() => handleRowClick(invoice.invoiceId)}
                >
                  <td className="border px-4 py-2">{invoice.invoiceId}</td>
                  <td className="border px-4 py-2">{invoice.name}</td>
                  <td className="border px-4 py-2">{invoice.date}</td>
                  <td className="border px-4 py-2">
                    <PriceComponent price={invoice.amount} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedInvoiceId && (
        <div className="pt-11">
          <span className="text-xl">Chi tiết hóa đơn</span>
          <div className="rounded-lg shadow-lg overflow-x-auto">
            <table className="min-w-full bg-white mt-3 rounded-lg">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="w-1/4 px-4 py-2">Sản Phẩm</th>
                  <th className="w-1/4 px-4 py-2">Số lượng</th>
                  <th className="w-1/4 px-4 py-2">Dịch vụ</th>
                  <th className="w-1/4 px-4 py-2">Tổng tiền</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {selectedInvoiceDetails.map((invoiceDetail) => (
                  <tr key={invoiceDetail.invoiceId}>
                    <td className="border px-4 py-2">
                      {invoiceDetail.productName}
                    </td>
                    <td className="border px-4 py-2">
                      {invoiceDetail.quantity}
                    </td>
                    <td className="border px-4 py-2">
                      {invoiceDetail.services.join(", ")}
                    </td>
                    <td className="border px-4 py-2">
                      <PriceComponent price={invoiceDetail.total} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
