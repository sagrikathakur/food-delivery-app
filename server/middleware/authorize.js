/**
 * Role-Based Access Control Middleware
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Requires role: ${allowedRoles.join(", ")}`,
      });
    }

    next();
  };
};

export const authorizeAdmin = authorize("admin");
export default authorize;
