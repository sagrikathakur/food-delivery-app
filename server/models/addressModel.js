import pool from "../config/database.js";

// Create Address
export const createAddress = async ({
  userId,
  fullName,
  phone,
  addressLine1,
  addressLine2 = null,
  city,
  state,
  postalCode,
  country = "India",
  isDefault = false,
}) => {
  const query = `
    INSERT INTO addresses (
      user_id,
      full_name,
      phone,
      address_line1,
      address_line2,
      city,
      state,
      postal_code,
      country,
      is_default
    )
    VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9, $10
    )
    RETURNING *;
  `;

  const values = [
    userId,
    fullName,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    isDefault,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
};


// Get User Addresses
export const getUserAddresses = async (userId) => {
  const query = `
    SELECT *
    FROM addresses
    WHERE user_id = $1
    ORDER BY is_default DESC, created_at DESC;
  `;

  const { rows } = await pool.query(query, [userId]);

  return rows;
};


// Get Single Address
export const getAddressById = async (userId, addressId) => {
  const query = `
    SELECT *
    FROM addresses
    WHERE id = $1
      AND user_id = $2;
  `;

  const { rows } = await pool.query(query, [
    addressId,
    userId,
  ]);

  return rows[0] || null;
};


// Update Address
export const updateAddress = async (
  userId,
  addressId,
  {
    fullName,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
  }
) => {
  const query = `
    UPDATE addresses
    SET
      full_name = COALESCE($1, full_name),
      phone = COALESCE($2, phone),
      address_line1 = COALESCE($3, address_line1),
      address_line2 = COALESCE($4, address_line2),
      city = COALESCE($5, city),
      state = COALESCE($6, state),
      postal_code = COALESCE($7, postal_code),
      country = COALESCE($8, country),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $9
      AND user_id = $10
    RETURNING *;
  `;

  const values = [
    fullName,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    addressId,
    userId,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0] || null;
};


// Delete Address
export const deleteAddress = async (userId, addressId) => {
  const query = `
    DELETE FROM addresses
    WHERE id = $1
      AND user_id = $2
    RETURNING id;
  `;

  const { rows } = await pool.query(query, [
    addressId,
    userId,
  ]);

  return rows[0] || null;
};


// Set Default Address
export const setDefaultAddress = async (userId, addressId) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `
      UPDATE addresses
      SET
        is_default = FALSE,
        updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $1;
      `,
      [userId]
    );

    const { rows } = await client.query(
      `
      UPDATE addresses
      SET
        is_default = TRUE,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
        AND user_id = $2
      RETURNING *;
      `,
      [addressId, userId]
    );

    await client.query("COMMIT");

    return rows[0] || null;

  } catch (error) {
    await client.query("ROLLBACK");
    throw error;

  } finally {
    client.release();
  }
};