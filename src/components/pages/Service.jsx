import React, { useEffect, useState } from "react";
import ServiceTable from "../ServiceTable";
import { SERVICE_API } from "../../router/ApiRoutes";
import axios from "axios";

const Service = () => {
  const [services, setServices] = useState([]);
  const [updateServiceDetails, setUpdateServiceDetails] = useState();
  const [newServiceName, setNewServiceName] = useState("");
  const [isAddServiceModalOpen, setAddServiceModalOpen] = useState(false);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [newServiceDetail, setNewServiceDetail] = useState({
    serviceDetailsName: "",
    time: 0,
    price: 0,
    status: "Đang kinh doanh",
  });
  const [isAddServiceDetailModalOpen, setAddServiceDetailModalOpen] =
    useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddService = async () => {
    const newService = {
      serviceName: newServiceName,
      serviceDetails: [],
    };
    const response = await axios.post(SERVICE_API, newService);

    setServices([...services, response.data.data]);
    setNewServiceName("");
    setAddServiceModalOpen(false);
  };

  const handleAddServiceDetail = async () => {
    const updatedServices = [...services];
    const response = await axios.post(
      SERVICE_API +
        updatedServices[selectedServiceIndex].serviceId +
        "/serviceDetail",
      newServiceDetail
    );
    updatedServices[selectedServiceIndex].serviceDetails.push({
      serviceDetailId:
        updatedServices[selectedServiceIndex].serviceDetails.length + 1,
      ...response.data.data,
    });
    setServices(updatedServices);
    setNewServiceDetail({
      serviceDetailsName: "",
      time: 0,
      price: 0,
      status: "Đang kinh doanh",
    });
    setAddServiceDetailModalOpen(false);
  };

  const handleEditServiceDetail = (serviceId, updatedService) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.serviceId === serviceId
          ? { ...service, serviceDetails: updatedService }
          : service
      )
    );
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(SERVICE_API);
        setServices(response.data.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);

  return (
    <div className="pt-6 px-5 w-full h-full bg-slate-100 md:overflow-auto md:custom-scrollbar md:max-h-screen">
      <button
        className="mb-4 px-4 py-2 bg-gradient-to-br from-blue-100 to-blue-200 text-gray-700 rounded"
        onClick={() => setAddServiceModalOpen(true)}
      >
        Thêm dịch vụ
      </button>

      <button
        className="mb-4 ml-4 px-4 py-2 bg-gradient-to-br from-orange-100 to-orange-200 text-gray-700"
        onClick={() => setAddServiceDetailModalOpen(true)}
      >
        Thêm chi tiết dịch vụ
      </button>

      {services.map((service, index) => (
        <ServiceTable
          key={index}
          service={service}
          serviceDetails={service.serviceDetails}
          onEditServiceDetail={(updatedService) =>
            handleEditServiceDetail(service.serviceId, updatedService)
          }
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
              className="mb-2 px-4 py-2 border rounded w-full "
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
            <label>Dịch vụ</label>
            <select
              className="mb-5 px-4 py-2 border rounded w-full"
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
            <label className="">Tên chi tiết dịch vụ</label>
            <input
              type="text"
              value={newServiceDetail.serviceDetailsName}
              onChange={(e) =>
                setNewServiceDetail({
                  ...newServiceDetail,
                  serviceDetailsName: e.target.value,
                })
              }
              placeholder="Tên Service Detail"
              className="mb-5 px-4 py-2 border rounded w-full"
            />
            <label className="">Thời gian</label>
            <input
              type="number"
              value={newServiceDetail.time}
              onChange={(e) =>
                setNewServiceDetail({
                  ...newServiceDetail,
                  time: parseInt(e.target.value),
                })
              }
              placeholder="Thời gian"
              className="mb-5 px-4 py-2 border rounded w-full"
            />
            <label className="">Giá tiền</label>
            <input
              type="number"
              value={newServiceDetail.price}
              onChange={(e) =>
                setNewServiceDetail({
                  ...newServiceDetail,
                  price: parseInt(e.target.value),
                })
              }
              placeholder="Giá"
              className="mb-5 px-4 py-2 border rounded w-full"
            />
            <label className="">Trạng thái</label>
            <select
              className="mb-2 px-4 py-2 border rounded w-full"
              value={newServiceDetail.status}
              onChange={(e) =>
                setNewServiceDetail({
                  ...newServiceDetail,
                  status: e.target.value,
                })
              }
            >
              <option value="Đang kinh doanh">Đang kinh doanh</option>
              <option value="Ngừng kinh doanh">Ngừng kinh doanh</option>
            </select>
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
