import type { RequestHandler } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import os from "os";
import { v2 as cloudinary } from "cloudinary";

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
    const useCloudinary = Boolean(process.env.CLOUDINARY_URL || (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET));

    // If Cloudinary is configured, upload there for persistent storage in production
    if (useCloudinary) {
      // Configure if explicit credentials are present
      if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
        });
      }

      const folder = "artrados/products";
      const filename = (req.file.originalname || "image").replace(/[^a-z0-9-_.]/gi, "_");

      const uploadBuffer = async () => {
        const base64 = req.file.buffer.toString("base64");
        const dataUrl = `data:${req.file.mimetype};base64,${base64}`;
        return cloudinary.uploader.upload(dataUrl, { folder, public_id: filename, overwrite: true });
      };

      const uploadFilePath = async (filePath: string) => cloudinary.uploader.upload(filePath, { folder, public_id: filename, overwrite: true });

      const doUpload = storageMode === "memory" && req.file.buffer ? uploadBuffer : uploadFilePath.bind(null, req.file.path);

      return doUpload()
        .then((result) => {
          return res.json({ url: result.secure_url, public_id: result.public_id });
        })
        .catch((err) => {
          console.error("Cloudinary upload error", err);
          return res.status(500).json({ error: "Error subiendo imagen" });
        });
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
