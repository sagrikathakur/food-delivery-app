import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { notFoundHandler, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Authentication API" });
});

// Main API routes
app.use("/api", routes);

// 404 & Global Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
