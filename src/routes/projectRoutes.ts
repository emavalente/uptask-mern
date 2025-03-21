import { Router } from "express";
import { ProjectController } from "../controllers/ProjectControllers";

const router = Router();

router.get("/", ProjectController.getAllProjects);

export default router;
