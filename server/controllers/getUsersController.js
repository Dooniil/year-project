import User from "../database/userModel.js";

class getUsersController {
  async getUser(req, res) {
    try {
      const desiredUser = await User.findOne({ where: { id: req.params.id } });
      if (!desiredUser) {
        return res.status(400).json({ message: "Non - existent user" });
      }
      return res.status(200).json(desiredUser);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Get users error" });
    }
  }

  async getUsersAdmin(req, res) {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Get users error" });
    }
  }
}

export default new getUsersController();
