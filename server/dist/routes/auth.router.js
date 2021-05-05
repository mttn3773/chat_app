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
            const { status, response } = apiResponse_1.errorResponse({
                status: 401,
                errors: [err],
            });
            return res
                .status(status)
                .json(Object.assign({}, response))
                .end();
        }
        if (!user) {
            const { status, response } = apiResponse_1.errorResponse({
                status: 401,
                errors: [{ msg: "Something went wrong" }],
            });
            return res
                .status(status)
                .json(Object.assign({}, response))
                .end();
        }
        req.logIn(user, (err) => {
            if (err) {
                const { status, response } = apiResponse_1.errorResponse({
                    status: 401,
                    errors: [err],
                });
                return res
                    .status(status)
                    .json(Object.assign({}, response))
                    .end();
            }
            user.password = undefined;
            const { status, response } = apiResponse_1.successResponse({
                status: 401,
                msg: "Authenticated",
                data: { user },
            });
            return res.status(status).json(Object.assign({}, response));
        });
    })(req, res, _next);
});
router.get("/me", auth_1.authMiddleware, auth_controllers_1.me);
exports.default = router;
//# sourceMappingURL=auth.router.js.map