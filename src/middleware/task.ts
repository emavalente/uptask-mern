import { Request, Response, NextFunction } from "express";
import Task, { ITask } from "../models/Task.model";

// Mediante Typescript reescribimos el scope global para permitirle a Request recibir propiedades agenas.
declare global {
  namespace Express {
    interface Request {
      task: ITask;
    }
  }
}
export const TaskExist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Tomamos el id del proyecto en la url y verificamos que exista.
    const { taskId } = req.params;
    const task = await Task.findById(taskId);

    if (!task) {
      const error = new Error("El id de la tarea no es válida");
      res.status(404).json({ error: error.message });
      return;
    }

    // Añadimos una propiedad agena al Request para pasar la tarea.
    // Necesitamos hacer esto para que el middleware siguiente pueda capturar este valor también.
    req.task = task;
    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const TaskBelongsToProject = async (req: Request, res: Response, next: NextFunction) => {
  // Verifico que el proyecto al que pertenece la tarea sea el mismo que viene por URL.
  // Sin verificarlo la tarea se obtiene de igual forma y no es lo requerido. tener en cuenta que task.project contiene un ObjectId.
  // Para transformar ObjectId usar toString().
  if (req.task.project.toString() !== req.project.id.toString()) {
    const error = new Error("Acción no permitida");
    res.status(400).json({ error: error.message });
    return;
  }
  next();
};
