import { BASE_URL } from "./api";
import ERROR_MESSAGES from "../configs/errors";

export const fetchOrders = async () => {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    return { success: true, data: data.orders || [] };
  } catch (error) {
    return { success: false, message: ERROR_MESSAGES.ORDERS.FETCH_ERROR.message };
  }
};
