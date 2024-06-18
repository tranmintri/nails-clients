import React from "react";

function PriceComponentBill({ price }) {
  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);

  return <span className="text-[8px]  ">{formattedPrice}</span>;
}

export default PriceComponentBill;
