import loginUser from "../services/login.js";

const loginController = async (req, res) => {
  try {
    const user = await loginUser(req.body, res);
    res.status(201).send({
      req: req.body,
      status: 200,
      message: "Login sucessfully.",
      user: user.user,
      token: user.token,
    });
  } catch (err) {
    console.log(err);
    res.status(401).send({
      req: req.body,
      status: 401,
      message: err.message,
    });
  }
};

export default loginController;
