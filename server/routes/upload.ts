import type { RequestHandler } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import os from "os";

// Detect serverless (Netlify functions) environment where disk persistence is not available
const isServerless = Boolean(process.env.NETLIFY || process.env.AWS_REGION);

// Choose storage based on environment
let storage: multer.StorageEngine;
if (isServerless) {
  // Use memory storage in serverless; return a data URL to the client
  storage = multer.memoryStorage();
} else {
  const imagesDir = path.join(process.cwd(), "public", "images");
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, imagesDir);
    },
    filename: (req, file, cb) => {
      const name = (req.body?.name || "image").toString().trim() || "image";
      const safeName = name.replace(/[^a-z0-9-_]/gi, "_");
      const ext = path.extname(file.originalname).toLowerCase() || ".png";
      const date = new Date().toISOString().replace(/[:.]/g, "-");
      cb(null, `${safeName}-${date}${ext}`);
    },
  });
}

const upload = multer({ storage });

export const handleUpload = [
  upload.single("file"),
  ((req, res) => {
    // Debug logs
    // console.log("Upload request received", { body: req.body, file: req.file });
    if (!req.file) {
      return res.status(400).json({ error: "No se recibió archivo" });
    }
    if (isServerless && req.file.buffer) {
      const mime = req.file.mimetype || "image/png";
      const base64 = req.file.buffer.toString("base64");
      const dataUrl = `data:${mime};base64,${base64}`;
      return res.json({ dataUrl });
    }
    const relPath = `/images/${req.file.filename}`;
    return res.json({ path: relPath });
  }) as RequestHandler,
];
