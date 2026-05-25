import { Request, Response } from "express";

import type { RegisterUserRequestBody } from "../types/requests/auth/RegisterUserRequestBody.interface";
import type { LoginUserRequestBody } from "../types/requests/auth/LoginUserRequestBody.interface";

import { UserModel } from "../models/User.model";
import bcrypt from "bcryptjs";

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
    const userWithRequestedEmail = await UserModel.findOne({
      email: requestBody.email,
    });

    if (userWithRequestedEmail) {
      return response.status(400).json({
        ok: false,
        message: "Un usuario con el correo que proporcionaste ya existe.",
      });
    }

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    const encryptedPassword = bcrypt.hashSync(requestBody.password, salt);

    // Reunir datos necesarios para la creación del usuario.
    // Esto se hace especialmente para evitar el caso de proporcionar información de más
    // que venga del cuerpo de la petición.
    const userToCreate: RegisterUserRequestBody = {
      name: requestBody.name,
      password: encryptedPassword,
      email: requestBody.email,
    };

    // Encriptar contraseña

    const user = new UserModel(userToCreate);
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
