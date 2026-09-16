import express from "express";
import cors from "cors";
import helmet from "helmet";

import routes from "./routes/index.js";
import { auditLogger } from "./middleware/auditLogger.js";
import { authLimiter } from "./middleware/rateLimiter.js";
import { notFoundHandler, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.set("trust proxy", 1);

// Security & Parsing
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "10kb" }));

// Logging & Security Rate Limiting
app.use(auditLogger());
app.use("/api/auth", authLimiter);

// Health Check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api", routes);

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
