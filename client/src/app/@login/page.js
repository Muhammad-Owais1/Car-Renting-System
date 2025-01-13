"use client";
import { useActionState, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function page() {
  const [message, setMessage] = useState("");
  const { userInfo, setUserInfo } = useAuth();

  const [error, submitAction, isPending] = useActionState(
    async (prevState, formData) => {
      try {
        const response = await axios.post(
          "http://localhost:9999/api/auth/signin",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(response.data);
        setUserInfo(response.data.user);
        setMessage(response.data.message);
      } catch (err) {
        console.log(err?.response?.data);
        setMessage(err.response?.data?.message || "An error occurred.");
      }
    }
  );

  return (
    <>
      <div className="h-full w-screen flex justify-center items-center">
        <form
          className="mt-16 flex flex-col items-center gap-10"
          action={submitAction}
        >
          <h1 className="font-bold text-xl">Login</h1>
          <input
            type="email"
            placeholder="Email"
            className="border-[1px] border-white bg-black p-2 text-sm text-white"
            name="email"
          />
          <input
            type="password"
            placeholder="Password"
            className="border-[1px] border-white bg-black p-2 text-sm text-white"
            name="password"
          />
          <button
            className="bg-white text-black font-semibold text-xs rounded-sm py-2 px-4"
            onClick={() => setMessage("")}
          >
            {isPending ? "loading..." : "Login"}
          </button>
          {message && <p className="text-white text-xs">{message}</p>}
        </form>
      </div>
    </>
  );
}
