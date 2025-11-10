import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import messagesRoute from "./routes/messages.js";
import projectsRoute from "./routes/projects.js";
import skillsRoutes from "./routes/skills.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Robotkid API running 🚀"));
app.use("/api/messages", messagesRoute);
app.use("/api/projects", projectsRoute);
app.use("/api/skills", skillsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

export default app;  // ✅ this makes it importable in index.js
