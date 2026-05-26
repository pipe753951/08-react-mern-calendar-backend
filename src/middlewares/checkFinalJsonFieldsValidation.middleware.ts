import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const checkFinalJsonFieldsValidation = (
  request: Request,
  response: Response,
  next: NextFunction,
): Response | void => {
  const requestErrorValidationResult = validationResult(request);

  if (!requestErrorValidationResult.isEmpty()) {
    return response.status(400).json({
      ok: false,
      errors: requestErrorValidationResult.mapped(),
    });
  }

  next();
};

export default checkFinalJsonFieldsValidation;
