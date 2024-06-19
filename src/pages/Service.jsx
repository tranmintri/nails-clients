import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import axios from "axios";
import { SERVICE_API } from "../router/ApiRoutes";
import ClipLoader from "react-spinners/ClipLoader";

const Service = () => {
  const [serviceData, setServiceData] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await axios.get(SERVICE_API);
        setServiceData(response.data.data);
      } catch (error) {
        console.error("Error fetching service data:", error);
      } finally {
        setLoading(false); // End loading after data is fetched or an error occurs
      }
    };

    fetchServiceData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <div className="flex-grow w-full pt-28 px-2 bg-gray-100 overflow-auto">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="loader-container">
              <ClipLoader color="#36D7B7" loading={loading} size={50} />
            </div>
          ) : (
            serviceData.map((service) => (
              <ServiceCard key={service.serviceId} service={service} />
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Service;
