import {
  createAddress,
  getUserAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../models/addressModel.js";

export const createUserAddress = async (userId, addressData) => {
  return createAddress({
    userId,
    ...addressData,
  });
};

export const getUserAddressList = async (userId) => {
  return getUserAddresses(userId);
};

export const getUserAddress = async (userId, addressId) => {
  const address = await getAddressById(userId, addressId);

  if (!address) {
    const error = new Error("Address not found");
    error.statusCode = 404;
    throw error;
  }

  return address;
};

export const updateUserAddress = async (
  userId,
  addressId,
  addressData
) => {
  const address = await updateAddress(
    userId,
    addressId,
    addressData
  );

  if (!address) {
    const error = new Error("Address not found");
    error.statusCode = 404;
    throw error;
  }

  return address;
};

export const deleteUserAddress = async (userId, addressId) => {
  const address = await deleteAddress(userId, addressId);

  if (!address) {
    const error = new Error("Address not found");
    error.statusCode = 404;
    throw error;
  }

  return address;
};

export const makeDefaultAddress = async (userId, addressId) => {
  const address = await setDefaultAddress(userId, addressId);

  if (!address) {
    const error = new Error("Address not found");
    error.statusCode = 404;
    throw error;
  }

  return address;
};