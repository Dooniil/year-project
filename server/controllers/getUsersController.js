import User from "../database/userModel.js";

const checkRoleAdmin = (role) => {
  if (role == 2) {
    return true;
  } else {
    return false;
  }
};

const showRoleName = (role) => {
  switch (role) {
    case 0:
      return "Student";
      break;
    case 1:
      return "Teacher";
      break;
    case 2:
      return "Admin";
      break;
  }
};

class getUsersController {
  async getUser(req, res) {
    try {
      const { id, name, email, password, roleId, createdAt, updatedAt } =
        await User.findOne({ where: { id: req.params.id } });
      const roleName = showRoleName(roleId);
      if (!id) {
        return res.status(400).json({ message: "Non - existent user" });
      }

      if (checkRoleAdmin(req.user.role)) {
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
