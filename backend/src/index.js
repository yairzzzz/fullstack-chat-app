import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import rateLimit from "express-rate-limit";

app.set("trust proxy", true);

import path from "path";

dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "FUCK YOU STOP SPAMMING",
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.ip === "46.117.75.91",
});

app.use((req, res, next) => {
  console.log("Client IP:", req.ip);
  next();
});
app.use(limiter);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
  connectDB();
});
