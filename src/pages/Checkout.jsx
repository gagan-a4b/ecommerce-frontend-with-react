import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/cartContext"; 
import { BASE_URL } from "../api/api";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { cartItems = [], total = 0 } = location.state || {};

  const { setCartCount } = useCart(); 

  const handlePayment = async () => {
    const response = await fetch(`${BASE_URL}/api/orders/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      toast.success("Payment successful!");

      setCartCount(0);

      navigate("/orders");
    } else {
      const error = await response.json();
      toast.error(`Payment failed: ${error.message || "Unknown error"}`);
    }
  };

  return (
    <div>
      <Header showAuthButtons={true} showUserLinks={true} />
      <div className="px-32 mt-24">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        {cartItems.length === 0 ? (
          <p>No items to checkout.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cartItems.map((item) => (
                <ProductCard
                  key={item.productId}
                  product={item}
                  mode="summary"
                />
              ))}
            </div>
            <h2 className="text-xl font-semibold mt-6">
              Total: ${total.toFixed(2)}
            </h2>
            <button
              onClick={handlePayment}
              className="bg-blue-600 text-black px-4 py-2 mt-4 rounded hover:bg-blue-700"
            >
              Pay Now
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Checkout;
