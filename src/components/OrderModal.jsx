import React, { useEffect } from "react";

const OrderModal = ({ selectedOrder, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = selectedOrder ? "hidden" : "auto";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [selectedOrder, onClose]);

  if (!selectedOrder) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full relative">
        <button
          onClick={onClose}
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
                alt={item.name }
                className="h-32 w-full object-contain mb-2 rounded"
              />
              <p className="font-medium">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
