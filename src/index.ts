import express from "express";
import { config } from "dotenv";

config();

// Crear servidor Express
const app = express();

// Directorio público.
app.use(express.static("public"));

// app.get("/", (request, response) => {
//   console.log(`Un sistema solicitó la ruta ${request.url}`);
//   response.json({
//     ok: true,
//   });
// });

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}.`);
});
