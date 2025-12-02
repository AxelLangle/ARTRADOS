import type { RequestHandler } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import os from "os";

// Configurable storage mode; default to disk to persist uploaded images
const storageMode = (process.env.UPLOAD_STORAGE || "disk").toLowerCase();
const imagesDir = path.join(process.cwd(), "public", "images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

let storage: multer.StorageEngine;
if (storageMode === "memory") {
  storage = multer.memoryStorage();
} else {
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
    if (storageMode === "memory" && req.file.buffer) {
      const mime = req.file.mimetype || "image/png";
      const base64 = req.file.buffer.toString("base64");
      const dataUrl = `data:${mime};base64,${base64}`;
      return res.json({ dataUrl });
    }
    const relPath = `/images/${req.file.filename}`;
    // Construct absolute URL when possible
    const proto = (req.headers["x-forwarded-proto"] as string) || req.protocol;
    const host = (req.headers.host as string) || "";
    const absUrl = host ? `${proto}://${host}${relPath}` : relPath;
    return res.json({ path: relPath, url: absUrl });
  }) as RequestHandler,
];
