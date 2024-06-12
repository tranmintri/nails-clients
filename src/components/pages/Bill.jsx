import React, { useState } from "react";
import PriceComponent from "../../util/PriceComponent";

export default function Bill() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

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
      products: [
        { productId: 1, name: "Kem body", quantity: 2 },
        { productId: 2, name: "Serum", quantity: 3 },
      ],
      services: ["Gội đầu", "Cắt móng", "Tỉa da"],
      total: 100000,
    },
    {
      invoiceId: 2,
      products: [
        { productId: 1, name: "Kem body", quantity: 2 },
        { productId: 2, name: "Serum", quantity: 3 },
      ],

      services: ["Cắt móng", "Tỉa da"],
      total: 100000,
    },
    {
      invoiceId: 3,
      products: [
        { productId: 1, name: "Kem body", quantity: 2 },
        { productId: 2, name: "Serum", quantity: 3 },
      ],
      services: ["Gội đầu", "Tỉa da"],
      total: 100000,
    },
  ];

  const handleRowClick = (invoiceId) => {
    const selectedInvoice = invoiceDetailData.find(
      (detail) => detail.invoiceId === invoiceId
    );
    setSelectedInvoice(selectedInvoice);
  };

  return (
    <div className="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto custom-scrollbar">
      <div className="md:w-1/2 px-5 pt-6  bg-slate-100 h-[90vh]">
        <span className="text-xl">Danh sách hóa đơn</span>
        <div className="rounded-lg shadow-lg overflow-x-auto ">
          <table className="min-w-full bg-white mt-3 rounded-lg text-left">
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
      <div className="md:w-1/2 px-5 pt-6 h-[90vh] bg-slate-100">
        {selectedInvoice && (
          <div>
            <span className="text-xl">Chi tiết hóa đơn</span>
            <div className="rounded-lg shadow-lg overflow-x-auto">
              <table className="min-w-full bg-white mt-3 rounded-lg text-left">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="w-1/4 px-4 py-2">Sản Phẩm</th>
                    <th className="w-1/4 px-4 py-2">Số lượng</th>
                    <th className="w-1/4 px-4 py-2">Dịch vụ</th>
                    <th className="w-1/4 px-4 py-2">Tổng tiền</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {selectedInvoice.products.map((product, index) => (
                    <tr key={product.productId}>
                      <td className="border px-4 py-2">{product.name}</td>
                      <td className="border px-4 py-2">{product.quantity}</td>
                      {index === 0 && (
                        <td
                          className="border px-4 py-2"
                          rowSpan={selectedInvoice.products.length}
                        >
                          <ul className="list-disc ">
                            {selectedInvoice.services.map((service, idx) => (
                              <li key={idx}>{service}</li>
                            ))}
                          </ul>
                        </td>
                      )}
                      {index === 0 && (
                        <td
                          className="border px-4 py-2"
                          rowSpan={selectedInvoice.products.length}
                        >
                          <PriceComponent price={selectedInvoice.total} />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
