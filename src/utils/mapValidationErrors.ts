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
    const { status, response } = errorResponse({
      errors: errors.array(),
      status: 400,
    });
    return res.status(status).json({ ...response });
  }
  return next();
};
