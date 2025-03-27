import mongoose, { Document, Schema, PopulatedDoc, Types } from "mongoose";
import { ITask } from "./Task.model";

// Type para la estructura de datos de un Proyecto.
export type ProjectType = Document & {
  projectName: string;
  clientName: string;
  description: string;
  tasks: PopulatedDoc<ITask & Document>[]; // Aseguramos que task se popule con tipos ITask y Document
};

// Schema para el modelo de datos de un Proyecto.
const ProjectSchema: Schema = new Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    tasks: [
      {
        type: Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

// Creo una instancia del modelo utilizando el Type y el Schema declarado antes.
const Project = mongoose.model<ProjectType>("Project", ProjectSchema);

export default Project;
