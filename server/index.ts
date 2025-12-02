import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { initializeDatabase, seedDatabase } from "./db/schema";
import authRoutes from "./routes/auth";
import addressRoutes from "./routes/addresses";
import productRoutes from "./routes/products";
import categoryRoutes from "./routes/categories";
import wishlistRoutes from "./routes/wishlist";
import contactRoutes from "./routes/contact";
import { handleUpload } from "./routes/upload";
import path from "path";
import * as expressModule from "express";

export function createServer() {
  const app = express();

  // Inicializar base de datos
  initializeDatabase();
  seedDatabase();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Servir archivos estáticos de /public en desarrollo
  const publicDir = path.join(process.cwd(), "public");
  app.use(expressModule.static(publicDir));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Rutas de la API
  app.use("/api/auth", authRoutes);
  app.use("/api/addresses", addressRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/categories", categoryRoutes);
  app.use("/api/wishlist", wishlistRoutes);
  app.use("/api/contact", contactRoutes);
  
  // Upload endpoint - usar spread para aplicar middlewares correctamente
  app.post("/api/upload", ...handleUpload);

  // Debug endpoint - REMOVE IN PRODUCTION
  app.get("/api/debug-env", (_req, res) => {
    res.json({
      hasCloudinaryURL: Boolean(process.env.CLOUDINARY_URL),
      hasCloudName: Boolean(process.env.CLOUDINARY_CLOUD_NAME),
      hasAPIKey: Boolean(process.env.CLOUDINARY_API_KEY),
      hasAPISecret: Boolean(process.env.CLOUDINARY_API_SECRET),
      isServerless: Boolean(process.env.NETLIFY),
      cloudName: process.env.CLOUDINARY_CLOUD_NAME?.substring(0, 3) + "***",
    });
  });

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", message: "API de ARTRADOS funcionando correctamente" });
  });

  return app;
}
