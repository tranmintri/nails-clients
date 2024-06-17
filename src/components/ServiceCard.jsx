import React from "react";
import PriceComponent from "./../util/PriceComponent";

const ServiceCard = ({ service }) => {
  return (
    <div className="p-4 bg-white  rounded-lg mb-4 shadow-lg">
      {service.serviceDetails.length > 0 && (
        <h2 className="text-2xl font-bold mb-2 text-blue-600">
          {service.serviceName}
        </h2>
      )}

      {service.serviceDetails.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
          {service.serviceDetails.map((detail) => (
            <div
              key={detail.serviceDetailId}
              className="border border-gray-200 rounded-lg p-4 shadow-lg bg-gradient-to-br from-pink-100 to-purple-100"
            >
              <h3 className="text-xl font-semibold text-gray-60000">
                {detail.serviceDetailsName}
              </h3>
              {detail.time > 0 && (
                <p className="text-gray-600">Thời gian: {detail.time} phút</p>
              )}
              {detail.price > 0 && (
                <p className="text-gray-600">
                  Giá: <PriceComponent price={detail.price} />
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
