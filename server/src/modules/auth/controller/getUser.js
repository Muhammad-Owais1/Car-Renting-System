import getUser from "../services/getUser.js";

const getUserController = async (req, res) => {
  try {
    const user = await getUser(req.user);

    res.status(200).send({
      user,
    });
  } catch (err) {
    res
      .status(500)
      .send({ error: "An error occurred while fetching user details" });
  }
};

export default getUserController;
