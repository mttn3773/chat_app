import { errorResponse } from "./../utils/apiResponse";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return errorResponse({
      res,
      status: 401,
      errors: [{ msg: "You are not authenticated" }],
    });
  }
  return next();
};
