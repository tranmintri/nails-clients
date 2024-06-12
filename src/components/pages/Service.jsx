import React, { useState } from "react";
import ServiceTable from "../ServiceTable";

const Service = () => {
  const [services, setServices] = useState([
    {
      serviceName: "Nails",
      serviceDetails: [
        { serviceDetailId: 1, name: "Nail design", time: 60, price: "50000" },
        { serviceDetailId: 2, name: "Manicure", time: 30, price: "50000" },
        // Add more nails services as needed
      ],
    },
    {
      serviceName: "Spa",
      serviceDetails: [
        { serviceDetailId: 1, name: "Facial", time: 90, price: "50000" },
        { serviceDetailId: 2, name: "Massage", time: 60, price: "50000" },
        // Add more spa services as needed
      ],
    },
    {
      serviceName: "Gội đầu",
      serviceDetails: [
        { serviceDetailId: 1, name: "Hair Wash", time: 20, price: "50000" },
        {
          serviceDetailId: 2,
          name: "Hair Treatment",
          time: 40,
          price: "50000",
        },
        // Add more shampoo services as needed
      ],
    },
    {
      serviceName: "Triệt lông",
      serviceDetails: [
        { serviceDetailId: 1, name: "Leg Waxing", time: 45, price: "50000" },
        { serviceDetailId: 2, name: "Arm Waxing", time: 30, price: "50000" },
        // Add more waxing services as needed
      ],
    },
  ]);

  const [newServiceName, setNewServiceName] = useState("");
  const [isAddServiceModalOpen, setAddServiceModalOpen] = useState(false);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [newServiceDetail, setNewServiceDetail] = useState({
    name: "",
    time: "",
    price: "",
  });
  const [isAddServiceDetailModalOpen, setAddServiceDetailModalOpen] =
    useState(false);

  const handleAddService = () => {
    const newService = {
      serviceName: newServiceName,
      serviceDetails: [],
    };
    setServices([...services, newService]);
    setNewServiceName("");
    setAddServiceModalOpen(false);
  };

  const handleAddServiceDetail = () => {
    const updatedServices = [...services];
    updatedServices[selectedServiceIndex].serviceDetails.push({
      serviceDetailId:
        updatedServices[selectedServiceIndex].serviceDetails.length + 1,
      ...newServiceDetail,
    });
    setServices(updatedServices);
    setNewServiceDetail({
      name: "",
      time: "",
      price: "",
    });
    setAddServiceDetailModalOpen(false);
  };

  return (
    <div className="pt-6 px-5 w-full h-full bg-slate-100 overflow-auto custom-scrollbar max-h-screen">
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setAddServiceModalOpen(true)}
      >
        Thêm dịch vụ
      </button>

      <button
        className="mb-4 ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setAddServiceDetailModalOpen(true)}
      >
        Thêm chi tiết dịch vụ
      </button>

      {services.map((service, index) => (
        <ServiceTable
          key={index}
          serviceName={service.serviceName}
          services={service.serviceDetails}
        />
      ))}

      {isAddServiceModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded">
            <h2 className="text-xl mb-4">Thêm Service mới</h2>
            <input
              type="text"
              value={newServiceName}
              onChange={(e) => setNewServiceName(e.target.value)}
              placeholder="Tên Service"
              className="mb-2 px-4 py-2 border rounded w-full"
            />
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
                onClick={() => setAddServiceModalOpen(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleAddService}
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddServiceDetailModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded">
            <h2 className="text-xl mb-4">Thêm Service Detail</h2>
            <select
              className="mb-2 px-4 py-2 border rounded w-full"
              value={selectedServiceIndex}
              onChange={(e) =>
                setSelectedServiceIndex(parseInt(e.target.value))
              }
            >
              {services.map((service, index) => (
                <option key={index} value={index}>
                  {service.serviceName}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={newServiceDetail.name}
              onChange={(e) =>
                setNewServiceDetail({
                  ...newServiceDetail,
                  name: e.target.value,
                })
              }
              placeholder="Tên Service Detail"
              className="mb-2 px-4 py-2 border rounded w-full"
            />
            <input
              type="text"
              value={newServiceDetail.time}
              onChange={(e) =>
                setNewServiceDetail({
                  ...newServiceDetail,
                  time: e.target.value,
                })
              }
              placeholder="Thời gian"
              className="mb-2 px-4 py-2 border rounded w-full"
            />
            <input
              type="text"
              value={newServiceDetail.price}
              onChange={(e) =>
                setNewServiceDetail({
                  ...newServiceDetail,
                  price: e.target.value,
                })
              }
              placeholder="Giá"
              className="mb-2 px-4 py-2 border rounded w-full"
            />
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
                onClick={() => setAddServiceDetailModalOpen(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleAddServiceDetail}
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
