import React from "react";

const ProductCard = ({
  product,
  mode = "user", // "user", "admin", or "cart"
  addToCart,
  handleEditClick,
  handleDeleteProduct,
  removeItem,
}) => {
  if (mode === "cart") {
    return (
      <div className="p-4 rounded-lg shadow-md text-center w-full max-w-xs">
        <img
          src={product.image}
          alt={product.name}
          className="h-32 w-full object-contain mb-2"
        />
        <h3 className="font-bold">{product.name}</h3>
        <p>Price: ${product.price}</p>
        <p>Quantity: {product.quantity}</p>
        <p>Total: ${(product.price * product.quantity).toFixed(2)}</p>
        <button
          className="bg-red-400 mt-2 px-3 py-1 rounded text-white"
          onClick={() => removeItem(product.productId)}
        >
          Remove
        </button>
      </div>
    );
  }
  if (mode === "summary") {
  return (
    <div className='shadow-md p-4 rounded-lg text-center w-full max-w-xs'>
      <img src={product.image} alt={product.name} className='w-full h-32 object-contain mb-2' />
      <h3 className='font-bold'>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>Quantity: {product.quantity}</p>
      <p>Total: ${(product.price * product.quantity).toFixed(2)}</p>
    </div>
  );
}


  return (
    <div className="p-4 rounded-lg shadow-md text-center">
      <img
        src={product.image}
        alt={product.name}
        className={`object-cover rounded ${
          mode === "user" ? "h-[250px] w-[250px]" : "h-[200px] w-[200px]"
        } mx-auto`}
      />
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <h3 className="text-gray-600 mb-2">${product.price}</h3>

      {mode === "user" && addToCart && (
        <button
          className="hover:transform hover:scale-105 bg-blue-400 px-3 py-1 rounded text-white"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      )}

      {mode === "admin" && (
        <div className="flex flex-col items-center gap-2 mt-2">
          <button
            onClick={() => handleEditClick(product)}
            className="text-black px-3 py-1 rounded bg-yellow-200"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteProduct(product.productId)}
            className="text-black px-3 py-1 rounded bg-red-200"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
