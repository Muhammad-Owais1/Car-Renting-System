import React from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function ApproveBtn({ carID, fetchCarList }) {
  const { userInfo } = useAuth();
  const handleRequest = async () => {
    try {
      // Axios PATCH request
      const { username, email } = userInfo;
      const response = await axios.patch(
        "http://localhost:9999/api/car/approvecarreq", // Replace with your API endpoint
        { carID }, // Data to send in the body
        {
          withCredentials: true, // Include credentials (e.g., cookies, tokens)
          headers: {
            "Content-Type": "application/json", // Set the content type
          },
        }
      );
      console.log("Response:", response); // Handle success
      fetchCarList();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message); // Handle error
    }
  };

  return (
    <button
      onClick={handleRequest}
      className="bg-white text-xs font-semibold text-black p-1"
    >
      Approve
    </button>
  );
}
