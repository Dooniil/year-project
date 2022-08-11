import usersController from "../controllers/usersController.js";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = Router();

//  ! roleMiddleware(role):
//  ! role = 0 - Student
//  ! role = 1 - Teacher
//  ! role = 2 - Admin

router.get("/:id", authMiddleware, usersController.getUser);
router.get("/", roleMiddleware([2]), usersController.getUsersAdmin);
router.delete("/:id", authMiddleware, usersController.deleteUser);

export default router;
