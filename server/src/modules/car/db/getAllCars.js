import Model from "../models/index.js";

const getAllCarsData = async () => {
  try {
    const allCars = await Model.find();
    return allCars;
  } catch (err) {
    console.log(err);
  }
};

export default getAllCarsData;
