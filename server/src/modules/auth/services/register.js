import addUserData from "../db/register.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const registerUser = async (data, res) => {
  const password = bcrypt.hashSync(data.password, 10);
  data.password = password;
  console.log(data.email);
  const token = jwt.sign({ email: data.email }, process.env.JWT_SECRET);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return await addUserData(data);
};

export default registerUser;
