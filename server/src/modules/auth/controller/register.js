import registerUser from "../services/register.js";

const registerController = async (req, res) => {
  try {
    const user = await registerUser(req.body, res);
    res.status(201).send({
      req: req.body,
      status: 201,
      message: "User Created.",
      user,
    });
  } catch (err) {
    console.log(err);
    if (err.code == 11000) {
      res.status(409).send({
        req: req.body,
        status: 409,
        message: "Email already exists.",
      });
    } else {
      res.status(500).send({
        req: req.body,
        status: 500,
        message: "User not created.",
      });
    }
  }
};

export default registerController;
