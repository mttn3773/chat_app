import { Router } from "express";
import { login, me } from "../controllers/auth.controllers";
import { authMiddleware } from "../middlewares/auth";
const router = Router();

router.post("/login", login);

router.get("/me", authMiddleware, me);
export default router;
