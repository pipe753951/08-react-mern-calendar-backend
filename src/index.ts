import path from "node:path";
import express from "express";

import dotenv from "dotenv";
import cors from "cors";

import authRouter from "./routes/auth.router";
import connectDb from "./database/connectDb";
import calendarEventsRouter from "./routes/calendarEvents.router";

// Directorio raíz, utilizado para servir el frontend.
const projectRoot = path.dirname(__dirname);

dotenv.config();

// Crear servidor Express.
const app = express();

// Configuración de la base de datos.
connectDb();

// CORS
app.use(cors());

// Convertir información enviada desde peticiones a JSON.
app.use(express.json());

// Autenticación -> crear, y autenticar usuarios y renovar sus tokens.
app.use("/api/auth", authRouter);

// CRUD: Eventos del calendario.
app.use("/api/events", calendarEventsRouter);

app.use("/api/{*splat}", (_, response) => {
  response.status(404).json({
    ok: false,
    message: "No se encontró la URL que proporcionaste.",
  });
});

// Directorio público.
app.use(express.static("public"));

app.use("/{*splat}", (_, response) => {
  response.sendFile(path.join(projectRoot, "public/index.html"));
});

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}.`);
});
