import { verifyAccessToken } from "../utils/jwt.js";
import { findUserById } from "../models/userModel.js";

/**
 * Production-Grade Authentication Middleware
 * 
 * Features:
 * 1. Extracts JWT from Authorization header ('Bearer <token>') or HTTP-Only cookie.
 * 2. Cryptographically verifies token integrity and expiration.
 * 3. Verifies user exists in PostgreSQL DB and account is active ('is_active').
 * 4. Attaches live user record to 'req.user' for downstream controllers.
 */
export const authenticate = async (req, res, next) => {
  try {
    let token;

    // Helper to extract cookies from request header if req.cookies is not pre-populated
    const cookies = req.cookies || (req.headers.cookie
      ? Object.fromEntries(
          req.headers.cookie.split("; ").map((cookie) => {
            const [key, ...v] = cookie.split("=");
            return [key, v.join("=")];
          })
        )
      : {});

    // 1. Extract Bearer Token from Authorization Header or Cookies
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (cookies.accessToken) {
      token = cookies.accessToken;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Access token is missing.",
      });
    }

    // 2. Verify JWT token signature & expiration
    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired access token.",
      });
    }

    // 3. Database Check: Ensure user exists and hasn't been deleted
    const user = await findUserById(decoded.id || decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account associated with this token no longer exists.",
      });
    }

    // 4. Account Status Check: Ensure user is not banned / deactivated
    if (user.is_active === false) {
      return res.status(403).json({
        success: false,
        message: "Your account has been deactivated. Please contact support.",
      });
    }

    // 5. Attach user object to request
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const protect = authenticate;
export default authenticate;
