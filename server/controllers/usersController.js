import User from "../database/userModel.js";
import { validationResult } from "express-validator";
import bcryptjs from "bcryptjs";

class UsersController {
  async getUser(req, res) {
    try {
      const { name, email, roleName } = req.selectedUser;
      if (req.user.role == 2) {
        return res.status(200).json(req.selectedUser);
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
      await User.destroy({ where: { id: user.id } });
      return res.status(200).json({ message: "User has been deleted" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Delete users error" });
    }
  }

  async updateUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Sign in error", errors });
      }
      const { name, email } = req.body;
      if (req.selectedUser.email === email) {
        return res.status(400).json({ message: "Email must be different" });
      }
      await req.selectedUser.update({
        name: name,
        email: email,
      });
      return res.status(200).json({ message: "Update has been done" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Update user error" });
    }
  }
  async updatePassword(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Sign in error", errors });
      }

      const { oldPassword, newPassword } = req.body;
      if (!bcryptjs.compareSync(oldPassword, req.selectedUser.password)) {
        return res.status(400).json({ message: "Old password isn't same" });
      }
      if (bcryptjs.compareSync(newPassword, req.selectedUser.password)) {
        return res
          .status(400)
          .json({ message: "New password must be different with old" });
      }
      const hashPassword = bcryptjs.hashSync(newPassword, 7);
      await req.selectedUser.update({
        password: hashPassword,
      });
      return res.status(200).json({ message: "Update has been done" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Update user error" });
    }
  }
}

export default new UsersController();
