import type { Request, Response, NextFunction } from "express";
import Project, { ProjectType } from "../models/Project.model";

// Mediante Typescript reescribimos el scope global para permitirle a Request recibir propiedades agenas.
declare global {
  namespace Express {
    interface Request {
      project: ProjectType;
    }
  }
}

// Revisa si un proyecto pasado por URL existe o no.
export const ProjectExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Tomamos el id del proyecto en la url y verificamos que exista.
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
      const error = new Error("El id del projecto no es válido");
      res.status(404).json({ error: error.message });
      return;
    }

    // Añadimos una propiedad agena al Request para pasar el proyecto.
    // Necesitamos hacer esto para que el middleware siguiente pueda capturar este valor también.
    req.project = project;
    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};
