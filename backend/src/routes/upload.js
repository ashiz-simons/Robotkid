import express from "express";
import multer from "multer";
import { bucket } from "../config/firebase.js";

const router = express.Router();

// Multer setup for temporary file handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/upload
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const blob = bucket.file(`uploads/${Date.now()}_${req.file.originalname}`);
    const blobStream = blob.createWriteStream({
      metadata: { contentType: req.file.mimetype },
    });

    blobStream.on("error", (err) => res.status(500).json({ message: err.message }));

    blobStream.on("finish", async () => {
      const [url] = await blob.getSignedUrl({
        action: "read",
        expires: "03-09-2491", // far future
      });
      res.status(200).json({ url });
    });

    blobStream.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
