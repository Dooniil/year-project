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
    async signIn(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Sign in error", errors });
            }
            const { email, password } = req.body;
            const candidate = await User.findOne({
                where: { email: email },
            });
            if (!candidate) {
                return res.status(400).json({ message: "User isn't in DB" });
            }

            const hashPassword = await candidate.getDataValue("password");
            if (!bcryptjs.compareSync(password, hashPassword)) {
                return res
                    .status(400)
                    .json({ message: `Incorrect password for ${email}` });
            }
            const candidateId = await candidate.getDataValue("id");
            const candidateRole = await candidate.getDataValue("role");

            const token = generateAccessToken(candidateId, candidateRole);
            return res
                .status(200)
                .json({ message: "Logged", data: req.body, token: token });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: "Sign in error" });
        }
    }

    async signUp(req, res) {
        try {
            const { name, email, password, role } = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Sign up error", errors });
            }
            // CHECK FOR CLONE
            const candidate = await User.findOne({
                where: { email: email },
            });
            if (candidate) {
                return res.status(400).json({ message: "User has created already" });
            }
            // ADD TO DATABASE
            const hashPassword = bcryptjs.hashSync(password, 7);
            await User.create({
                name: name,
                email: email,
                password: hashPassword,
                roleId: role,
            });
            return res.status(200).json({ message: "Registered" });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: "Sign up error" });
        }
    }
}

export default new authController();
