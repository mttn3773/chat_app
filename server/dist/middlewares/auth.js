"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const apiResponse_1 = require("./../utils/apiResponse");
const authMiddleware = (req, res, next) => {
    if (!req.user) {
        const { status, response } = apiResponse_1.errorResponse({
            status: 401,
            errors: [{ msg: "You are not authenticated" }],
        });
        return res
            .status(status)
            .json(Object.assign({}, response))
            .end();
    }
    return next();
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.js.map