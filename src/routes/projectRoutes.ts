import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { ProjectExists } from "../middleware/project";
import { TaskBelongsToProject, TaskExist } from "../middleware/task";

const router = Router();

// Routas para project, con validación de Express Validator y Middlewares :
router.post(
  "/",
  body("projectName").notEmpty().withMessage("El nombre del proyecto es obligatorio"),
  body("clientName").notEmpty().withMessage("El nombre del cliente es obligatorio"),
  body("description").notEmpty().withMessage("La descripción del proyecto es obligatoria"),
  handleInputErrors,
  ProjectController.createProject
);

router.get("/", ProjectController.getAllProjects);

router.param("projectId", ProjectExists);

router.get(
  "/:projectId",
  param("projectId").isMongoId().withMessage("El id no es válido"),
  handleInputErrors,
  ProjectController.getProjectById
);

router.put(
  "/:projectId",
  param("projectId").isMongoId().withMessage("El id no es válido"),
  body("projectName").notEmpty().withMessage("El nombre del proyecto es obligatorio"),
  body("clientName").notEmpty().withMessage("El nombre del cliente es obligatorio"),
  body("description").notEmpty().withMessage("La descripción del proyecto es obligatoria"),
  handleInputErrors,
  ProjectController.updateProject
);

router.delete(
  "/:projectId",
  param("projectId").isMongoId().withMessage("El id no es válido"),
  handleInputErrors,
  ProjectController.deleteProject
);

// Routas para tasks, con validación de Express Validator y Middlewares :
router.post(
  "/:projectId/tasks",
  body("name").notEmpty().withMessage("El nombre de la tarea es obligatorio"),
  body("description").notEmpty().withMessage("La descripción de la tarea es obligatoria"),
  handleInputErrors,
  TaskController.createTask
);

router.get("/:projectId/tasks", TaskController.getProjectTasks);

router.param("taskId", TaskExist);
router.param("taskId", TaskBelongsToProject);

router.get(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("El id no es válido"),
  handleInputErrors,
  TaskController.getTaskById
);

router.put(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("El id no es válido"),
  body("name").notEmpty().withMessage("El nombre de la tarea es obligatorio"),
  body("description").notEmpty().withMessage("La descripción de la tarea es obligatoria"),
  handleInputErrors,
  TaskController.updateTask
);

router.delete(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("El id no es válido"),
  handleInputErrors,
  TaskController.deleteTask
);

router.post(
  "/:project/tasks/:taskId/status",
  param("taskId").isMongoId().withMessage("El id no es válido"),
  body("status").notEmpty().withMessage("El estado de la tarea es obligatorio"),
  handleInputErrors,
  TaskController.updateTaskStatus
);

export default router;
