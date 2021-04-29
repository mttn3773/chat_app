"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const apiResponse_1 = require("./../utils/apiResponse");
const authMiddleware = (req, res, next) => {
    if (!req.user) {
        return apiResponse_1.errorResponse({
            res,
            status: 401,
            errors: [{ msg: "You are not authenticated" }],
        });
    }
    return next();
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.js.map