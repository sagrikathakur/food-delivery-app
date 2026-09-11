import pool from "../config/database.js";

// Store new refresh token

export const createRefreshToken = async (userId, token, expiresAt) => {
  const query = `
    INSERT INTO refresh_tokens (user_id, token, expires_at)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const result = await pool.query(query, [userId, token, expiresAt]);
  return result.rows[0];
};

// Find refresh token
export const findRefreshToken = async (token) => {
  const query = `
    SELECT * FROM refresh_tokens
    WHERE token = $1;
  `;
  const result = await pool.query(query, [token]);
  return result.rows[0] || null;
};

// Delete specific refresh token (used during token refresh or logout)
export const deleteRefreshToken = async (token) => {
  const query = `
    DELETE FROM refresh_tokens
    WHERE token = $1
    RETURNING id;
  `;
  const result = await pool.query(query, [token]);
  return result.rows[0] || null;
};

// Delete all refresh tokens for a user (used for log out from all devices)
export const deleteUserRefreshTokens = async (userId) => {
  const query = `
    DELETE FROM refresh_tokens
    WHERE user_id = $1;
  `;
  await pool.query(query, [userId]);
};
