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

import { body, check } from "express-validator";
import checkFinalJsonFieldsValidation from "../middlewares/checkFinalJsonFieldsValidation.middleware";

const authRouter = Router();

authRouter.post(
  "/login",
  [
    check("email", "Debes introducir un correo.").not().isEmpty(),
    check(
      "email",
      "El campo de correo debe tener un formato como tal.",
    ).isEmail(),

    check("password", "Debes introducir una contraseña.").not().isEmpty(),
    check("password", "La contraseña debe ser una cadena de texto.").isString(),

    checkFinalJsonFieldsValidation,
  ],
  loginUser,
);

authRouter.post(
  "/register",
  [
    check("name", "Debes introducir el nombre deseado.").not().isEmpty(),
    check("name", "El nombre debe ser una cadena de texto.").isString(),

    check("email", "Debes introducir un correo electrónico.").not().isEmpty(),
    check(
      "email",
      "El campo de correo electrónico debe tener un formato como tal.",
    ).isEmail(),

    check("password", "Debes introducir una contraseña.").not().isEmpty(),
    check("password", "La contraseña debe ser una cadena de texto.").isString(),
    check(
      "password",
      "La contraseña debe tener como mínimo 6 carácteres",
    ).isLength({ min: 6 }),
    // TODO: Validar que la contraseña sea fuerte.

    checkFinalJsonFieldsValidation,
  ],
  registerUser,
);

authRouter.put("/renew", renewUserAuthToken);

export default authRouter;
