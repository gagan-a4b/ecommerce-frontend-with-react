import React, { useEffect, useState } from "react";
import Header from "./Header";
import { fetchOrders } from "../api/orderApi";
import OrderModal from "../components/OrderModal"; 

function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      const response = await fetchOrders();
      if (response.success) {
        setOrders(response.data);
      } else {
        console.error(response.message);
      }
    };

    fetchData();
  }, [token]);

  const closeModal = () => setSelectedOrder(null);

  if (!token) {
    return (
      <div>
        <Header />
        <p className="text-center mt-10">Please log in to view your orders.</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="px-32 mt-24">
        <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
        {orders.length === 0 ? (
          <p>You have not placed any orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const dateOnly = new Date(order.createdAt).toLocaleDateString();
              const totalAmount = order.productInfo.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              );

              return (
                <div
                  key={order.orderId}
                  onClick={() => setSelectedOrder(order)}
                  className="p-4 border rounded shadow-md cursor-pointer hover:shadow-lg transition duration-200 mb-10"
                >
                  <h2 className="text-xl font-semibold mb-1">
                    Order #{order.orderId}
                  </h2>
                  <p className="mb-1">Date: {dateOnly}</p>
                  <p className="mb-1">
                    Total Amount: ${totalAmount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.productInfo.length} item(s)
                  </p>
                  <p className="text-sm text-gray-600">
                    Status: {order.status}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <OrderModal selectedOrder={selectedOrder} onClose={closeModal} />
    </div>
  );
}

export default Orders;
