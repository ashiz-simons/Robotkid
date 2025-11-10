import express from "express";
import { db } from "../config/firebase.js";

const router = express.Router();
const skillsRef = db.collection("skills");

// 🧩 POST /api/skills — Add new skill
router.post("/", async (req, res) => {
  try {
    const { name, level, icon } = req.body;

    if (!name || !level) {
      return res.status(400).json({ message: "Name and level are required" });
    }

    const docRef = await skillsRef.add({
      name,
      level: Number(level),
      icon: icon || "FaStar",
      createdAt: new Date(),
    });

    res.status(201).json({ id: docRef.id, message: "Skill added successfully!" });
  } catch (error) {
    console.error("❌ Error adding skill:", error);
    res.status(500).json({ message: error.message });
  }
});

// 🧩 GET /api/skills — Get all skills
router.get("/", async (req, res) => {
  try {
    const snapshot = await skillsRef.orderBy("createdAt", "desc").get();
    const skills = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(skills);
  } catch (error) {
    console.error("❌ Error fetching skills:", error);
    res.status(500).json({ message: error.message });
  }
});

// 🧩 PUT /api/skills/:id — Update skill
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, level, icon } = req.body;
    const skillRef = skillsRef.doc(id);

    await skillRef.update({
      name,
      level: Number(level),
      icon: icon || "FaStar",
    });

    res.status(200).json({ message: "Skill updated successfully!" });
  } catch (error) {
    console.error("❌ Error updating skill:", error);
    res.status(500).json({ message: error.message });
  }
});

// 🧩 DELETE /api/skills/:id — Delete skill
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await skillsRef.doc(id).delete();
    res.status(200).json({ message: "Skill deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting skill:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
