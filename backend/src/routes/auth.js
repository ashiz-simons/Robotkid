// backend/src/routes/auth.js
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// 🧩 Temporary admin credentials
const ADMIN_USER = process.env.ADMIN_USER || "admin@robotkid.com";
const ADMIN_PASS = process.env.ADMIN_PASS || "robot123";

// 🧩 POST /api/auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN_USER || password !== ADMIN_PASS) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "2h" });
  res.json({ token });
});

export default router;
