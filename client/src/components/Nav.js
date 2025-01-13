"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Nav({ haveAccount, setHaveAccount }) {
  const { userInfo, setUserInfo } = useAuth();

  const logout = async () => {
    try {
      const response = await axios.post(
        "https://car-renting-system-api.vercel.app/api/auth/logout",
        {},
        { withCredentials: true }
      );

      console.log(response.data.message);

      setUserInfo(null);
    } catch (err) {
      console.error("Logout failed:", err?.response?.data);
    }
  };

  return (
    <>
      <div className="w-full h-20 bg-slate-900 flex justify-between items-center px-4">
        <h1 className="text-xl font-bold text-white">RENTACAR</h1>
        {!userInfo ? (
          <div>
            <button
              className="bg-white text-black font-semibold text-xs rounded-sm py-2 px-4"
              onClick={() => setHaveAccount(false)}
            >
              Signup
            </button>
            <button
              onClick={() => setHaveAccount(true)}
              className="ml-4 bg-white text-black font-semibold text-xs rounded-sm py-2 px-4"
            >
              Login
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <div>
              <p className="font-semibold uppercase text-white">
                {userInfo.username}
              </p>
              <p className="font-semibold text-xs text-slate-400 lowercase">
                {userInfo.email}
              </p>
            </div>
            <button
              className="bg-white text-black font-semibold text-xs rounded-sm py-2 px-4"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
