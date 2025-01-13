import Model from "../models/index.js";

const matchUserData = async (data) => {
  try {
    const user = await Model.findOne({ email: data.email });
    if (!user) {
      throw new Error("Wronge email or password.");
    } else {
      return user;
    }
  } catch (err) {
    throw err;
  }
};

export default matchUserData;
