import express from "express";

import { config } from "dotenv";
import cors from "cors";

import authRouter from "./routes/auth.router";
import connectDb from "./database/connectDb";
import calendarEventsRouter from "./routes/calendarEvents.router";

config();

// Crear servidor Express.
const app = express();

// Configuración de la base de datos.
connectDb();

// CORS
app.use(cors());

// Directorio público.
app.use(express.static("public"));

// Convertir información enviada desde peticiones a JSON.
app.use(express.json());

// Autenticación -> crear, y autenticar usuarios y renovar sus tokens.
app.use("/api/auth", authRouter);

// CRUD: Eventos del calendario.
app.use("/api/events", calendarEventsRouter);

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}.`);
});
