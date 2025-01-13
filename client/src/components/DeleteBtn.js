import React from "react";
import axios from "axios";

export default function DeleteBtn({ carID, fetchCarList }) {
  const deleteCar = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9999/api/car/deletecar", // Replace with your API endpoint
        { carID }, // Send carID in the body
        { withCredentials: true } // Include credentials
      );
      fetchCarList();
      console.log("Car deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <button
      className="p-1 text-xs font-semibold text-black bg-white"
      onClick={deleteCar}
    >
      Delete
    </button>
  );
}
