"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import ApproveBtn from "./ApproveBtn";

export default function Car() {
  const { userInfo } = useAuth();
  const [data, setData] = useState(null);

  const fetchCarList = async () => {
    try {
      const response = await axios.get(
        "https://car-renting-system-api.vercel.app/api/car/getcar",
        {
          withCredentials: true,
          params: {
            id: userInfo._id, // Pass the user ID as a query parameter
          },
        }
      );

      // Axios response is already parsed as JSON, so no need for response.json()
      const data = response.data;
      console.log(data);
      setData(data);
    } catch (err) {
      console.log("Error fetching car list:", err);
    }
  };

  useEffect(() => {
    fetchCarList();
  }, [userInfo]); // Add userInfo as dependency to refetch if it changes

  return (
    <>
      <div className="flex flex-col-reverse gap-4 h-[55vh] overflow-scroll py-10">
        {data
          ?.filter((item) => item.isRequested) // Filter items where isRequested is true
          .map((item, index) => (
            <div
              className="text-white bg-slate-800 p-2 w-80 flex items-center justify-between"
              key={index}
            >
              <div>
                <h1 className="text-xl font-semibold">Car: {item.car}</h1>
                <p className="text-xs font-semibold">Rent: {item.rent} PKR</p>
              </div>
              <div>
                <p className="text-xs font-semibold">
                  Requested by {item.reqUsername}{" "}
                </p>
                <p className="text-xs font-semibold">{item.reqEmail}</p>
              </div>
              {item.isApproved ? (
                <p>Approved</p>
              ) : (
                <ApproveBtn carID={item._id} fetchCarList={fetchCarList} />
              )}
            </div>
          ))}
      </div>
    </>
  );
}
