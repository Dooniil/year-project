import User from "../database/userModel.js";
import roleTools from "../tools/roleTools.js";

class UsersController {
  async getUser(req, res) {
    try {
      const user = await User.findOne({ where: { id: req.params.id } });
      if (!user) {
        return res.status(400).json({ message: "Non - existent user" });
      }
      const { id, name, email, password, roleId, createdAt, updatedAt } = user;
      const roleName = roleTools.roleNames[roleId];

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

  async deleteUser(req, res) {
    try {
      const user = await User.findOne({ where: { id: req.params.id } });
      if (!user) {
        return res.status(400).json({ message: "Non - existent user" });
      }

      if (!roleTools.checkRoleAdmin(req.user.role)) {
        if (req.user.id != req.params.id) {
          return res.status(400).json({ message: "Access denied" });
        }
      }

      const { id, roleId } = user;
      if (roleId == 2 && req.user.id != id) {
        return res.status(400).json({ message: "Access denied" });
      }
      await User.destroy({ where: { id: id } });
      return res.status(200).json({ message: "User has been deleted" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Delete users error" });
    }
  }
}

export default new UsersController();
