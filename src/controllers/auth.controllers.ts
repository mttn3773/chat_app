import { NextFunction, Request, Response } from "express";
import {
  loginService,
  logoutService,
  meService,
} from "../services/auth.services";

export const me = async (req: Request, res: Response, _next: NextFunction) => {
  const { status, response } = meService(req);
  return res
    .status(status)
    .json({ ...response })
    .end();
};

export const logout = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { status, response } = await logoutService(req);
  return res
    .status(status)
    .json({ ...response })
    .end();
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  loginService(req, res, next);
};
