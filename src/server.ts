import express from "express";
import { dbConnection } from "./config/db";
import projectRoutes from "./routes/projectRoutes";

// Nueva forma de habilitar las variables de entorno de forma nativa
process.loadEnvFile("./.env");

// Ejecutar conección a la base de datos
dbConnection();

// Instanciar express y habilitar la lectura json en POST/PUT
const server = express();
server.use(express.json());

// Habilitar Rutas utilizando un prefijo custom.
server.use("/api/projects", projectRoutes);

export default server;
