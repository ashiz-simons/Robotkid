// src/routes/admin.js
import express from "express";
import bcrypt from "bcryptjs";
import { db } from "../config/firebase.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const adminRef = db.collection("admin");

// ✅ Setup route (one-time use to create admin)
router.post("/setup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    // Check if an admin already exists
    const existing = await adminRef.limit(1).get();
    if (!existing.empty) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password and store
    const hashed = await bcrypt.hash(password, 10);
    await adminRef.add({ username, password: hashed });
    res.status(201).json({ message: "Admin created successfully!" });
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Defensive check before querying Firestore
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    // Query for admin
    const snapshot = await adminRef.where("username", "==", username).limit(1).get();
    if (snapshot.empty) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const adminDoc = snapshot.docs[0];
    const adminData = adminDoc.data();

    // Compare password
    const match = await bcrypt.compare(password, adminData.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Sign JWT token
    const token = jwt.sign(
      { id: adminDoc.id, username },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
