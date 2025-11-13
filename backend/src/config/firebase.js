import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Helper to get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read service account JSON manually
const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

export { db };
