const logoutController = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export default logoutController;
