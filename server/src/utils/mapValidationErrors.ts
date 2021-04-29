import { errorResponse } from "./apiResponse";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const mapValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return errorResponse({
      res,
      errors: errors.array(),
    });
  }
  next();
};
