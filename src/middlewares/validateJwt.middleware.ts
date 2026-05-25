import type { NextFunction, Response } from "express";

import jwt from "jsonwebtoken";

import type {
  AppJwtPayload,
  RequestWithJwtPayload,
} from "../types/requests/RequestWithJwtPayload";

const validateJwt = (
  request: RequestWithJwtPayload,
  response: Response,
  next: NextFunction,
): Response | void => {
  const token = request.header("x.token");
  console.debug(token);

  if (!token) {
    return response.status(401).json({
      ok: false,
      message: "No se proporcionó un token en la solicitud.",
    });
  }

  try {
    const { uid, name } = jwt.verify(
      token,
      process.env.JWT_SIGN,
    ) as AppJwtPayload;

    request.jwtPayload = { uid, name };
    next();
  } catch {
    return response.status(401).json({
      ok: false,
      message: "Token no válido",
    });
  }
};

export default validateJwt;
