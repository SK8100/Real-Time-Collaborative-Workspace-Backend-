import { Router } from "express";
import {
  createProject,
  getProjects,
  inviteMember,
} from "./project.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { projectRbac } from "../../middlewares/projectRbac.middleware";

const router = Router();

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getProjects);
router.post(
  "/:id/invite",
  authMiddleware,
  projectRbac(["OWNER"]),
  inviteMember
);

export default router;
