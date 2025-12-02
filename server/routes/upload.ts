import type { RequestHandler } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import os from "os";
import { v2 as cloudinary } from "cloudinary";

// Detect serverless and use memory storage there; allow override via UPLOAD_STORAGE
const isServerless = Boolean(
  process.env.NETLIFY ||
  process.env.VERCEL ||
  process.env.AWS_LAMBDA_FUNCTION_NAME ||
  process.env.LAMBDA_TASK_ROOT
);
const storageMode = isServerless ? "memory" : (process.env.UPLOAD_STORAGE || "disk").toLowerCase();

let storage: multer.StorageEngine;
if (storageMode === "memory") {
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
  (async (req, res) => {
    // Debug logs
    // console.log("Upload request received", { body: req.body, file: req.file });
    if (!req.file) {
      return res.status(400).json({ error: "No se recibió archivo" });
    }
    // Use Cloudinary when configured (recommended for Netlify production)
    const useCloudinary = Boolean(
      process.env.CLOUDINARY_URL ||
      (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET)
    );

    if (isServerless && !useCloudinary) {
      console.error("Cloudinary not configured in serverless environment");
      return res.status(500).json({
        error: "Cloudinary configuration required in production",
        hint: "Set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET in Netlify environment variables"
      });
    }

    if (useCloudinary) {
      if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
        });
      }

      const folder = "artrados/products";
      const timestamp = Date.now();
      const originalName = path.parse(req.file.originalname).name.replace(/[^a-z0-9-_]/gi, "_");
      const filename = `${originalName}-${timestamp}`;

      try {
        let result;
        if (storageMode === "memory" && req.file.buffer) {
          const base64 = req.file.buffer.toString("base64");
          const dataUrl = `data:${req.file.mimetype};base64,${base64}`;
          result = await cloudinary.uploader.upload(dataUrl, {
            folder,
            public_id: filename,
            resource_type: "auto",
          });
        } else {
          result = await cloudinary.uploader.upload(req.file.path, {
            folder,
            public_id: filename,
            resource_type: "auto",
          });
        }
        return res.json({ url: result.secure_url, public_id: result.public_id });
      } catch (err: any) {
        console.error("Cloudinary upload error:", err);
        return res.status(500).json({ error: "Error subiendo imagen a Cloudinary", details: err.message || "Unknown error" });
      }
    }

    // Fallback: disk path response (local dev)
    const relPath = `/images/${req.file.filename}`;
    // Construct absolute URL when possible
    const proto = (req.headers["x-forwarded-proto"] as string) || req.protocol;
    const host = (req.headers.host as string) || "";
    const absUrl = host ? `${proto}://${host}${relPath}` : relPath;
    return res.json({ path: relPath, url: absUrl });
  }) as RequestHandler,
];
