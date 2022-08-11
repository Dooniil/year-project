import User from "../database/userModel.js";
import roleTools from "../tools/roleTools.js";

class getUsersController {
  async getUser(req, res) {
    try {
      const { id, name, email, password, roleId, createdAt, updatedAt } =
        await User.findOne({ where: { id: req.params.id } });
      const roleName = roleTools.roleNames[roleId];
      if (!id) {
        return res.status(400).json({ message: "Non - existent user" });
      }

      if (roleTools.checkRoleAdmin(req.user.role)) {
        return res
          .status(200)
          .json({ id, name, email, password, roleName, createdAt, updatedAt });
      } else {
        return res.status(200).json({ name, email, roleName });
      }
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
