import { DataTypes } from "sequelize";
import sequelize from "./connect.js";
import Role from "./roleModel.js";

const roleNames = {
  0: "Student",
  1: "Teacher",
  2: "Admin",
};

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: "id",
    },
  },
  roleName: {
    type: DataTypes.VIRTUAL,
    get() {
      return roleNames[this.roleId];
    },
  },
});
User.hasOne(Role);
export default User;
