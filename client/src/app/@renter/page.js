import React from "react";
import RentCars from "@/components/RentCars";
import ApprovedCars from "@/components/ApprovedCars";

export default function page() {
  return (
    <div className="text-white flex justify-between w-screen">
      <div>
        <RentCars />
      </div>
      <div>
        <h1>Approved</h1>
        <ApprovedCars />
      </div>
    </div>
  );
}
