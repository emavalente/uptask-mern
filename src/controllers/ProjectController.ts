import type { Request, Response } from "express";
import Project from "../models/Project.model";

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    try {
      // Creamos un nuevo documento a partir del modelo y los datos en la petición.
      const project = new Project(req.body);

      if (!project) {
        throw new Error("Proyecto no creado: Error en el servidor intentelo más tarde");
      }

      // Guardamos el registro en la base de datos.
      await project.save();
      res.send("Proyecto creado correctamente");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({});
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Error con el servidor" });
    }
  };

  static getProjectById = async (req: Request, res: Response) => {
    try {
      // No puedo utilizar req.project porque no es un documento directo de Mongo y asi no funcionaría populate.
      const project = await Project.findById(req.params.projectId).populate("tasks");

      if (!project) {
        const error = new Error("Projecto no encontrado");
        res.status(404).json({ error: error.message });
        return;
      }

      req.project = project;

      res.json(req.project);
    } catch (error) {
      res.status(500).json({ error: "Error con el servidor" });
    }
  };

  static updateProject = async (req: Request, res: Response) => {
    try {
      req.project.projectName = req.body.projectName;
      req.project.clientName = req.body.clientName;
      req.project.description = req.body.description;

      await req.project.save();

      res.send("Proyecto actualizado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Error con el servidor" });
    }
  };

  static deleteProject = async (req: Request, res: Response) => {
    try {
      await req.project.deleteOne();
      res.send("Proyecto eliminado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Error con el servidor" });
    }
  };
}
