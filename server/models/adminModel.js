
import pool from "../config/database.js";

// Get all users
export const getAllUsers = async () => {
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
    ORDER BY created_at DESC;
  `;

  const { rows } = await pool.query(query);

  return rows;
};

// Update a user's role
export const updateUserRole = async (id, role) => {
  const query = `
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
  `;

  const { rows } = await pool.query(query, [role, id]);

  return rows[0] || null;
};

// Update a user's active status
export const updateUserStatus = async (id, isActive) => {
  const query = `
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
  `;

  const { rows } = await pool.query(query, [isActive, id]);

  return rows[0] || null;
};

// Delete a user as an admin
export const deleteUserByAdmin = async (id) => {
  const query = `
    DELETE FROM users
    WHERE id = $1
    RETURNING
      id,
      name,
      email;
  `;

  const { rows } = await pool.query(query, [id]);

  return rows[0] || null;
};

// Get system statistics
export const getSystemStats = async () => {
  const userStatsQuery = `
    SELECT
      COUNT(*)::int AS total_users,
      COUNT(*) FILTER (WHERE role = 'admin')::int AS total_admins,
      COUNT(*) FILTER (WHERE is_active = true)::int AS active_users
    FROM users;
  `;

  const sessionStatsQuery = `
    SELECT
      COUNT(*)::int AS active_sessions
    FROM refresh_tokens
    WHERE expires_at > CURRENT_TIMESTAMP;
  `;

  const [userStats, sessionStats] = await Promise.all([
    pool.query(userStatsQuery),
    pool.query(sessionStatsQuery),
  ]);

  return {
    ...userStats.rows[0],
    ...sessionStats.rows[0],
  };
};
