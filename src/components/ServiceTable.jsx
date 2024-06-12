import React from "react";
import PriceComponent from "../util/PriceComponent";

export default function ServiceTable({ serviceName, services }) {
  return (
    <div className="">
      <p className="text-xl mt-8 mb-2">{serviceName}</p>
      <table className="min-w-full bg-white text-left">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4 border-b">Mã dịch vụ</th>
            <th className="py-2 px-4 border-b">Tên dịch vụ</th>
            <th className="py-2 px-4 border-b">Thời gian (phút)</th>
            <th className="py-2 px-4 border-b">Giá</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.serviceDetailId}>
              <td className="py-2 px-4 border-b">{service.serviceDetailId}</td>

              <td className="py-2 px-4 border-b">{service.name}</td>
              <td className="py-2 px-4 border-b">{service.time}</td>
              <td className="py-2 px-4 border-b">
                {" "}
                <PriceComponent price={service.price} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
