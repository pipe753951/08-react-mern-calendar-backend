import express from "express";

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
app.listen(4000, () => {
  console.log("Servidor corriendo en el puerto 4000.");
});
