import approveReqData from "../db/approveReq.js";

const approveReqService = async (data) => {
  return await approveReqData(data);
};

export default approveReqService;
