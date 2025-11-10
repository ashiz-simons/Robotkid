import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { db } from "../config/firebase.js";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" });
const projectsRef = db.collection("projects");

// 🧩 POST /api/projects — Create new project
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, link } = req.body;

    // ✅ Prevent Firestore from getting undefined
    const projectData = {
      title: title || "",
      description: description || "",
      link: link || "",
      image: "",
      createdAt: new Date(),
    };

    // ✅ Upload image to Cloudinary if provided
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "robotkid_projects",
      });
      projectData.image = uploadResult.secure_url;
      projectData.public_id = uploadResult.public_id; // store Cloudinary public ID
      fs.unlinkSync(req.file.path); // cleanup temp file
    }

    // ✅ Save to Firestore
    const docRef = await projectsRef.add(projectData);

    res.status(201).json({
      id: docRef.id,
      ...projectData,
      message: "✅ Project uploaded successfully!",
    });
  } catch (error) {
    console.error("❌ Error uploading project:", error);
    res.status(500).json({ message: error.message });
  }
});

// 🧩 GET /api/projects — Fetch all projects
router.get("/", async (req, res) => {
  try {
    const snapshot = await projectsRef.orderBy("createdAt", "desc").get();
    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(projects);
  } catch (err) {
    console.error("❌ Error fetching projects:", err);
    res.status(500).json({ message: err.message });
  }
});

// 🧩 DELETE /api/projects/:id — Delete project & Cloudinary image
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await projectsRef.doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Project not found" });
    }

    const project = doc.data();

    // ✅ Delete image from Cloudinary if it exists
    if (project.public_id) {
      try {
        await cloudinary.uploader.destroy(project.public_id);
        console.log(`🗑️ Cloudinary image deleted: ${project.public_id}`);
      } catch (err) {
        console.warn("⚠️ Could not delete Cloudinary image:", err.message);
      }
    }

    // ✅ Delete document from Firestore
    await projectsRef.doc(id).delete();

    res.status(200).json({ message: "✅ Project deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting project:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
