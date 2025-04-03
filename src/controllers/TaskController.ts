import type { Request, Response } from "express";
import Task from "../models/Task.model";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      // Creamos la tarea y la guardamos en la DataBase.
      const task = new Task(req.body);
      // Añadimos el projecto padre al que pertenece la tarea.
      task.project = req.project.id;
      // Añadimos la tarea al padre.
      req.project.tasks.push(task.id);
      // Guardamos los cambios en ambos al mismo tiempo.
      await Promise.allSettled([task.save(), req.project.save()]);
      res.send("La tarea a sido creada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      // Sabiendo que cada tarea refiere a un projectId, traemos todo donde projectId exista.
      const tasks = await Task.find({ project: req.project.id });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
  static getTaskById = async (req: Request, res: Response) => {};
  static updateTask = async (req: Request, res: Response) => {};
  static deleteTask = async (req: Request, res: Response) => {};
}
