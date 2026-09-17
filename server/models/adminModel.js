import pool from "../config/database.js";

// Get all users
export const getAllUsers = async () => {
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
    ORDER BY created_at DESC;
    `
  );

  return result.rows;
};


// Update a user's role
export const updateUserRole = async (id, role) => {
  const result = await pool.query(
    `
    UPDATE users
    SET
      role = $1,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING
      id,
      name,
      email,
      role;
    `,
    [role, id]
  );

  return result.rows[0] || null;
};


// Update a user's active status
export const updateUserStatus = async (id, isActive) => {
  const result = await pool.query(
    `
    UPDATE users
    SET
      is_active = $1,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING
      id,
      name,
      email,
      is_active;
    `,
    [isActive, id]
  );

  return result.rows[0] || null;
};


// Delete a user as an admin
export const deleteUserByAdmin = async (id) => {
  const result = await pool.query(
    `
    DELETE FROM users
    WHERE id = $1
    RETURNING
      id,
      name,
      email;
    `,
    [id]
  );

  return result.rows[0] || null;
};


// Get system statistics
export const getSystemStats = async () => {
  const userStatsResult = await pool.query(
    `
    SELECT
      COUNT(*)::int AS total_users,
      COUNT(*) FILTER (WHERE role = 'admin')::int AS total_admins,
      COUNT(*) FILTER (WHERE is_active = true)::int AS active_users
    FROM users;
    `
  );

  const sessionStatsResult = await pool.query(
    `
    SELECT
      COUNT(*)::int AS active_sessions
    FROM refresh_tokens
    WHERE expires_at > CURRENT_TIMESTAMP;
    `
  );

  return {
    ...userStatsResult.rows[0],
    ...sessionStatsResult.rows[0],
  };
};