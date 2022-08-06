import express from "express";
import bcryptjs from "bcryptjs";
import Model from "sequelize/types/model.js";
import User from "../database/userModel.js";
import jwt from "jsonwebtoken";
import key from "../config.js";
import { validationResult } from "express-validator";

const generateAccessToken = (id: number, role: number) => {
  const payload = {
    id,
    role,
  };
  return jwt.sign(payload, key.secret, { expiresIn: "24h" });
};

class authController {
  public async signIn(
    req: express.Request,
    res: express.Response
  ): Promise<object> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Sign in error", errors });
      }
      const { email, password }: { email: string; password: string } = req.body;
      const candidate: Model = await User.findOne({
        where: { email: email },
      });
      if (!candidate) {
        return res.status(400).json({ message: "User isn't in DB" });
      }

      const hashPassword: string = await candidate.getDataValue("password");
      if (!bcryptjs.compareSync(password, hashPassword)) {
        return res
          .status(400)
          .json({ message: `Incorrect password for ${email}` });
      }
      const candidateId: number = await candidate.getDataValue("id");
      const candidateRole: number = await candidate.getDataValue("role");

      const token: string = generateAccessToken(candidateId, candidateRole);
      return res
        .status(200)
        .json({ message: "Logged", data: req.body, token: token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Sign in error" });
    }
  }

  public async signUp(
    req: express.Request,
    res: express.Response
  ): Promise<object> {
    try {
      const {
        name,
        email,
        password,
        role,
      }: { name: string; email: string; password: string; role: number } =
        req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Sign up error", errors });
      }
      // CHECK FOR CLONE
      const candidate: Model = await User.findOne({
        where: { email: email },
      });
      if (candidate) {
        return res.status(400).json({ message: "User has created already" });
      }
      // ADD TO DATABASE
      const hashPassword: string = bcryptjs.hashSync(password, 7);
      await User.create({
        name: name,
        email: email,
        password: hashPassword,
        roleId: role,
      });
      return res.status(200).json({ message: "Registered" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Sign up error" });
    }
  }

  public async getUser(req: express.Request, res: express.Response) {
    try {
      res.status(200);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Get users error" });
    }
  }

  public async getUsersAdmin(req: express.Request, res: express.Response) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Get users error" });
    }
  }
}

export default new authController();
