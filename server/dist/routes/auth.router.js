"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./../middlewares/auth");
const auth_controllers_1 = require("./../controllers/auth.controllers");
const apiResponse_1 = require("./../utils/apiResponse");
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = express_1.Router();
router.post("/login", (req, res, _next) => {
    passport_1.default.authenticate("local", (err, user, info) => {
        if (err) {
            return apiResponse_1.errorResponse({ res, status: 401, errors: [err] });
        }
        if (!user) {
            return apiResponse_1.errorResponse({
                res,
                status: 401,
                errors: [{ msg: "Something went wrong" }],
            });
        }
        req.logIn(user, (err) => {
            if (err) {
                return apiResponse_1.errorResponse({ res, status: 401, errors: [err] });
            }
            return apiResponse_1.successResponse({
                res,
                msg: "Authenticated",
                data: { user: Object.assign(Object.assign({}, user), { password: undefined }) },
            });
        });
    })(req, res, _next);
});
router.get("/me", auth_1.authMiddleware, auth_controllers_1.me);
exports.default = router;
//# sourceMappingURL=auth.router.js.map