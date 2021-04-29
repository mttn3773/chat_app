"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapValidationErrors_1 = require("./../utils/mapValidationErrors");
const user_controllers_1 = require("./../controllers/user.controllers");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const router = express_1.Router();
router.get("", user_controllers_1.getAllUsers);
router.post("", [
    express_validator_1.check("email").trim().isEmail().withMessage("Please provide valid email"),
    express_validator_1.check("password").trim().isLength({ min: 8, max: 64 }),
    express_validator_1.check("username").trim().isLength({ min: 3, max: 24 }),
], mapValidationErrors_1.mapValidationErrors, user_controllers_1.createUser);
router.delete("", user_controllers_1.deleteAllUsers);
exports.default = router;
//# sourceMappingURL=user.routes.js.map