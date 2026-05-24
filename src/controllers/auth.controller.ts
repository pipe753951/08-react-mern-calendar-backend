import { Request, Response } from "express";
import { validationResult } from "express-validator";

import type { RegisterUserRequestBody } from "../types/requests/auth/RegisterUserRequestBody.interface";
import type { LoginUserRequestBody } from "../types/requests/auth/LoginUserRequestBody.interface";

const loginUser = (request: Request, response: Response): Response => {
  const requestBody: LoginUserRequestBody = request.body;
  const requestErrorValidationResult = validationResult(request);

  if (!requestErrorValidationResult.isEmpty()) {
    return response.status(400).json({
      ok: false,
      errors: requestErrorValidationResult.mapped(),
    });
  }

  console.log(`Un sistema solicitó la ruta ${request.url}`);

  return response.json({
    ok: true,
    routeType: "login",
    ...requestBody,
  });
};

const registerUser = (request: Request, response: Response): Response => {
  const requestBody: RegisterUserRequestBody = request.body;
  const requestErrorValidationResult = validationResult(request);

  if (!requestErrorValidationResult.isEmpty()) {
    return response.status(400).json({
      ok: false,
      errors: requestErrorValidationResult.mapped(),
    });
  }

  return response.json({
    ok: true,
    routeType: "register",
    ...requestBody,
  });
};

const renewUserAuthToken = (request: Request, response: Response): Response => {
  console.log(`Un sistema solicitó la ruta ${request.url}`);
  return response.json({
    ok: true,
    routeType: "new",
  });
};

export { loginUser, registerUser, renewUserAuthToken };
