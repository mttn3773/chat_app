"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = exports.errorResponse = void 0;
const errorResponse = ({ res, status = 500, errors = [{ msg: "Something went wrong" }], }) => {
    return res.status(status).json({ success: false, errors }).end();
};
exports.errorResponse = errorResponse;
const successResponse = ({ res, msg, status = 200, data, }) => {
    return res.status(status).json({ success: true, msg, data }).end();
};
exports.successResponse = successResponse;
//# sourceMappingURL=apiResponse.js.map