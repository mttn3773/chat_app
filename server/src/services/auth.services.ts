import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { IApiResponse } from "../interfaces/apiResponse.interface";
import { errorResponse, successResponse } from "../utils/apiResponse";

export const meService = (req: Request): IApiResponse => {
  return successResponse({ data: { user: req.user || null } });
};

export const loginService = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return passport.authenticate("local", (err, user, _info) => {
    // Check errors returned from local strategy callback function
    if (err) {
      const { status, response } = errorResponse({
        status: 401,
        errors: [err],
      });
      return res
        .status(status)
        .json({ ...response })
        .end();
    }
    if (!user) {
      const { status, response } = errorResponse({
        status: 401,
        errors: [{ msg: "Something went wrong" }],
      });
      return res
        .status(status)
        .json({ ...response })
        .end();
    }
    // Manually log in as suggested in docs
    req.logIn(user, (err) => {
      if (err) {
        const { status, response } = errorResponse({
          status: 401,
          errors: [err],
        });
        return res
          .status(status)
          .json({ ...response })
          .end();
      }
      user.password = undefined;
      const { status, response } = successResponse({
        status: 401,
        msg: "Authenticated",
        data: { user },
      });
      return res.status(status).json({ ...response });
    });
  })(req, res, next);
};
