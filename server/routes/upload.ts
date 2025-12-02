import type { RequestHandler } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const imagesDir = path.join(process.cwd(), "public", "images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const storage = multer.diskStorage({
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

const upload = multer({ storage });

export const handleUpload = [
  upload.single("file"),
  ((req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No se recibió archivo" });
    }
    const relPath = `/images/${req.file.filename}`;
    return res.json({ path: relPath });
  }) as RequestHandler,
];
