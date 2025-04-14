import mongoose, { Schema, Document, Types } from "mongoose";
import { ProjectType } from "./Project.model";

// Declaro un Diccionario con los valores de estado de una tarea.
const taskStatus = {
  PENDING: "pending",
  ON_HOLD: "onHold",
  IN_PROGRESS: "inProgress",
  UNDER_REVIEW: "underReview",
  COMPLETED: "completed",
} as const; // usamos "as const" para transformar el objeto en solo lectura.

export type TaskStatus = (typeof taskStatus)[keyof typeof taskStatus];

// Ejemplo con interface para la estructura de una Tarea.
export interface ITask extends Document {
  name: string;
  description: string;
  project: Types.ObjectId; // el tipo de esta propiedad solo la proporciona Monggose.
  status: TaskStatus;
}

// Schema para el modelo de datos de una Tarea.
const TaskSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
    project: {
      type: Types.ObjectId,
      ref: "Project", // El nombre del modelo al que hace referencia.
    },
    status: {
      type: String,
      enum: Object.values(taskStatus), // Restringimos los valores que pueden ser almacenados.
      default: taskStatus.PENDING,
    },
  },
  { timestamps: true }
);

// Creo una instancia del modelo utilizando el Type y el Schema declarado antes.
const Task = mongoose.model<ITask>("Task", TaskSchema);

export default Task;
