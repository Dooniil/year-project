import express from "express";
import controller from "../controllers/authController.js";
import { check } from "express-validator";

const router: express.Router = express.Router();

router.post(
  "/signin",
  [check(["email", "password"], "Fields cannot be empty").notEmpty()],
  controller.signIn
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
  controller.signUp
);
router.get("/user:id", controller.getUser);
router.get("/users", controller.getUsersAdmin);

export default router;
