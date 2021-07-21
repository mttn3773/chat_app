"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controllers_1 = require("../controllers/auth.controllers");
const express_1 = require("express");
const auth_controllers_2 = require("../controllers/auth.controllers");
const auth_1 = require("../middlewares/auth");
const router = express_1.Router();
router.post("/login", auth_controllers_2.login);
router.get("/me", auth_1.authMiddleware, auth_controllers_2.me);
router.post("/logout", auth_1.authMiddleware, auth_controllers_1.logout);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map