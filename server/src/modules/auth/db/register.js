import Model from "../models/index.js";

const addUserData = async (data) => {
  try {
    await Model(data).save();
    return await Model.findOne({ email: data.email });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default addUserData;
