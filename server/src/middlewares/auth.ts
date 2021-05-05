import { errorResponse } from "./../utils/apiResponse";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    const { status, response } = errorResponse({
      status: 401,
      errors: [{ msg: "You are not authenticated" }],
    });
    return res
      .status(status)
      .json({ ...response })
      .end();
  }
  return next();
};
