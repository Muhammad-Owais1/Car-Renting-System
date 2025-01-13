"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import RequestBtn from "./RequestBtn";

export default function Car() {
  const { userInfo } = useAuth();
  const [data, setData] = useState(null);

  const fetchCarList = async () => {
    try {
      const response = await axios.get(
        "https://car-renting-system-api.vercel.app/api/car/getallcars",
        {
          withCredentials: true,
        }
      );

      const data = response.data;
      console.log(data);
      setData(data);
    } catch (err) {
      console.log("Error fetching car list:", err);
    }
  };

  useEffect(() => {
    fetchCarList();
  }, [userInfo]);

  return (
    <>
      <div className="flex flex-col-reverse gap-4 page overflow-scroll py-10">
        {data
          ?.filter((item) => !item.isApproved) // Exclude items where isApproved is true
          .map((item, index) => (
            <div
              className="text-white bg-slate-800 p-2 w-80 flex justify-between items-center"
              key={index}
            >
              <div>
                <h1 className="text-xl font-semibold">Car: {item.car}</h1>
                <p className="text-xs font-semibold">Rent: {item.rent} PKR</p>
              </div>
              {item.isRequested ? (
                <p className="text-white">Requested</p>
              ) : (
                <RequestBtn fetchCarList={fetchCarList} carID={item._id} />
              )}
            </div>
          ))}
      </div>
    </>
  );
}
