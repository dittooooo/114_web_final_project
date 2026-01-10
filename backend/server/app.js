import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import mealRoutes from "./routes/mealRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import mongoose from "mongoose";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_ORIGIN, credentials: false }));
app.use(express.json());

app.use("/uploads", express.static(path.resolve("uploads")));

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/meals", mealRoutes);

app.use(errorHandler);

const port = process.env.PORT || 4000;

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => console.log(`[Server] http://localhost:${port}`));
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

// Health check: server alive
app.get("/health", (req, res) => {
  res.status(200).json({
    ok: true,
    service: "backend",
    time: new Date().toISOString(),
  });
});

// Health check: DB connection state
app.get("/health/db", (req, res) => {
  const stateCode = mongoose.connection.readyState;
  // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
  const stateMap = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  const state = stateMap[stateCode] ?? "unknown";
  const ok = stateCode === 1;

  res.status(ok ? 200 : 503).json({
    ok,
    db: state,
  });
});
