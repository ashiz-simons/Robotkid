import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import { db } from "../config/firebase.js";

const router = express.Router();
const messagesRef = db.collection("messages");

// 📦 Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "robotkid_uploads",
    resource_type: "auto",
  },
});

const upload = multer({ storage });

// ✅ GET all messages
router.get("/", async (req, res) => {
  try {
    const snapshot = await messagesRef.orderBy("createdAt", "desc").get();
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📬 POST new message (with optional file)
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const fileUrl = req.file ? req.file.path : null;

    await messagesRef.add({
      name,
      email,
      message,
      fileUrl,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Message and file uploaded successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🗑️ DELETE message by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await messagesRef.doc(id).delete();
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
