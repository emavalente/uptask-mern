import type { Request, Response } from "express";
import Task from "../models/Task.model";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      // Creamos la tarea y la guardamos en la DataBase.
      const task = new Task(req.body);
      // Añadimos el projecto padre al que pertenece la tarea.
      task.project = req.project.id;
      // Añadimos la tarea al array del proyecto padre.
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
      // Sabiendo que cada tarea refiere a un projectId, traemos todas donde projectId exista.
      const tasks = await Task.find({ project: req.project.id }).populate("project");
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getTaskById = async (req: Request, res: Response) => {
    try {
      // Retorno la tarea encontrada que esta viniendo en la request.
      res.json(req.task);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static updateTask = async (req: Request, res: Response) => {
    try {
      req.task.name = req.body.name;
      req.task.description = req.body.description;
      await req.task.save();

      res.send("Tarea actualizada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static deleteTask = async (req: Request, res: Response) => {
    try {
      // Filtro y borro la referencia a esa tarea dentro del projecto.
      req.project.tasks = req.project.tasks.filter((task) => task.toString() !== req.task.id.toString());

      await Promise.allSettled([req.task.deleteOne(), req.project.save()]);
      res.send("Tarea eliminada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static updateTaskStatus = async (req: Request, res: Response) => {
    try {
      // Capturo el status en la petición y lo asigno a la tarea.
      const { status } = req.body;

      req.task.status = status;

      await req.task.save();

      res.send("Tarea actualizada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
