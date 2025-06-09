import React, { useState } from "react";
import Products from "./components/Products";
import Notes from "./components/Notes";
import CustomerList from "./components/CustomerList";
import SingleProduct from "./components/SingleProduct";
import Quote from "./components/Quote";

const HomePage = () => {
  const [selectedProduct, setSelectedProduct] = useState();
  const [cartItems, setCartItems] = useState([]);

  function handleSelectProduct(product) {
    setSelectedProduct(product);
  }

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => 
        item.id === product.id ? {...item, quantity: item.quantity + 1} : item);
      } else {
        return [...prev, {...product, quantity: 1}];
      }
    });
  };

  const handleUpdateQuantity =(id, delta) => {
    setCartItems((prevItems) => prevItems.map((item) => item.id === id ? {...item, quantity: Math.max(1, item.quantity + delta)}: item))
  }

  
  const handleDeleteItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto h-screen relative px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative md:col-span-2">
          <Products 
          handleSelectProduct={handleSelectProduct}
          addToCart={handleAddToCart} />
        </div>
        <div className="flex flex-col gap-6 md:col-span-1 h-full">
        {selectedProduct ? (
          <div className="flex-1 overflow-auto">
            <SingleProduct 
              selectedProduct={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              addToCart={handleAddToCart}
            />
          </div>
        ) : (
          <>
            <div className="overflow-auto">
              <Quote 
                items={cartItems} 
                onUpdateQuantity={handleUpdateQuantity}
                onDeleteItem={handleDeleteItem}
              />
            </div>
            <div className="flex-1 overflow-auto">
              <CustomerList />
            </div>
            <div className="flex-1 overflow-auto">
              <Notes />
            </div>
          </>
        )}
      </div>
    </div>
  </div>
  );
};

export default HomePage;
