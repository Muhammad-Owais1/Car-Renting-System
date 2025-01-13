import approveReqService from "../services/approveReq.js";

const approveReqController = async (req, res) => {
  try {
    const response = await approveReqService(req.body.carID);
    res.send(response);
  } catch (err) {
    console.log(err);
  }
};
export default approveReqController;
