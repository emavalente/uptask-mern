import express from "express";
import { dbConnection } from "./config/db";
import projectRoutes from "./routes/projectRoutes";

process.loadEnvFile("./.env");

dbConnection();

const server = express();

// Habilitar Rutas
server.use("/api/projects", projectRoutes);

export default server;
