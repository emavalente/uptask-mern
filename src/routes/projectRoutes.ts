import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectControllers";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.post(
  "/",
  body("projectName").notEmpty().withMessage("El nombre del proyecto es obligatorio"),
  body("clientName").notEmpty().withMessage("El nombre del cliente es obligatorio"),
  body("description").notEmpty().withMessage("La descripción del proyecto es obligatoria"),
  handleInputErrors,
  ProjectController.createProject
);

router.get("/", ProjectController.getAllProjects);

router.get("/:id", param("id").isMongoId().withMessage("El id no es válido"), handleInputErrors, ProjectController.getProjectById);

router.put(
  "/:id",
  param("id").isMongoId().withMessage("El id no es válido"),
  body("projectName").notEmpty().withMessage("El nombre del proyecto es obligatorio"),
  body("clientName").notEmpty().withMessage("El nombre del cliente es obligatorio"),
  body("description").notEmpty().withMessage("La descripción del proyecto es obligatoria"),
  handleInputErrors,
  ProjectController.updateProject
);

router.delete("/:id", param("id").isMongoId().withMessage("El id no es válido"), handleInputErrors, ProjectController.deleteProject);

export default router;
