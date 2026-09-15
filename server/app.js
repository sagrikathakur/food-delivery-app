import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import routes from "./routes/index.js";
import { auditLogger } from "./middleware/auditLogger.js";
import { notFoundHandler, errorHandler } from "./errorMiddleware.js";

const app = express();

// Trust reverse proxy (Nginx / Cloudflare / Heroku) for HTTPS & IP rate limiting
app.set("trust proxy", 1);

// Security HTTP Headers (Helmet)
app.use(helmet());

// CORS Configuration (Strict Origin & Credentials)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Payload size limit to prevent DoS payload flooding
app.use(express.json({ limit: "10kb" }));

// Audit Logging Middleware
app.use(auditLogger());

// Rate Limiting for Authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per IP per 15 minutes
  message: {
    success: false,
    message: "Too many authentication requests. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/auth", authLimiter);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ status: "healthy", message: "NexusAuth Security API Operational" });
});

// Main API routes (Server-side authorization enforced inside router handlers)
app.use("/api", routes);

// 404 Deny-by-default Catch & Global Error Handler
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
