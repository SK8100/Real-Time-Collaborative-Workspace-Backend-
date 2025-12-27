import { Router } from "express";
import {
  fetchUserData,
  uploadImage,
} from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/me", authMiddleware, fetchUserData);
router.post("/upload", authMiddleware, uploadImage);

export default router;