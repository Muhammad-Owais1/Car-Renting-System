import requestCarUpdate from "../db/requestCar.js";

const requestCarService = async (carID, username, email) => {
  return await requestCarUpdate(carID, username, email);
};

export default requestCarService;
