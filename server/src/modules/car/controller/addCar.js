import carAddService from "../services/addCar.js";

const carAddController = async (req, res) => {
  try {
    // Assume `req.user` contains the authenticated user's information
    console.log(req.body);
    const carData = {
      ...req.body, // Spread other car data from the request body
    };

    console.log(carData);

    const car = await carAddService(carData); // Pass the complete car data to the service
    res.status(201).send(car); // Return the created car with a success status code
  } catch (err) {
    console.error("Error adding car:", err);
    res.status(500).send({ error: "Failed to add car data" });
  }
};

export default carAddController;
