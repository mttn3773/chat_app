import { Router } from "express";
import { check } from "express-validator";
import {
  createUser,
  deleteAllUsers,
  forgotPassword,
  getAllUsers,
  resetPassword,
  sendVerificationLink,
  verifyUser,
} from "./../controllers/user.controllers";
import { mapValidationErrors } from "./../utils/mapValidationErrors";
const router = Router();

// Get Users
router.get("", getAllUsers);

// Verify Account
router.put(
  "/verify",
  check("token")
    .isJWT()
    .withMessage(
      "Link is corrupted. Make sure you have copied the link correctly"
    ),
  mapValidationErrors,
  verifyUser
);

// Reset Password

router.put(
  "/reset-password",
  [
    check("token")
      .isJWT()
      .withMessage(
        "Link is corrupted. Make sure you have copied the link correctly"
      ),
    check("password").trim().isLength({ min: 8, max: 64 }),
  ],
  mapValidationErrors,
  resetPassword
);

// Send new verification link

router.post(
  "/verify/new",
  check("email")
    .trim()
    .isEmail()
    .withMessage(
      "Link is corrupted. Make sure you have copied the link correctly"
    ),
  mapValidationErrors,
  sendVerificationLink
);
// Send reset-password link
router.post(
  "/forgot-password",
  check("email").trim().isEmail().withMessage("Provide email"),
  mapValidationErrors,
  forgotPassword
);
// Register new user
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
