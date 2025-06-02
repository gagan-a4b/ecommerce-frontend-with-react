import React from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "./api";
import ERROR_MESSAGES from "../configs/errors";

//user side rendering
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/`);
    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.PRODUCTS.FETCH_ERROR.message);
    }
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    return [];
  }
};

export const addToCart = async (product) => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.info(ERROR_MESSAGES.PRODUCTS.LOGIN_TO_ADD.message);
    return { success: false, message: ERROR_MESSAGES.PRODUCTS.NOT_LOGGED_IN.message };
  }

  try {
    const res = await fetch(`${BASE_URL}/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: product.productId,
        quantity: 1,
        price: product.price,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      toast.error(data.message || ERROR_MESSAGES.PRODUCTS.ADD_TO_CART_FAILED.message);
    }

    return data;
  } catch (err) {
    return { success: false, message: ERROR_MESSAGES.PRODUCTS.ADD_TO_CART_FAILED.message };
  }
};

//product side rendering

export const addProduct = async (product) => {
  try {
    const res = await fetch(`${BASE_URL}/products/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...product, price: Number(product.price) }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Add failed");
    }

    return { success: true, message: "Product added" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const editProducts = async (product) => {
  try {
    const res = await fetch(
      `${BASE_URL}/products/update/${product.productId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, price: Number(product.price) }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Update failed");
    }

    return { success: true, message: "Product updated" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/products/delete/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Delete failed");
    }

    return { success: true, message: "Product deleted" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
