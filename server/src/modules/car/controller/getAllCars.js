import getAllCarsService from "../services/getAllCars.js";

const getAllCarsController = async (req, res) => {
  try {
    const allCars = await getAllCarsService();
    res.send(allCars);
  } catch (err) {}
};
export default getAllCarsController;
