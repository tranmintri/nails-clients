import React, { useEffect, useState } from "react";
import ServiceTable from "../ServiceTable";
import { SERVICE_API } from "../../router/ApiRoutes";
import axios from "axios";

import ClipLoader from "react-spinners/ClipLoader"; // Import ClipLoader

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

  useEffect(() => {
    const fetchServiceData = async () => {
      setLoading(true); // Set loading to true while fetching data
      try {
        const response = await axios.get(SERVICE_API);
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

      {/* Display loading spinner while fetching data */}

      {/* Display service tables only when data is fetched */}
      {!loading ? (
        services.map((service, index) => (
          <ServiceTable
            key={index}
            service={service}
            serviceDetails={service.serviceDetails}
            onEditServiceDetail={(updatedService) =>
              handleEditServiceDetail(service.serviceId, updatedService)
            }
          />
        ))
      ) : (
        <div className="loader-container">
          <ClipLoader color="#36D7B7" loading={loading} size={50} />
        </div>
      )}

      {isAddServiceModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          {/* Add service modal content */}
        </div>
      )}

      {isAddServiceDetailModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          {/* Add service detail modal content */}
        </div>
      )}
    </div>
  );
};

export default Service;
