import React, { useState } from "react";
import PriceComponent from "../util/PriceComponent";
import axios from "axios";
import { SERVICE_API } from "../router/ApiRoutes";

export default function ServiceTable({
  service,
  serviceDetails,
  onEditServiceDetail,
}) {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editedId, setEditedID] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editedTime, setEditedTime] = useState();
  const [editedPrice, setEditedPrice] = useState();
  const [editedStatus, setEditedStatus] = useState("");

  const handleEditClick = (serviceDetails) => {
    setEditedID(serviceDetails.serviceDetailId);
    setEditedName(serviceDetails.serviceDetailsName);
    setEditedTime(serviceDetails.time);
    setEditedPrice(serviceDetails.price);
    setEditedStatus(serviceDetails.status);
    setEditModalOpen(true);
  };

  const handleSaveChanges = async (serviceDetailsId) => {
    console.log(serviceDetailsId);
    const updatedServiceDetails = serviceDetails.map((el) => {
      if (el.serviceDetailId === serviceDetailsId) {
        return {
          ...el,
          serviceDetailsName: editedName,
          time: editedTime,
          price: editedPrice,
          status: editedStatus,
        };
      }
      return el;
    });
    const response = await axios.put(
      SERVICE_API + service.serviceId + "/serviceDetail/" + serviceDetailsId,
      {
        serviceDetailId: serviceDetailsId,
        serviceDetailsName: editedName,
        time: editedTime,
        price: editedPrice,
        status: editedStatus,
      }
    );
    onEditServiceDetail(updatedServiceDetails);
    setEditModalOpen(false);
  };

  return (
    <div className="">
      <p className="text-xl mt-8 mb-2">{service.serviceName}</p>
      <table className="min-w-full bg-white text-left">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4 border-b">Tên dịch vụ</th>
            <th className="py-2 px-4 border-b">Thời gian (phút)</th>
            <th className="py-2 px-4 border-b">Giá</th>
            <th className="py-2 px-4 border-b">Trạng thái</th>
            <th className="py-2 px-4 border-b">Chỉnh sửa</th>
          </tr>
        </thead>
        <tbody>
          {serviceDetails.map((serviceDetail) => (
            <tr key={serviceDetail.serviceDetailId}>
              <td className="py-2 px-4 border-b">
                {serviceDetail.serviceDetailsName}
              </td>
              <td className="py-2 px-4 border-b">{serviceDetail.time}</td>
              <td className="py-2 px-4 border-b">
                <PriceComponent price={serviceDetail.price} />
              </td>
              <td
                className={`py-2 px-4 border-b ${
                  serviceDetail.status == "Ngừng kinh doanh"
                    ? "text-red-500"
                    : "text-black"
                }`}
              >
                {serviceDetail.status}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEditClick(serviceDetail)}
                  className="bg-blue-300 rounded-lg px-1 py-2"
                >
                  Chỉnh sửa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded">
            <h2 className="text-xl mb-4">Chỉnh sửa dịch vụ</h2>
            <label>Tên dịch vụ</label>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              placeholder="Tên dịch vụ"
              className="mb-5 px-4 py-2 border rounded w-full"
            />
            <label>Thời gian</label>
            <input
              type="text"
              value={editedTime}
              onChange={(e) => setEditedTime(e.target.value)}
              placeholder="Thời gian (phút)"
              className="mb-5 px-4 py-2 border rounded w-full"
            />
            <label>Giá tiền</label>
            <input
              type="text"
              value={editedPrice}
              onChange={(e) => setEditedPrice(e.target.value)}
              placeholder="Giá"
              className="mb-5 px-4 py-2  border rounded w-full"
            />
            <label>Trạng thái</label>
            <select
              value={editedStatus}
              onChange={(e) => setEditedStatus(e.target.value)}
              className="mb-2 px-4 py-2 border rounded w-full"
            >
              <option value="Đang kinh doanh">Đang kinh doanh</option>
              <option value="Ngừng kinh doanh">Ngừng kinh doanh</option>
            </select>
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
                onClick={() => setEditModalOpen(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => handleSaveChanges(editedId)}
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
