import { Router } from "express";
import authController from "../controllers/authController.js";
import { check } from "express-validator";

const router = Router();

router.post(
  "/signin",
  [check(["email", "password"], "Fields cannot be empty").notEmpty()],
  authController.signIn
);
router.post(
  "/signup",
  [
    check(
      ["email", "password", "name", "role"],
      "Fields cannot be empty"
    ).notEmpty(),
    check(["password"], "Too short password").isLength({ min: 6 }),
    check(["email"], "Incorrect e-mail").isEmail(),
  ],
  authController.signUp
);
export default router;
