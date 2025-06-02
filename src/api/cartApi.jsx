// cartApi.js
import { fetchProducts } from './productsApi';
import { BASE_URL } from './api';
import ERROR_MESSAGES from '../configs/errors';

export const fetchCart = async () => {
  try {
    const response = await fetch(`${BASE_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    if (!data.success || !data.data || !Array.isArray(data.data.productInfo)) {
      return { success: false, message: "Invalid cart data" };
    }
    return { success: true, data: data.data.productInfo };
  } catch (error) {
    return { success: false, message: ERROR_MESSAGES.CART.FETCH_ERROR.message };
  }
};


export const loadCartWithDetails = async () => {
  try {
    const cartResult = await fetchCart();
    if (!cartResult.success) return cartResult;

    const allProducts = await fetchProducts();

    const enrichedItems = cartResult.data.map(item => {
      const product = allProducts.find(p => p.productId === item.productId);
      return {
        ...item,
        name: product?.name || "Unknown",
        image: product?.image || "",
        price: product?.price || 0,
      };
    });

    return { success: true, data: enrichedItems };
  } catch (err) {
    return { success: false, message: ERROR_MESSAGES.CART.ENRICH_ERROR.message };
  }
};



export const removeCartItem = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/cart/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to remove item");
    }

    return { success: true };
  } catch (err) {
    return { success: false, message: ERROR_MESSAGES.CART.REMOVE_ERROR.message };
  }
};

