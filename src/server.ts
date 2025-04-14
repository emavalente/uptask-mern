import express from "express";
import { dbConnection } from "./config/db";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes";
import { corsConfig } from "./config/cors";

// Nueva forma de habilitar las variables de entorno de forma nativa
process.loadEnvFile("./.env");

// Ejecutar conección a la base de datos
dbConnection();

// Instanciar express y habilitar la lectura json en POST/PUT
const server = express();

// Habilitar CORS
server.use(cors(corsConfig));

server.use(express.json());

// Habilitar Rutas utilizando un prefijo custom.
server.use("/api/projects", projectRoutes);

export default server;
