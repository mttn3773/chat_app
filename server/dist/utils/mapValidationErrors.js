"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapValidationErrors = void 0;
const apiResponse_1 = require("./apiResponse");
const express_validator_1 = require("express-validator");
const mapValidationErrors = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        const { status, response } = apiResponse_1.errorResponse({
            errors: errors.array(),
            status: 400,
        });
        return res.status(status).json(Object.assign({}, response));
    }
    return next();
};
exports.mapValidationErrors = mapValidationErrors;
//# sourceMappingURL=mapValidationErrors.js.map