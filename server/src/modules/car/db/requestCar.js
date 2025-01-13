import Model from "../models/index.js";

const requestCarUpdate = async (carId, username, email) => {
  const updatedCar = await Model.findByIdAndUpdate(carId, {
    isRequested: true,
    reqUsername: username,
    reqEmail: email,
  });
  return updatedCar;
};

export default requestCarUpdate;
