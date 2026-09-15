/**
 * Production-Grade Role-Based Access Control (RBAC) & Authorization Middleware
 */

// Production Role Hierarchy Definition
const ROLE_HIERARCHY = {
  admin: ["admin", "manager", "user"],
  manager: ["manager", "user"],
  user: ["user"],
};

/**
 * Role-Based Authorization Middleware Factory
 * Checks if user's role satisfies any of the required roles or inherited privileges.
 * 
 * Usage:
 * router.get('/admin-dashboard', authenticate, authorize('admin'), controller);
 * router.get('/reports', authenticate, authorize('admin', 'manager'), controller);
 * 
 * @param {...string} allowedRoles - Permitted roles (e.g. 'admin', 'manager', 'user')
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // 1. Ensure user is authenticated
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        success: false,
        message: "Authentication required before authorization.",
      });
    }

    const userRole = req.user.role.toLowerCase();

    // 2. Check if user's role (or inherited roles) match allowed roles
    const inheritedRoles = ROLE_HIERARCHY[userRole] || [userRole];

    const hasPermission = allowedRoles.some((role) =>
      inheritedRoles.includes(role.toLowerCase())
    );

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Requires one of the following roles: ${allowedRoles.join(", ")}`,
      });
    }

    next();
  };
};

/**
 * Resource Ownership Authorization Helper
 * Grants access if user owns the resource OR if user is an Admin.
 * 
 * Usage:
 * router.patch('/orders/:id', authenticate, authorizeOwnerOrAdmin(req => req.params.userId), controller);
 */
export const authorizeOwnerOrAdmin = (getOwnerId) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const ownerId = getOwnerId(req);
    const isOwner = String(req.user.id) === String(ownerId);
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You do not have permission to modify this resource.",
      });
    }

    next();
  };
};

export const authorizeAdmin = authorize("admin");
export default authorize;
