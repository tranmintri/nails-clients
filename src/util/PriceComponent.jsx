import React from "react";

function PriceComponent({ price }) {
  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);

  return <span className="text-lg  ">{formattedPrice}</span>;
}

export default PriceComponent;
