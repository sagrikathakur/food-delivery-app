import pool from "../config/database.js";

// Create a new user
export const createUser = async (data) => {
  const {
    name,
    email,
    passwordHash,
    phone = null,
    role = "user",
  } = data;

  const result = await pool.query(
    `
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
    `,
    [name, email, passwordHash, phone, role]
  );

  return result.rows[0];
};


// Find user by email for login
export const findUserByEmailForAuth = async (email) => {
  const result = await pool.query(
    `
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
    `,
    [email]
  );

  return result.rows[0] || null;
};


// Find user by ID
export const findUserById = async (id) => {
  const result = await pool.query(
    `
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
    `,
    [id]
  );

  return result.rows[0] || null;
};


// Find user by ID for authentication
export const findUserByIdForAuth = async (id) => {
  const result = await pool.query(
    `
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
    `,
    [id]
  );

  return result.rows[0] || null;
};


// Update user profile
export const updateUser = async (id, data) => {
  const { name, phone } = data;

  const result = await pool.query(
    `
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
    `,
    [name, phone, id]
  );

  return result.rows[0] || null;
};


// Update user password
export const updatePassword = async (id, passwordHash) => {
  const result = await pool.query(
    `
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
    `,
    [passwordHash, id]
  );

  return result.rows[0] || null;
};


// Delete user's own account
export const deleteUser = async (id) => {
  const result = await pool.query(
    `
    DELETE FROM users
    WHERE id = $1
    RETURNING id;
    `,
    [id]
  );

  return result.rows[0] || null;
};


// Save password reset token
export const savePasswordResetToken = async (
  userId,
  hashedToken,
  expiresAt
) => {
  const result = await pool.query(
    `
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
    `,
    [hashedToken, expiresAt, userId]
  );

  return result.rows[0] || null;
};


// Find user by valid password reset token
export const findUserByResetToken = async (hashedToken) => {
  const result = await pool.query(
    `
    SELECT
      id,
      email,
      password_hash
    FROM users
    WHERE reset_password_token = $1
      AND reset_password_expires > CURRENT_TIMESTAMP;
    `,
    [hashedToken]
  );

  return result.rows[0] || null;
};


// Clear password reset token
export const clearPasswordResetToken = async (userId) => {
  const result = await pool.query(
    `
    UPDATE users
    SET
      reset_password_token = NULL,
      reset_password_expires = NULL,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING id;
    `,
    [userId]
  );

  return result.rows[0] || null;
};

// Aliases for compatibility
export const findUserByEmail = findUserByEmailForAuth;
export const findUserByIdWithPassword = findUserByIdForAuth;