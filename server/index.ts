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

export function createServer() {
  const app = express();

  // Inicializar base de datos
  initializeDatabase();
  seedDatabase();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

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
  // Upload endpoint
  app.post("/api/upload", handleUpload);

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", message: "API de ARTRADOS funcionando correctamente" });
  });

  return app;
}
