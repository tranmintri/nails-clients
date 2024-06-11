import React from "react";
import NavigationAdmin from "../components/NavigationAdmin";
import ContentAdmin from "../components/ContentAdmin";

export default function Admin() {
  return (
    <div className="h-screen w-full">
      <div className="h-[10vh]">
        {" "}
        <NavigationAdmin />
      </div>
      <div className="h-[90vh]">
        <ContentAdmin />
      </div>
    </div>
  );
}
