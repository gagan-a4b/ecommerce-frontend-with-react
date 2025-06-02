import React, { useEffect, useState } from "react";
import Header from "./Header";
import { fetchOrders } from "../api/orderApi";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const token = localStorage.getItem("token");

  useEffect( () => {
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

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">
              Order #{selectedOrder.orderId}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {selectedOrder.productInfo.map((item) => (
                <div key={item.productId} className="text-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-32 w-full object-contain mb-2 rounded"
                  />
                  <p className="font-medium">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
