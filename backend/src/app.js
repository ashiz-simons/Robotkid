import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// ✅ Import your route files
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import skillRoutes from "./routes/skills.js";
import messageRoutes from "./routes/messages.js";
import testRoutes from "./routes/test.js";
import uploadRoutes from "./routes/upload.js";

dotenv.config();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Use the routes with proper base paths
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api", testRoutes);
app.use("/api/upload", uploadRoutes);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Robotkid API is running 🚀");
});

export default app;
