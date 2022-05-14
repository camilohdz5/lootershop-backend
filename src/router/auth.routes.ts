import express, { Router } from "express";
import { ping, login, signUp } from "../controllers/auth.controller";

// Middlewares
import {
  checkUniqueEmail,
  checkUniqueUsername,
  tokenValidation,
} from "../middlewares/auth";

/**
 * Version: 1
 */
const router: Router = express.Router();

router.get("/auth/ping", ping);
router.post("/auth/login", login);
router.post("/auth/signup", [checkUniqueEmail, checkUniqueUsername], signUp); // TODO: Add Middleware for password Security Level Validation

export default router;
