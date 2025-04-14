import type { Request, Response } from "express";
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
    const { projectId } = req.params;
    try {
      req.project.tasks = await req.project.populate("tasks");
      res.json(req.project);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static updateProject = async (req: Request, res: Response) => {
    try {
      req.project.projectName = req.body.projectName;
      req.project.clientName = req.body.clientName;
      req.project.description = req.body.description;

      await req.project.save();

      res.send("El proyecto a sido actualizado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static deleteProject = async (req: Request, res: Response) => {
    try {
      await req.project.deleteOne();
      res.send("El proyecto a sido borrado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
