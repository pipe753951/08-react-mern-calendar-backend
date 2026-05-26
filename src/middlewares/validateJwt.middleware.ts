import type { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

import type {
  AppJwtPayload,
  RequestWithJwtPayload,
} from "../types/requests/RequestWithJwtPayload";

const validateJwt = (
  request: Request,
  response: Response,
  next: NextFunction,
): Response | void => {
  const typedRequest = request as RequestWithJwtPayload;

  const token = typedRequest.header("x.token");

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

    typedRequest.jwtPayload = { uid, name };
    next();
  } catch {
    return response.status(401).json({
      ok: false,
      message: "Token no válido",
    });
  }
};

export default validateJwt;
