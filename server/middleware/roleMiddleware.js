import jwt from "jsonwebtoken";
import key from "../config.js";

export default (roles) => {
  return (req, res, next) => {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      let token = req.headers.authorization;
      if (!token) {
        return res.status(403).json({ message: "Users hasn't authorizated" });
      }
      token = token.split(" ")[1];
      const { role: userRole } = jwt.verify(token, key.secret);
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
