import * as addressService from "../service/addressService.js";

export const addAddress = async (req, res, next) => {
  try {
    const address = await addressService.createUserAddress(req.user.id, req.body);
    res.status(201).json({
      message: "Address added successfully",
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

export const getAddresses = async (req, res, next) => {
  try {
    const addresses = await addressService.getUserAddressList(req.user.id);
    res.status(200).json({ data: addresses });
  } catch (error) {
    next(error);
  }
};

export const getAddress = async (req, res, next) => {
  try {
    const address = await addressService.getUserAddress(req.user.id, req.params.id);
    res.status(200).json({ data: address });
  } catch (error) {
    next(error);
  }
};

export const updateAddress = async (req, res, next) => {
  try {
    const address = await addressService.updateUserAddress(req.user.id, req.params.id, req.body);
    res.status(200).json({
      message: "Address updated successfully",
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
    await addressService.deleteUserAddress(req.user.id, req.params.id);
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const setDefaultAddress = async (req, res, next) => {
  try {
    const address = await addressService.makeDefaultAddress(req.user.id, req.params.id);
    res.status(200).json({
      message: "Default address updated",
      data: address,
    });
  } catch (error) {
    next(error);
  }
};
