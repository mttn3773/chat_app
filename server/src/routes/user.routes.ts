import { mapValidationErrors } from "./../utils/mapValidationErrors";
import {
  createUser,
  deleteAllUsers,
  getAllUsers,
} from "./../controllers/user.controllers";
import { Router } from "express";
import { check } from "express-validator";
const router = Router();

router.get("", getAllUsers);
router.post(
  "",
  [
    check("email").trim().isEmail().withMessage("Please provide valid email"),
    check("password").trim().isLength({ min: 8, max: 64 }),
    check("username").trim().isLength({ min: 3, max: 24 }),
  ],
  mapValidationErrors,
  createUser
);
router.delete("", deleteAllUsers);
export default router;
