import getUsersController from "../controllers/getUsersController.js";
import {Router} from "express";

const router = Router();

// router.get("/:id", controller.getUser);
router.get("/", getUsersController.getUsersAdmin);

export default router;
