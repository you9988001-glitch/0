import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import guardianRouter from "./issue-guardian.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

app.use("/api", guardianRouter);
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
  console.log("Guardian system ready on http://localhost:3000");
});
