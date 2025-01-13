import getUserInfo from "../db/getUser.js";

const getUser = async (data) => {
  return await getUserInfo(data);
};

export default getUser;
