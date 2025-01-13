import Model from "../models/index.js";

const getCarData = async (data) => {
  try {
    const carData = await Model.find({ addedBy: data });
    return carData;
  } catch (err) {
    console.log(err);
  }
};

export default getCarData;
