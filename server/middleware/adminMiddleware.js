/**
 * Admin Middleware (restricts access to admin users only)
 */
export const authorizeAdmin = (req, res, next) => {
  if (!req.user) {
    const error = new Error("Authentication required");
    error.statusCode = 401;
    return next(error);
  }

  if (req.user.role !== "admin") {
    const error = new Error("Access denied. Admin privileges required.");
    error.statusCode = 403;
    return next(error);
  }

  next();
};

/**
 * Role-based Authorization Middleware Factory
 * @param  {...String} allowedRoles - List of permitted user roles (e.g. 'admin', 'user')
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      const error = new Error("Authentication required");
      error.statusCode = 401;
      return next(error);
    }

    if (!allowedRoles.includes(req.user.role)) {
      const error = new Error(
        `Access denied. Requires one of the following roles: ${allowedRoles.join(", ")}`
      );
      error.statusCode = 403;
      return next(error);
    }

    next();
  };
};

export const isAdmin = authorizeAdmin;
export default authorizeAdmin;
