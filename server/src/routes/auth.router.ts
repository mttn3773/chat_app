import { authMiddleware } from "./../middlewares/auth";
import { me } from "./../controllers/auth.controllers";
import { errorResponse, successResponse } from "./../utils/apiResponse";
import { Router } from "express";
import passport from "passport";
const router = Router();

router.post("/login", (req, res, _next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return errorResponse({ res, status: 401, errors: [err] });
    }
    if (!user) {
      return errorResponse({
        res,
        status: 401,
        errors: [{ msg: "Something went wrong" }],
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return errorResponse({ res, status: 401, errors: [err] });
      }
      return successResponse({
        res,
        msg: "Authenticated",
        data: { user: { ...user, password: undefined } },
      });
    });
  })(req, res, _next);
});

router.get("/me", authMiddleware, me);
export default router;
