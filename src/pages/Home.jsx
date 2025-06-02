import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import Header from "./Header";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";
import { fetchProducts, addToCart } from "../api/productsApi";
import { useCart } from "../context/cartContext"; 
import { loadCartWithDetails } from "../api/cartApi"; 

function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { setCartCount } = useCart(); 

  const productsPerPage = 8;

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

  const refreshCartCount = async () => {
    const result = await loadCartWithDetails();
    if (result.success) {
      const totalQuantity = result.data.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalQuantity);
    }
  };

  const handleAddToCart = async (product) => {
    const result = await addToCart(product);
    if (result.success) {
      toast.success("Added to cart");
      await refreshCartCount(); 
    } else {
      toast.error("Failed to add to cart");
    }
  };

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div>
      <Header showAuthButtons={true} showUserLinks={true} />
      <div className="flex mt-28 mb-10 flex-wrap gap-10 justify-center">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
            addToCart={handleAddToCart}
            mode="user"
          />
        ))}
      </div>
      <div className="mb-18">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Home;
