import { Request, Response } from "express";

import type { RegisterUserRequestBody } from "../types/requests/auth/RegisterUserRequestBody.interface";
import type { LoginUserRequestBody } from "../types/requests/auth/LoginUserRequestBody.interface";

const loginUser = (request: Request, response: Response): Response => {
  const requestBody: LoginUserRequestBody = request.body;

  console.log(`Un sistema solicitó la ruta ${request.url}`);

  return response.json({
    ok: true,
    routeType: "login",
    ...requestBody,
  });
};

const registerUser = (request: Request, response: Response): Response => {
  const requestBody: RegisterUserRequestBody = request.body;

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
