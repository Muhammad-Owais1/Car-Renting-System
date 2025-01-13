import Model from "../models/index.js";
// import UserModel from "../../auth/models/index.js";

const addCarData = async (data) => {
  try {
    // const user = await UserModel.findOne({ email: data.email });
    // console.log(user);
    console.log(data);
    await Model(data).save();
    return await Model.findOne({ car: data.car });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default addCarData;
