"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = exports.meService = void 0;
const passport_1 = __importDefault(require("passport"));
const apiResponse_1 = require("../utils/apiResponse");
const meService = (req) => {
    return apiResponse_1.successResponse({ data: { user: req.user || null } });
};
exports.meService = meService;
const loginService = (req, res, next) => {
    return passport_1.default.authenticate("local", (err, user, _info) => {
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
    })(req, res, next);
};
exports.loginService = loginService;
//# sourceMappingURL=auth.services.js.map