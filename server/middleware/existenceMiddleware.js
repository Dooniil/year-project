import User from "../database/userModel.js";

export default async (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(400).json({ message: "Non - existent user" });
    }
    req.selectedUser = user;
    next();
  } catch (e) {
    console.log(e);
  }
};
