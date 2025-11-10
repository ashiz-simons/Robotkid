import express from "express";
import cloudinary from "../config/cloudinary.js";
import { db } from "../config/firebase.js";

const router = express.Router();

router.get("/test", async (req, res) => {
  try {
    const snapshot = await db.collection("test").get();
    res.json({
      firebaseConnected: true,
      cloudinaryConnected: !!cloudinary.config().cloud_name,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
