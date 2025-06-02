import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { loadCartWithDetails, removeCartItem } from '../api/cartApi';
import { useCart } from '../context/cartContext'; 

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { setCartCount } = useCart();

  useEffect(() => {
    const load = async () => {
      if (!token) return;

      const result = await loadCartWithDetails();
      if (!result.success) {
        console.error("Failed to load cart:", result.message);
        return;
      }

      setCartItems(result.data);
      calculateTotal(result.data);
      updateCount(result.data);
    };

    load();
  }, [token]);

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(sum);
  };

  const updateCount = (items) => {
    const count = items.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(count);
  };

  const removeItem = async (productId) => {
    const result = await removeCartItem(productId);
    if (!result.success) return;

    setCartItems(prev => {
      const updated = prev
        .map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0);

      calculateTotal(updated);
      updateCount(updated);
      return updated;
    });
  };

  if (!token) {
    return (
      <div>
        <Header showAuthButtons={true} showUserLinks={true} />
        <p className='text-center mt-10'>Please log in to view your cart.</p>
      </div>
    );
  }

  return (
    <div>
      <Header showAuthButtons={true} showUserLinks={true} />
      <div className='px-32 mt-24'>
        <h1 className='text-4xl font-bold mb-6'>Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {cartItems.map(item => (
                <div key={item.productId} className='p-4 rounded'>
                  <ProductCard
                    product={item}
                    mode="cart"
                    removeItem={removeItem}
                  />
                </div>
              ))}
            </div>
            <h2 className='text-xl font-semibold mt-6'>Total: ${total.toFixed(2)}</h2>
            <button
              className='bg-green-600 text-black px-4 py-2 mt-4 rounded hover:bg-green-700'
              onClick={() => navigate('/checkout', { state: { cartItems, total } })}
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
