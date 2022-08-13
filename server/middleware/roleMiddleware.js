import jwt from "jsonwebtoken";
import key from "../config.js";

export default (roles) => {
  return (req, res, next) => {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const { role: userRole } = req.user;
      if (roles.includes(userRole)) {
        next();
      } else {
        return res.status(403).json({ message: "Users doesn't have access" });
      }
    } catch (e) {
      console.log(e);
    }
  };
};
