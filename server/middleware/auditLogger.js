

export const auditLogger = (actionName = "") => {
  return (req, res, next) => {
    const startTime = Date.now();
    const clientIp = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"] || "unknown";

    // Capture response completion to log outcome
    res.on("finish", () => {
      const duration = Date.now() - startTime;
      const userId = req.user ? req.user.id : "anonymous";
      const userRole = req.user ? req.user.role : "none";
      const statusCode = res.statusCode;

      const logPayload = {
        timestamp: new Date().toISOString(),
        action: actionName || `${req.method} ${req.baseUrl}${req.path}`,
        userId,
        userRole,
        clientIp,
        userAgent,
        statusCode,
        durationMs: duration,
      };


      if (statusCode >= 400) {
        console.warn("[AUDIT WARNING]", JSON.stringify(logPayload));
      } else {
        console.log("[AUDIT LOG]", JSON.stringify(logPayload));
      }
    });

    next();
  };
};

export default auditLogger;
