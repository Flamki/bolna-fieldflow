import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createApp } from "./app.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 8080;
const app = createApp();
const distDir = path.join(__dirname, "..", "dist");

app.use(express.static(distDir));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(distDir, "index.html"), (error) => {
    if (error) next();
  });
});

app.listen(port, () => {
  console.log(`FieldFlow server running on http://localhost:${port}`);
});

