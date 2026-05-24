/**
 * Rutas de autenticación.
 * Ruta: host + "/api/auth"
 */

import { Router } from "express";

import {
  loginUser,
  registerUser,
  renewUserAuthToken,
} from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/login", loginUser);

authRouter.post("/register", registerUser);

authRouter.put("/renew", renewUserAuthToken);

export default authRouter;
