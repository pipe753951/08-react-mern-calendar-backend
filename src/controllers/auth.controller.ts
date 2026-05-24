import { Request, Response } from "express";

import { RegisterUserRequestBody } from "../types/requests/auth/RegisterUserRequestBody.interface";
import { LoginUserRequestBody } from "../types/requests/auth/LoginUserRequestBody.interface";

const loginUser = (request: Request, response: Response): Response => {
  console.log(`Un sistema solicitó la ruta ${request.url}`);
  return response.json({
    ok: true,
    routeType: "login",
  });
};

const registerUser = (request: Request, response: Response): Response => {
  const requestBody: RegisterUserRequestBody = request.body;
  console.log({ requestBody });

  if (typeof requestBody.name !== "string") {
    return response
      .status(400)
      .json({ ok: false, message: "El nombre debe ser una cadena de texto." });
  }

  if (requestBody.name.length < 5) {
    return response.status(400).json({
      ok: false,
      message: "El nombre debe tener más de cinco letras.",
    });
  }

  return response.json({
    ok: true,
    routeType: "register",
    ...requestBody,
  });
};

const renewUserAuthToken = (request: Request, response: Response): Response => {
  const requestBody: LoginUserRequestBody = request.body;
  console.log({ requestBody });

  console.log(`Un sistema solicitó la ruta ${request.url}`);
  return response.json({
    ok: true,
    routeType: "new",
    ...requestBody,
  });
};

export { loginUser, registerUser, renewUserAuthToken };
