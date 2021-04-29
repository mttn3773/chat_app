"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapValidationErrors = void 0;
const apiResponse_1 = require("./apiResponse");
const express_validator_1 = require("express-validator");
const mapValidationErrors = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return apiResponse_1.errorResponse({
            res,
            errors: errors.array(),
        });
    }
    next();
};
exports.mapValidationErrors = mapValidationErrors;
//# sourceMappingURL=mapValidationErrors.js.map