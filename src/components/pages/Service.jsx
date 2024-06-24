import React, { useEffect, useState } from "react";
import ServiceTable from "../ServiceTable";
import { CHARM_API, SERVICE_API } from "../../router/ApiRoutes";
import axios from "axios";

import ClipLoader from "react-spinners/ClipLoader"; // Import ClipLoader
import PriceComponent from "../../util/PriceComponent";

const Service = () => {
  const [services, setServices] = useState([]);
  const [charms, setCharms] = useState([]);
  const [updateServiceDetails, setUpdateServiceDetails] = useState();
  const [newServiceName, setNewServiceName] = useState("");
  const [isAddServiceModalOpen, setAddServiceModalOpen] = useState(false);
  const [isAddCharmModalOpen, setAddCharmModalOpen] = useState(false);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [newServiceDetail, setNewServiceDetail] = useState({
    serviceDetailsName: "",
    time: 0,
    price: 0,
    status: "Đang kinh doanh",
  });
  const [newCharm, setNewCharm] = useState({
    charmName: "",
    price: 0,
    quantity: 0,
  });
  const [isAddServiceDetailModalOpen, setAddServiceDetailModalOpen] =
    useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

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

  const handleAddCharm = async () => {
    // Check if there's already a charm with the same price
    const existingCharm = charms.find(
      (charm) => charm.price === newCharm.price
    );
    if (existingCharm) {
      // If exists, update quantity
      const updatedCharms = charms.map((charm) =>
        charm.price === newCharm.price
          ? { ...charm, quantity: charm.quantity + newCharm.quantity }
          : charm
      );
      setCharms(updatedCharms);
    } else {
      // If not exists, add new charm
      setCharms([...charms, { ...newCharm }]);
    }

    const res = await axios.post(CHARM_API, newCharm);
    setAddCharmModalOpen(false);
    // Clear input fields
    setNewCharm({ charmName: "", price: 0, quantity: 0 });
    // Handle saving new charm to backend or state as needed
  };

  useEffect(() => {
    const fetchServiceData = async () => {
      setLoading(true); // Set loading to true while fetching data
      try {
        const response = await axios.get(SERVICE_API);
        const responseCharm = await axios.get(CHARM_API);
        setCharms(responseCharm.data);
        setServices(response.data.data);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching service data:", error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchServiceData();
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
      <button
        className="mb-4 ml-4 px-4 py-2 bg-gradient-to-br from-indigo-100 to-indigo-200 text-gray-700"
        onClick={() => setAddCharmModalOpen(true)}
      >
        Thêm charm
      </button>
      {!loading ? (
        <div>
          <table className="min-w-full bg-white text-left w-full ">
            {/* Table for charms */}
            <thead className="bg-gradient-to-br from-pink-200 to-purple-200 text-gray-700">
              <tr>
                <th className="py-2 px-4 border-b">Loại charm</th>
                <th className="py-2 px-4 border-b">Số lượng</th>
              </tr>
            </thead>
            <tbody>
              {/* Render charms here */}
              {/* Example structure: */}
              {charms.map((charm) => (
                <tr key={charm.charmId}>
                  <td className="py-2 px-4 border-b">
                    Loại <PriceComponent price={charm.price} />
                  </td>
                  <td className="py-2 px-4 border-b">{charm.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
        </div>
      ) : (
        <div className="loader-container">
          <ClipLoader color="#36D7B7" loading={loading} size={50} />
        </div>
      )}

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
      {isAddCharmModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded">
            <h2 className="text-xl mb-4">Thêm Charm</h2>
            <label>Tên charm (nếu có)</label>
            <input
              type="text"
              value={newCharm.charmName}
              onChange={(e) =>
                setNewCharm({ ...newCharm, charmName: e.target.value })
              }
              placeholder="Tên charm (nếu có)"
              className="mb-5 px-4 py-2 border rounded w-full"
            />
            <label>Giá</label>
            <input
              type="number"
              value={newCharm.price}
              onChange={(e) =>
                setNewCharm({ ...newCharm, price: parseInt(e.target.value) })
              }
              placeholder="Giá"
              className="mb-5 px-4 py-2 border rounded w-full"
            />
            <label>Số lượng</label>
            <input
              type="number"
              value={newCharm.quantity}
              onChange={(e) =>
                setNewCharm({ ...newCharm, quantity: parseInt(e.target.value) })
              }
              placeholder="Số lượng"
              className="mb-5 px-4 py-2 border rounded w-full"
            />

            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
                onClick={() => setAddCharmModalOpen(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleAddCharm}
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
