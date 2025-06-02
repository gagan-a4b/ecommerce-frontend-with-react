import React from "react";
import ProductForm from "./ProductForm";

const ProductModal = ({
  type,              // "add" or "edit"
  product,
  setProduct,
  onSubmit,
  onClose,
}) => {
  const title = type === "edit" ? "Edit Product" : "Add Product";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md transform transition-all duration-300 scale-100 relative">
        <button
          className="absolute top-4 right-6 text-gray-600 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <ProductForm
          product={product}
          setProduct={setProduct}
          onSubmit={onSubmit}
          type={type}
        />
      </div>
    </div>
  );
};

export default ProductModal;
