import type { Request, Response } from "express";
import { ProjectType } from "../models/Project.model";
import Project from "../models/Project.model";

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    // Creamos un nuevo documento a partir del modelo y los datos en la petición.
    const project = new Project(req.body);

    try {
      // Guardamos el registro en la base de datos.
      await project.save();
      res.send("El proyecto a sido creado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({});
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id).populate("tasks");

      if (!project) {
        const error = new Error("Proyecto no encontrado");
        res.status(404).json({ error: error.message });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static updateProject = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const project = await Project.findByIdAndUpdate(id, req.body);
      if (!project) {
        const error = new Error("Proyecto no encontrado");
        res.status(404).json({ error: error.message });
      }
      await project.save();
      res.send("El proyecto a sido actualizado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const project = await Project.findByIdAndDelete(id);
      if (!project) {
        const error = new Error("Proyecto no encontrado");
        res.status(404).json({ error: error.message });
      }
      res.send("El proyecto a sido borrado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
