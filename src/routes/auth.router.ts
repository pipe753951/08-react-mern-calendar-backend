/**
 * Rutas de autenticación.
 * Ruta: host + "/api/auth"
 */

import { Router } from "express";

const authRouter = Router();

authRouter.get("/", (request, response) => {
  console.log(`Un sistema solicitó la ruta ${request.url}`);
  response.json({
    ok: true,
  });
});

export default authRouter;
