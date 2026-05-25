import { Request, Response } from "express";

import type { RegisterUserRequestBody } from "../types/requests/auth/RegisterUserRequestBody.interface";
import type { LoginUserRequestBody } from "../types/requests/auth/LoginUserRequestBody.interface";

import { UserModel } from "../models/User.model";

const loginUser = (request: Request, response: Response): Response => {
  const requestBody: LoginUserRequestBody = request.body;

  console.log(`Un sistema solicitó la ruta ${request.url}`);

  return response.json({
    ok: true,
    routeType: "login",
    ...requestBody,
  });
};

const registerUser = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const requestBody: RegisterUserRequestBody = request.body;

  try {
    const user = new UserModel(requestBody);
    await user.save();

    return response.status(200).json({
      ok: true,
      routeType: "register",
      ...requestBody,
    });
  } catch (error) {
    console.error(
      new Error(
        "Hubo un error en la operación de guardar un nuevo usuario en la base de datos",
        { cause: error },
      ),
    );
    return response.status(500).json({
      ok: false,
      message:
        "Hubo un error interno desde el servidor. Se recomienda que te comuniques con el administrador para encontrar una solución.",
    });
  }
};

const renewUserAuthToken = (request: Request, response: Response): Response => {
  console.log(`Un sistema solicitó la ruta ${request.url}`);
  return response.json({
    ok: true,
    routeType: "new",
  });
};

export { loginUser, registerUser, renewUserAuthToken };
