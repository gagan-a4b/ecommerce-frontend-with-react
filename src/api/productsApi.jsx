import React from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "./api";

//user side rendering
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const addToCart = async (product) => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.info("Please log in to add items to cart");
    return { success: false, message: "Not logged in" };
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
      toast.error(data.message || "Failed to add to cart");
    }

    return data;
  } catch (err) {
    console.error("Add to cart error:", err);
    return { success: false, message: "Network error" };
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
    console.error("Error adding product:", error.message);
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
    console.error("Error updating product:", error.message);
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
    console.error("Error deleting product:", error.message);
    return { success: false, message: error.message };
  }
};
