import getCarData from "../db/getCar.js";

const getCarService = async (data) => {
  return await getCarData(data);
};
export default getCarService;
