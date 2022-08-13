import usersController from "../controllers/usersController.js";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import idMiddleware from "../middleware/idMiddleware.js";
import existenceMiddleware from "../middleware/existenceMiddleware.js";
import { check } from "express-validator";

const router = Router();

//  ! roleMiddleware(role):
//  ! role = 0 - Student
//  ! role = 1 - Teacher
//  ! role = 2 - Admin

router.get(
  "/:id",
  authMiddleware,
  existenceMiddleware,
  usersController.getUser
);
router.get(
  "/",
  authMiddleware,
  roleMiddleware([2]),
  usersController.getUsersAdmin
);
router.delete(
  "/:id",
  authMiddleware,
  existenceMiddleware,
  idMiddleware,
  usersController.deleteUser
);
router.put(
  "/:id/update-info",
  [
    check(["email", "name"], "Fields cannot be empty").notEmpty(),
    check(["email"], "Incorrect e-mail").isEmail(),
  ],
  authMiddleware,
  existenceMiddleware,
  idMiddleware,
  usersController.updateUser
);
router.put(
  "/:id/update-password",
  [
    check(["oldPassword", "newPassword"], "Fields cannot be empty").notEmpty(),
    check(["newPassword"], "Too short password").isLength({ min: 6 }),
  ],
  authMiddleware,
  existenceMiddleware,
  idMiddleware,
  usersController.updatePassword
);

export default router;
