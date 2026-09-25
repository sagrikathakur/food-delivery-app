import pool from "./database.js";
import bcrypt from "bcrypt";

/**
 * Initializes database tables and schemas
 */
export const initDb = async () => {
  try {
    // 1. Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        role VARCHAR(50) DEFAULT 'user',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Add password reset columns to users table if missing
    await pool.query(`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS reset_password_token VARCHAR(255),
      ADD COLUMN IF NOT EXISTS reset_password_expires TIMESTAMP WITH TIME ZONE;
    `);

    // 3. Create refresh_tokens table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS refresh_tokens (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        token TEXT NOT NULL,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Create addresses table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS addresses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        address_line1 VARCHAR(255) NOT NULL,
        address_line2 VARCHAR(255),
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        postal_code VARCHAR(20) NOT NULL,
        country VARCHAR(100) DEFAULT 'India',
        is_default BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 5. Seed default Admin Accounts if they don't exist
    const admin1Hash = await bcrypt.hash("Nupur@123", 12);
    const admin2Hash = await bcrypt.hash("Pasha@123", 12);

    await pool.query(
      `
      INSERT INTO users (name, email, password_hash, role, is_active)
      VALUES 
        ('Nupur Admin', 'nupur@gmail.com', $1, 'admin', true),
        ('Sanu Singh Admin', 'sanusingh@gmail.com', $2, 'admin', true)
      ON CONFLICT (email) 
      DO UPDATE SET 
        role = 'admin',
        is_active = true;
      `,
      [admin1Hash, admin2Hash]
    );

    console.log("Database schema and admin accounts initialized successfully.");
  } catch (error) {
    console.error("Database initialization error:", error);
  }
};

export default initDb;
