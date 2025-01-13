import getAllCarsData from "../db/getAllCars.js";

const getAllCarsService = async () => {
  return await getAllCarsData();
};

export default getAllCarsService;
