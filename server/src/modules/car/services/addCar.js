import addCarData from "../db/addCar.js";

const carAddService = async (data) => {
  return await addCarData(data);
};

export default carAddService;
