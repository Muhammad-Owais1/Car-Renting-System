import requestCarService from "../services/requestCar.js";

const requestCarController = async (req, res) => {
  const updatedCar = await requestCarService(
    req.body.carID,
    req.body.username,
    req.body.email
  );
  res.send(updatedCar);
};
export default requestCarController;
