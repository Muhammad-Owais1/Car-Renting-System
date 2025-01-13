import Model from "../models/index.js";

const approveReqData = async (data) => {
  try {
    const response = await Model.findByIdAndUpdate(data, {
      isApproved: true,
    });
    return response;
  } catch (err) {}
};

export default approveReqData;
