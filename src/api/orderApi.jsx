import { BASE_URL } from "./api";

export const fetchOrders = async () => {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    const data = await response.json();
    return { success: true, data: data.orders || [] };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { success: false, message: "Error fetching orders" };
  }
};
