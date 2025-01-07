import { Router } from "express";

import { loginUser, registerUser } from "@auth/authControllers";

const router = Router();

//Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
