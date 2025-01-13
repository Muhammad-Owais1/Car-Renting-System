"use client";

import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9999/api/auth/getinfo",
          {
            withCredentials: true,
          }
        );

        console.log(response.data);
        setUserInfo(response.data.user);
      } catch (err) {
        console.log(err?.response?.data);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
