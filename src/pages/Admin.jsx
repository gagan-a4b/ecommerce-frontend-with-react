import React, { useEffect, useState } from "react";
import Header from "./Header";
import Pagination from "../components/Pagination";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import {
  fetchProducts,
  addProduct,
  editProducts,
  deleteProduct,
} from "../api/productsApi";

const Admin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const [editProduct, setEditProduct] = useState({
    productId: null,
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const [showAddProductForm, setShowAddProductForm] = useState(false);

  const handleAddProductForm = () => {
    setShowAddProductForm(!showAddProductForm);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, []);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const { name, price, image, description } = newProduct;

    if (!name || !price || !image || !description) {
      toast.info("All fields are required");
      return;
    }

    const result = await addProduct(newProduct);

    if (result.success) {
      toast.success("Product added successfully");
      setNewProduct({ name: "", price: "", image: "", description: "" });
      setShowAddProductForm(false);
      const updatedProducts = await fetchProducts();
      setProducts(updatedProducts);
    } else {
      toast.error(result.message);
    }
  };

  const handleEditClick = (product) => {
    setEditProduct({
      productId: product.productId,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
    });
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    const { productId, name, price, image, description } = editProduct;

    if (!name || !price || !image || !description) {
      toast.info("All fields are required");
      return;
    }

    try {
      const result = await editProducts({
        productId,
        name,
        price,
        image,
        description,
      });

      if (!result.success) {
        throw new Error(result.message || "Edit failed");
      }

      toast.success("Product updated successfully");
      setEditProduct({
        productId: null,
        name: "",
        price: "",
        image: "",
        description: "",
      });
      const updatedProducts = await fetchProducts();
      setProducts(updatedProducts);
    } catch (err) {
      console.error("Error editing product:", err.message);
      toast.error(err.message || "Error editing product");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const result = await deleteProduct(id);
      if (result.success) {
        toast.success("Product deleted successfully");
        const updatedProducts = await fetchProducts();
        setProducts(updatedProducts);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error("Error deleting product:", err.message);
      toast.error(err.message || "Error deleting product");
    }
  };

  return (
    <div className="mt-24 px-32">
      <Header showAuthButtons={true} showUserLinks={false} />
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>

      <button
        onClick={handleAddProductForm}
        className="bg-green-400 p-1 rounded-md hover:bg-green-500 transition duration-200"
      >
        {showAddProductForm ? "Cancel" : "Add Product"}
      </button>

      {/* Add Product Modal */}
      {showAddProductForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 transition-opacity duration-300">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md transform transition-all duration-300 scale-100">
            <button
              className="absolute top-4 right-6 text-gray-600 hover:text-red-500 text-xl"
              onClick={() => setShowAddProductForm(false)}
            >
              ✕
            </button>
            <h2 className="text-lg font-bold mb-4">Add Product</h2>
            <ProductForm
              product={newProduct}
              setProduct={setNewProduct}
              onSubmit={handleAddProduct}
              type="add"
            />
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editProduct.productId && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 transition-opacity duration-300">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md transform transition-all duration-300 scale-100">
            <button
              className="absolute top-4 right-6 text-gray-600 hover:text-red-500 text-xl"
              onClick={() =>
                setEditProduct({
                  productId: null,
                  name: "",
                  price: "",
                  image: "",
                  description: "",
                })
              }
            >
              ✕
            </button>
            <h2 className="text-lg font-bold mb-4">Edit Product</h2>
            <ProductForm
              product={editProduct}
              setProduct={setEditProduct}
              onSubmit={handleEditProduct}
              type="edit"
            />
          </div>
        </div>
      )}

      <h3 className="text-2xl font-semibold mt-10">All Products</h3>
      <div className="flex mt-14 mb-10 flex-wrap gap-6 justify-center">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
            mode="admin"
            handleEditClick={handleEditClick}
            handleDeleteProduct={handleDeleteProduct}
          />
        ))}
      </div>

      <div className="mb-20">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Admin;
