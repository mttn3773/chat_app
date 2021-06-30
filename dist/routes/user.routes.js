"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./../middlewares/auth");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_controllers_1 = require("./../controllers/user.controllers");
const mapValidationErrors_1 = require("./../utils/mapValidationErrors");
const router = express_1.Router();
router.get("", user_controllers_1.getAllUsers);
router.get("/:id", user_controllers_1.getUserById);
router.put("/verify", express_validator_1.check("token")
    .isJWT()
    .withMessage("Link is corrupted. Make sure you have copied the link correctly"), mapValidationErrors_1.mapValidationErrors, user_controllers_1.verifyUser);
router.put("/reset-password", [
    express_validator_1.check("token")
        .isJWT()
        .withMessage("Link is corrupted. Make sure you have copied the link correctly"),
    express_validator_1.check("password").trim().isLength({ min: 8, max: 64 }),
], mapValidationErrors_1.mapValidationErrors, user_controllers_1.resetPassword);
router.put("/image", auth_1.authMiddleware, user_controllers_1.setAvatar);
router.post("/verify/new", express_validator_1.check("email")
    .trim()
    .isEmail()
    .withMessage("Link is corrupted. Make sure you have copied the link correctly"), mapValidationErrors_1.mapValidationErrors, user_controllers_1.sendVerificationLink);
router.post("/forgot-password", express_validator_1.check("email").trim().isEmail().withMessage("Provide email"), mapValidationErrors_1.mapValidationErrors, user_controllers_1.forgotPassword);
router.post("", [
    express_validator_1.check("email").trim().isEmail().withMessage("Please provide valid email"),
    express_validator_1.check("password").trim().isLength({ min: 8, max: 64 }),
    express_validator_1.check("username").trim().isLength({ min: 3, max: 24 }),
], mapValidationErrors_1.mapValidationErrors, user_controllers_1.createUser);
router.delete("", user_controllers_1.deleteAllUsers);
exports.default = router;
//# sourceMappingURL=user.routes.js.map