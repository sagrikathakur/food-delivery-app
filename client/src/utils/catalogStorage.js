import { perfumes_list } from '../assets/frontend_assets/assets';

const STORAGE_KEY = 'ocean_perfumes_catalog';

export const getStoredProducts = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading stored products:', err);
  }
  return perfumes_list.map((p) => ({ ...p, id: p._id || p.id }));
};

export const saveStoredProducts = (products) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new Event('ocean_catalog_updated'));
  } catch (err) {
    console.error('Error saving stored products:', err);
  }
};

export const addProductToCatalog = (newProduct) => {
  const current = getStoredProducts();
  const productWithId = {
    ...newProduct,
    id: newProduct.id || `perfume_${Date.now()}`,
    _id: newProduct.id || `perfume_${Date.now()}`,
    price: Number(newProduct.price) || 0,
    rating: Number(newProduct.rating) || 5.0,
    reviewsCount: Number(newProduct.reviewsCount) || 1,
  };
  const updated = [productWithId, ...current];
  saveStoredProducts(updated);
  return updated;
};

export const removeProductFromCatalog = (productId) => {
  const current = getStoredProducts();
  const updated = current.filter((p) => String(p.id) !== String(productId) && String(p._id) !== String(productId));
  saveStoredProducts(updated);
  return updated;
};
