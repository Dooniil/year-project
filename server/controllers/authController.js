var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcryptjs from "bcryptjs";
import User from "../database/userModel.js";
import jwt from "jsonwebtoken";
import key from "../config.js";
import { validationResult } from "express-validator";
const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role,
    };
    return jwt.sign(payload, key.secret, { expiresIn: "24h" });
};
class authController {
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ message: "Sign in error", errors });
                }
                const { email, password } = req.body;
                const candidate = yield User.findOne({
                    where: { email: email },
                });
                if (!candidate) {
                    return res.status(400).json({ message: "User isn't in DB" });
                }
                const hashPassword = yield candidate.getDataValue("password");
                if (!bcryptjs.compareSync(password, hashPassword)) {
                    return res
                        .status(400)
                        .json({ message: `Incorrect password for ${email}` });
                }
                const candidateId = yield candidate.getDataValue("id");
                const candidateRole = yield candidate.getDataValue("role");
                const token = generateAccessToken(candidateId, candidateRole);
                return res
                    .status(200)
                    .json({ message: "Logged", data: req.body, token: token });
            }
            catch (e) {
                console.log(e);
                res.status(400).json({ message: "Sign in error" });
            }
        });
    }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, role, } = req.body;
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ message: "Sign up error", errors });
                }
                const candidate = yield User.findOne({
                    where: { email: email },
                });
                if (candidate) {
                    return res.status(400).json({ message: "User has created already" });
                }
                const hashPassword = bcryptjs.hashSync(password, 7);
                yield User.create({
                    name: name,
                    email: email,
                    password: hashPassword,
                    roleId: role,
                });
                return res.status(200).json({ message: "Registered" });
            }
            catch (e) {
                console.log(e);
                res.status(400).json({ message: "Sign up error" });
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200);
            }
            catch (e) {
                console.log(e);
                res.status(400).json({ message: "Get users error" });
            }
        });
    }
    getUsersAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User.findAll();
                res.status(200).json(users);
            }
            catch (e) {
                console.log(e);
                res.status(400).json({ message: "Get users error" });
            }
        });
    }
}
export default new authController();
