import React from "react";
import Input from "./Input";

const ProductForm = ({
  product,
  setProduct,
  onSubmit,
  type = "add", // "add" or "edit"
}) => {
  const isEdit = type === "edit";

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-2 my-6 rounded-lg border p-10 shadow-md bg-gray-100"
    >
      <h3 className="text-lg font-semibold">
        {isEdit ? "Edit Product" : "Add Product"}
      </h3>

      <Input
        type="text"
        placeholder="Name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
        required={true}
      />
      <Input
        type="text"
        placeholder="Image URL"
        value={product.image}
        onChange={(e) => setProduct({ ...product, image: e.target.value })}
        required={true}
      />
      <Input
        type="text"
        placeholder="Description"
        value={product.description}
        onChange={(e) => setProduct({ ...product, description: e.target.value })}
        className="border px-3 py-1 w-full"
        required={true}
      />
      <Input
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
        className="border px-3 py-1 w-full"
        required={true}
      />

      <button
        type="submit"
        className={`text-black px-4 py-2 rounded ${
          isEdit ? "bg-yellow-500" : "bg-blue-600"
        }`}
        style={{
          backgroundColor: isEdit
            ? "var(--color-yellow-200)"
            : "var(--color-blue-200)",
        }}
      >
        {isEdit ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
