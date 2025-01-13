import Model from "../models/index.js";

const deleteCarData = async (data) => {
  try {
    const deletedCar = await Model.findByIdAndDelete(data.carID);
    return deletedCar;
  } catch (err) {
    console.log(err);
  }
};

export default deleteCarData;
