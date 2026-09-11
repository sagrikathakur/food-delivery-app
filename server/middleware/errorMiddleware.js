// 404 Not Found Handler
export const notFoundHandler = (req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
};

// Global Error Handler
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
