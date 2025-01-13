import matchUserData from "../db/login.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const loginUser = async (data, res) => {
  try {
    const user = await matchUserData(data);

    const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);

    if (isPasswordCorrect) {
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      return {
        user,
      };
    } else {
      throw new Error("Wronge email or password.");
    }
  } catch (err) {
    throw err;
  }
};

export default loginUser;
