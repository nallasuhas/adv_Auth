import express from "express";
import { signup } from "../controllers/signup.js";
import { login } from "../controllers/login.js";
import { logout } from "../controllers/logout.js";
import { forgotPassword } from "../controllers/forgotPassword.js";



const router = express.Router();

// router.get('/check-auth', verifyToken, checkAuth)

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

// router.post('/verify-email', verifyEmail)
router.post('/forgot-password', forgotPassword)
// router.post('/reset-password/:token', resetPassword)


export default router