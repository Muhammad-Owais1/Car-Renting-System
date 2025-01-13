import deleteCarService from "../services/deleteCar.js";

const deleteCarController = async (req, res) => {
  try {
    const deletedCar = await deleteCarService(req.body);
    res.send(deletedCar);
  } catch (err) {
    console.log(err);
  }
};
export default deleteCarController;
