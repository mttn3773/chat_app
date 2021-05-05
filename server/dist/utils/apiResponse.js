"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = exports.errorResponse = void 0;
const errorResponse = ({ status = 500, errors = [{ msg: "Something went wrong" }], }) => {
    return { status, response: { success: false, errors } };
};
exports.errorResponse = errorResponse;
const successResponse = ({ status = 200, msg = "Success", data, }) => {
    return { status, response: { success: true, msg, data } };
};
exports.successResponse = successResponse;
//# sourceMappingURL=apiResponse.js.map