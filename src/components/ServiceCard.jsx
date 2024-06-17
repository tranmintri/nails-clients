import React from "react";

const ServiceCard = ({ service }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg mb-4">
      {service.serviceDetails.length > 0 && (
        <h2 className="text-2xl font-bold mb-2 text-blue-600">
          {service.serviceName}
        </h2>
      )}

      {service.serviceDetails.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {service.serviceDetails.map((detail) => (
            <div
              key={detail.serviceDetailId}
              className="border border-gray-200 rounded-lg p-4"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {detail.serviceDetailsName}
              </h3>
              {detail.time > 0 && (
                <p className="text-gray-600">Thời gian: {detail.time} phút</p>
              )}
              {detail.price > 0 && (
                <p className="text-gray-600">
                  Giá: {detail.price.toLocaleString("vi-VN")} VND
                </p>
              )}

              <div className="mt-2 text-gray-600">
                <p>Liên hệ</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
