import pool from "../config/database.js";


// create a user//
export const createUserModel = async (data) => {
  const { name, email, passwordHash, phone = null, role = 'user' } = data;
  const result = await pool.query(
    ` 
  INSERT INTO users(
  name , email , password_hash , phone , role)
  VALUES ($1 , $2 , $3 , $4 , $5)
  RETURNING
  id , name , email , phone , role , is_active , created_at , updated_at ;
  ` ,
    [name, email, passwordHash, phone, role]

  )
  return result.rows[0]
}

// find user by email//
export const findUserByEmailModel = async (email) => {
  const result = await pool.query(
    `
    SELECT * FROM users WHERE email =  $1
   ; `
    ,
    [email]
  )
  return result.rows[0] || null;
};

// Find user by ID
export const findUserByIdModel = async (id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE id = $1;
    `,
    [id]
  );

  return result.rows[0] || null;
};

// Update user profile//
export const updateUserModel = async (id, data) => {
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

// delete user profile//

export const deleteUserModel = async (id) => {
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