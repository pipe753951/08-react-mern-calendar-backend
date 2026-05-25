import { Request, Response } from "express";

import bcrypt from "bcryptjs";

import type { RegisterUserRequestBody } from "../types/requests/auth/RegisterUserRequestBody.interface";
import type { LoginUserRequestBody } from "../types/requests/auth/LoginUserRequestBody.interface";

import { UserModel } from "../models/User.model";

const loginUser = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const requestBody: LoginUserRequestBody = request.body;

  try {
    const userWithRequestedEmail = await UserModel.findOne({
      email: requestBody.email,
    });

    if (!userWithRequestedEmail) {
      return response.status(400).json({
        ok: false,
        message:
          "Un usuario con el correo que proporcionaste no existe. Si no te has registrado, por favor hazlo para acceder.",
      });
    }

    // Confirmar la contraseña del usuario
    const validPassword = bcrypt.compareSync(
      requestBody.password,
      userWithRequestedEmail.password!,
    );

    if (!validPassword) {
      return response.status(400).json({
        ok: false,
        message: "La contraseña es incorrecta",
      });
    }

    return response.json({
      ok: true,
      uid: userWithRequestedEmail.id,
      name: userWithRequestedEmail.name,
    });
  } catch (error) {
    console.error(
      new Error("Hubo un error inesperado en la operación de iniciar seción.", {
        cause: error,
      }),
    );
    return response.status(500).json({
      ok: false,
      message:
        "Hubo un error interno desde el servidor. Se recomienda que te comuniques con el administrador para encontrar una solución.",
    });
  }

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

    const user = new UserModel(userToCreate);
    await user.save();

    return response.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
    });
  } catch (error) {
    console.error(
      new Error(
        "Hubo un error inesperado en la operación de registrar un nuevo usuario en la base de datos.",
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
