"use client";
import { useActionState, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import Car from "@/components/Car";
import AllCars from "@/components/AllCars";
import RequestedCars from "@/components/RequestedCars";

export default function page() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const { userInfo } = useAuth();

  const [error, submitAction, isPending] = useActionState(
    async (prevState, formData) => {
      try {
        const dataToSend = {
          ...Object.fromEntries(formData),
          addedBy: userInfo?._id || "",
        };

        const response = await axios.post(
          "https://car-renting-system-api.vercel.app/api/car/addcar",
          dataToSend,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        console.log(response);
        setMessage(response.data.message);
        setResponse(response.data);
      } catch (err) {
        console.log(err?.response?.data);
        setMessage(err.response?.data?.message || "An error occurred.");
      }
    }
  );

  return (
    <>
      <div className="h-full w-screen flex justify-between items-start page overflow-hidden">
        <div className="h-full flex flex-col justify-center gap-4">
          <form
            className="flex flex-col items-center gap-10"
            action={submitAction}
          >
            <h1 className="font-bold text-xl">Add Car</h1>
            <input
              type="text"
              placeholder="Car"
              className="border-[1px] border-white bg-black p-2 text-sm text-white"
              name="car"
            />
            <input
              type="text"
              placeholder="Rent"
              className="border-[1px] border-white bg-black p-2 text-sm text-white"
              name="rent"
            />
            <button
              className="bg-white text-black font-semibold text-xs rounded-sm py-2 px-4"
              onClick={() => {
                setMessage("");
                window.location.reload();
              }}
            >
              {isPending ? "loading..." : "Add Car"}
            </button>
            {message && <p className="text-white text-xs">{message}</p>}
          </form>
          <RequestedCars />
        </div>
        <div>
          <h1 className="text-white">Your Cars</h1>
          <Car />
        </div>
        <div>
          <h1 className="text-white">All Cars</h1>
          <AllCars />
        </div>
      </div>
    </>
  );
}
