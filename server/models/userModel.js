
import pool from "../config/database.js";

// Create a new user
export const createUser = async ({
  name,
  email,
  passwordHash,
  phone = null,
  role = "user",
}) => {
  const query = `
    INSERT INTO users (
      name,
      email,
      password_hash,
      phone,
      role
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING
      id,
      name,
      email,
      phone,
      role,
      is_active,
      created_at,
      updated_at;
  `;

  const { rows } = await pool.query(query, [
    name,
    email,
    passwordHash,
    phone,
    role,
  ]);

  return rows[0];
};

// Find user by email for authentication
export const findUserByEmailForAuth = async (email) => {
  const query = `
    SELECT
      id,
      name,
      email,
      password_hash,
      phone,
      role,
      is_active
    FROM users
    WHERE email = $1;
  `;

  const { rows } = await pool.query(query, [email]);

  return rows[0] || null;
};

// Find user by ID
export const findUserById = async (id) => {
  const query = `
    SELECT
      id,
      name,
      email,
      phone,
      role,
      is_active,
      created_at,
      updated_at
    FROM users
    WHERE id = $1;
  `;

  const { rows } = await pool.query(query, [id]);

  return rows[0] || null;
};

// Find user by ID for authentication
export const findUserByIdForAuth = async (id) => {
  const query = `
    SELECT
      id,
      name,
      email,
      password_hash,
      phone,
      role,
      is_active
    FROM users
    WHERE id = $1;
  `;

  const { rows } = await pool.query(query, [id]);

  return rows[0] || null;
};

// Update user profile
export const updateUser = async (id, { name, phone }) => {
  const query = `
    UPDATE users
    SET
      name = COALESCE($1, name),
      phone = COALESCE($2, phone),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING
      id,
      name,
      email,
      phone,
      role,
      is_active,
      created_at,
      updated_at;
  `;

  const { rows } = await pool.query(query, [name, phone, id]);

  return rows[0] || null;
};

// Update user password
export const updatePassword = async (id, passwordHash) => {
  const query = `
    UPDATE users
    SET
      password_hash = $1,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING
      id,
      name,
      email,
      role,
      updated_at;
  `;

  const { rows } = await pool.query(query, [passwordHash, id]);

  return rows[0] || null;
};

// Delete user's own account
export const deleteUser = async (id) => {
  const query = `
    DELETE FROM users
    WHERE id = $1
    RETURNING id;
  `;

  const { rows } = await pool.query(query, [id]);

  return rows[0] || null;
};

// Save password reset token
export const savePasswordResetToken = async (
  userId,
  hashedToken,
  expiresAt
) => {
  const query = `
    UPDATE users
    SET
      reset_password_token = $1,
      reset_password_expires = $2,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING
      id,
      email,
      reset_password_expires;
  `;

  const { rows } = await pool.query(query, [
    hashedToken,
    expiresAt,
    userId,
  ]);

  return rows[0] || null;
};

// Find user by valid password reset token
export const findUserByResetToken = async (hashedToken) => {
  const query = `
    SELECT
      id,
      email,
      password_hash
    FROM users
    WHERE reset_password_token = $1
      AND reset_password_expires > CURRENT_TIMESTAMP;
  `;

  const { rows } = await pool.query(query, [hashedToken]);

  return rows[0] || null;
};

// Clear password reset token
export const clearPasswordResetToken = async (userId) => {
  const query = `
    UPDATE users
    SET
      reset_password_token = NULL,
      reset_password_expires = NULL,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING id;
  `;

  const { rows } = await pool.query(query, [userId]);

  return rows[0] || null;
};
