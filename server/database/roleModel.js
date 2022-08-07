import { DataTypes } from "sequelize";
import sequelize from "./connect.js";

const Role = sequelize.define(
  "roles",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);
export default Role;
