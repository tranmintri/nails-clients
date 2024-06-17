import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";

const Service = () => {
  const serviceData = [
    {
      serviceDetails: [],
      serviceId: "4e3fd07b-1419-4434-b7a3-a703024457f6",
      serviceName: "Triệt lông",
    },
    {
      serviceId: "bdd7a6fb-1657-4708-ac08-0f72dc1fa07b",
      serviceName: "Spa",
      serviceDetails: [
        {
          serviceDetailId: "79d9b485-cbbc-4834-aa6b-15cce97161c0",
          serviceDetailsName: "Chăm sóc da",
          time: 0,
          price: 150000,
          status: "Đang kinh doanh",
        },
        {
          serviceDetailId: "29a21c53-5dce-4190-a79b-62a17ab91c37",
          serviceDetailsName: "Chăm sóc da mụn cơ bản",
          time: 0,
          price: 200000,
          status: "Đang kinh doanh",
        },
        {
          serviceDetailId: "1283b173-62c6-4b7a-8e1d-3eb9341d3ceb",
          serviceDetailsName: "Chăm sóc da mụn chuyên sâu",
          time: 0,
          price: 250000,
          status: "Đang kinh doanh",
        },
        {
          serviceDetailId: "58645510-d134-4057-9089-e985e53b9048",
          serviceDetailsName: "Vi kim tảo xoắn",
          time: 0,
          price: 250000,
          status: "Đang kinh doanh",
        },
        {
          serviceDetailId: "d0f8583d-aa0b-4638-9a84-f95faeb85312",
          serviceDetailsName: "Vi kim tảo xoắn ĐB",
          time: 0,
          price: 350000,
          status: "Đang kinh doanh",
        },
        {
          serviceDetailId: "7b909a7c-a392-4c73-b6a4-817bd36bbd97",
          serviceDetailsName: "Cấy tế bào gốc",
          time: 0,
          price: 450000,
          status: "Đang kinh doanh",
        },
        {
          serviceDetailId: "7b2821d2-323c-4879-b7fe-e100e80a7578",
          serviceDetailsName: "Thải chì",
          time: 0,
          price: 70000,
          status: "Đang kinh doanh",
        },
        {
          serviceDetailId: "9d11e563-7745-4bc3-9093-0ae81c7537fe",
          serviceDetailsName: "Massage body",
          time: 0,
          price: 210000,
          status: "Đang kinh doanh",
        },
        {
          serviceDetailId: "d3e939cb-e6a2-4b7f-a9e0-92860dcf9285",
          serviceDetailsName: "Massage cổ, vai gáy",
          time: 0,
          price: 129000,
          status: "Đang kinh doanh",
        },
        {
          serviceDetailId: "6e7499a9-6cae-4fa8-8713-71d34f1cbb54",
          serviceDetailsName: "Cấy pha lê căng bóng",
          time: 0,
          price: 600000,
          status: "Đang kinh doanh",
        },
      ],
    },
    {
      serviceDetails: [],
      serviceId: "c76591e3-8095-4080-a75f-845c85ffa1a3",
      serviceName: "Gội đầu",
    },
    {
      serviceId: "ca25c24d-a706-4c97-a4c1-e6435b4a62d7",
      serviceName: "Nails",
      serviceDetails: [
        {
          serviceDetailId: "03f19fbc-b442-457b-95ef-7b605a17765c",
          serviceDetailsName: "Cắt da tay chân",
          time: 0,
          price: 30000,
          status: "Đang kinh doanh",
        },
        {
          serviceDetailId: "9eceb8d6-ff2a-4bc2-86d7-6cec05007aa6",
          serviceDetailsName: "Sơn Gel",
          time: 0,
          price: 60000,
          status: "Đang kinh doanh",
        },
        {
          serviceDetailId: "5ab1b86d-8f87-4366-ae2c-4a7fa66f02c7",
          serviceDetailsName: "Đắp Gel",
          time: 0,
          price: 150000,
          status: "Đang kinh doanh",
        },
        {
          serviceDetailId: "92b4b3ce-8d76-4f19-93e4-6458b62ded01",
          serviceDetailsName: "Đắp bột",
          time: 0,
          price: 150000,
          status: "Đang kinh doanh",
        },
        {
          serviceDetailId: "db944a80-6dc9-4d05-a77b-bca9931b8372",
          serviceDetailsName: "Gắn móng",
          time: 0,
          price: 50000,
          status: "Đang kinh doanh",
        },
        {
          serviceDetailId: "9e850e13-243c-46f3-9909-111d1818c075",
          serviceDetailsName: "Tháo Gel",
          time: 0,
          price: 15000,
          status: "Đang kinh doanh",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <div className="flex-grow w-full pt-28 px-2 bg-gray-100 overflow-auto">
        <div className="max-w-4xl mx-auto">
          {serviceData.map((service) => (
            <ServiceCard key={service.serviceId} service={service} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Service;
