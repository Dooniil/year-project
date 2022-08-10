import jwt from "jsonwebtoken";
import key from "../config.js";

export default (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({ message: "Users hasn't authorizated" });
    }
    token = token.split(" ")[1];
    const { id: userId } = jwt.verify(token, key.secret);
    req.userId = userId;
    next();
  } catch (e) {
    console.log(e);
  }
};
