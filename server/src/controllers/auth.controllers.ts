import { Request, Response, NextFunction } from "express";
import { successResponse } from "../utils/apiResponse";

export const me = async (req: Request, res: Response, _next: NextFunction) => {
  const { user } = req;

  return successResponse({ res, data: user });
};
