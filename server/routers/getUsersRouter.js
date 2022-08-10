import getUsersController from "../controllers/getUsersController.js";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = Router();

//  ! roleMiddleware(role):
//  ! role = 0 - Student
//  ! role = 1 - Teacher
//  ! role = 2 - Admin

router.get("/:id", authMiddleware, getUsersController.getUser);
router.get("/", roleMiddleware(2), getUsersController.getUsersAdmin);

export default router;
