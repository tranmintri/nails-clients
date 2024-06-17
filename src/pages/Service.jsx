import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import axios from "axios";
import { SERVICE_API } from "../router/ApiRoutes";

const Service = () => {
  const [serviceData, setServiceData] = useState([]);
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await axios.get(SERVICE_API);

        setServiceData(response.data.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchServiceData();
  }, []);

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
